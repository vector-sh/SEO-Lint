import * as vscode from 'vscode';
import { DiagnosticProvider } from './diagnosticProvider';
import { TextEncoder } from 'util';

let diagnosticCollection: vscode.DiagnosticCollection;
let diagnosticProvider: DiagnosticProvider;

export function activate(context: vscode.ExtensionContext) {
    console.log('SEO Lint extension is now active!');

    // Create diagnostic collection
    diagnosticCollection = vscode.languages.createDiagnosticCollection('seo-lint');
    context.subscriptions.push(diagnosticCollection);

    // Initialize diagnostic provider
    diagnosticProvider = new DiagnosticProvider(diagnosticCollection);

    // Register commands
    const analyzeCommand = vscode.commands.registerCommand('seo-lint.analyzePage', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('No active editor found');
            return;
        }
        
        await diagnosticProvider.analyzeDocument(editor.document);
        vscode.window.showInformationMessage('SEO analysis complete!');
    });

    const auditCommand = vscode.commands.registerCommand('seo-lint.runSiteAudit', async () => {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showWarningMessage('No workspace folder found');
            return;
        }

        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Running SEO Site Audit",
            cancellable: false
        }, async (progress) => {
            progress.report({ increment: 0, message: "Scanning files..." });
            
            // Find HTML, JSX, TSX, and Vue files
            const files = await vscode.workspace.findFiles(
                '**/*.{html,jsx,tsx,vue,js,ts}',
                '**/node_modules/**',
                100
            );

            let analyzed = 0;
            for (const file of files) {
                const document = await vscode.workspace.openTextDocument(file);
                await diagnosticProvider.analyzeDocument(document);
                analyzed++;
                progress.report({ 
                    increment: (analyzed / files.length) * 100, 
                    message: `Analyzed ${analyzed}/${files.length} files` 
                });
            }
        });

        vscode.window.showInformationMessage(`Site audit complete! Analyzed ${await vscode.workspace.findFiles('**/*.{html,jsx,tsx,vue}', '**/node_modules/**').then(f => f.length)} files.`);
    });

    const reportCommand = vscode.commands.registerCommand('seo-lint.showReport', async () => {
        const report = diagnosticProvider.generateReport();
        
        const panel = vscode.window.createWebviewPanel(
            'seoReport',
            'SEO Report',
            vscode.ViewColumn.One,
            {}
        );

        panel.webview.html = getReportHtml(report);
    });

    const robotsCommand = vscode.commands.registerCommand('seo-lint.validateRobotsTxt', async () => {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showWarningMessage('No workspace folder found');
            return;
        }

        const robotsUri = vscode.Uri.joinPath(workspaceFolder.uri, 'robots.txt');
        
        try {
            const document = await vscode.workspace.openTextDocument(robotsUri);
            await vscode.window.showTextDocument(document);
            await diagnosticProvider.analyzeRobotsTxt(document);
            vscode.window.showInformationMessage('robots.txt validation complete!');
        } catch (error) {
            vscode.window.showWarningMessage('robots.txt not found in workspace root. Create one to control search engine crawling.');
        }
    });

    const sitemapGenerateCommand = vscode.commands.registerCommand('seo-lint.generateSitemap', async () => {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showWarningMessage('No workspace folder found');
            return;
        }

        // Prompt for base URL
        const baseUrl = await vscode.window.showInputBox({
            prompt: 'Enter your website base URL (e.g., https://example.com)',
            placeHolder: 'https://example.com',
            validateInput: (value) => {
                if (!value) {
                    return 'Base URL is required';
                }
                if (!value.startsWith('http://') && !value.startsWith('https://')) {
                    return 'URL must start with http:// or https://';
                }
                return null;
            }
        });

        if (!baseUrl) {
            return;
        }

        try {
            const sitemapXml = await diagnosticProvider.generateSitemap(workspaceFolder, baseUrl);
            
            // Create sitemap.xml in workspace root
            const sitemapUri = vscode.Uri.joinPath(workspaceFolder.uri, 'sitemap.xml');
            const encoder = new TextEncoder();
            await vscode.workspace.fs.writeFile(sitemapUri, encoder.encode(sitemapXml));
            
            // Open the generated file
            const document = await vscode.workspace.openTextDocument(sitemapUri);
            await vscode.window.showTextDocument(document);
            
            vscode.window.showInformationMessage('sitemap.xml generated successfully!');
        } catch (error) {
            vscode.window.showErrorMessage(`Error generating sitemap: ${error}`);
        }
    });

    const sitemapValidateCommand = vscode.commands.registerCommand('seo-lint.validateSitemap', async () => {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showWarningMessage('No workspace folder found');
            return;
        }

        const sitemapUri = vscode.Uri.joinPath(workspaceFolder.uri, 'sitemap.xml');
        
        try {
            const document = await vscode.workspace.openTextDocument(sitemapUri);
            await vscode.window.showTextDocument(document);
            await diagnosticProvider.analyzeSitemap(document);
            vscode.window.showInformationMessage('sitemap.xml validation complete!');
        } catch (error) {
            vscode.window.showWarningMessage('sitemap.xml not found in workspace root. Use "Generate Sitemap" command to create one.');
        }
    });

    // Register event listeners
    context.subscriptions.push(
        analyzeCommand,
        auditCommand,
        reportCommand,
        robotsCommand,
        sitemapGenerateCommand,
        sitemapValidateCommand,
        vscode.workspace.onDidOpenTextDocument((doc: vscode.TextDocument) => {
            if (shouldAnalyze(doc)) {
                diagnosticProvider.analyzeDocument(doc);
            }
        }),
        vscode.workspace.onDidChangeTextDocument((e: vscode.TextDocumentChangeEvent) => {
            if (shouldAnalyze(e.document)) {
                diagnosticProvider.analyzeDocument(e.document);
            }
        }),
        vscode.workspace.onDidSaveTextDocument((doc: vscode.TextDocument) => {
            if (shouldAnalyze(doc)) {
                diagnosticProvider.analyzeDocument(doc);
            }
        })
    );

    // Analyze open documents
    vscode.workspace.textDocuments.forEach((doc: vscode.TextDocument) => {
        if (shouldAnalyze(doc)) {
            diagnosticProvider.analyzeDocument(doc);
        }
    });
}

function shouldAnalyze(document: vscode.TextDocument): boolean {
    const config = vscode.workspace.getConfiguration('seoLint');
    if (!config.get<boolean>('enabled', true)) {
        return false;
    }

    const supportedLanguages = ['html', 'javascript', 'javascriptreact', 'typescript', 'typescriptreact', 'vue'];
    return supportedLanguages.includes(document.languageId);
}

function getReportHtml(report: any): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SEO Report</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            padding: 20px;
            background-color: var(--vscode-editor-background);
            color: var(--vscode-editor-foreground);
        }
        h1 { color: var(--vscode-textLink-foreground); }
        h2 { margin-top: 30px; border-bottom: 2px solid var(--vscode-textLink-foreground); padding-bottom: 10px; }
        .stat { 
            display: inline-block; 
            margin: 10px 20px 10px 0;
            padding: 15px;
            background: var(--vscode-editor-inactiveSelectionBackground);
            border-radius: 5px;
        }
        .stat-label { font-weight: bold; display: block; }
        .stat-value { font-size: 24px; margin-top: 5px; }
        .error { color: #f48771; }
        .warning { color: #cca700; }
        .info { color: #75beff; }
        .issue-list { list-style: none; padding: 0; }
        .issue-item { 
            padding: 10px; 
            margin: 5px 0; 
            background: var(--vscode-editor-inactiveSelectionBackground);
            border-left: 3px solid;
        }
        .issue-item.error { border-color: #f48771; }
        .issue-item.warning { border-color: #cca700; }
        .issue-item.info { border-color: #75beff; }
    </style>
</head>
<body>
    <h1>🔍 SEO Report</h1>
    
    <div class="summary">
        <div class="stat">
            <span class="stat-label">Total Issues</span>
            <span class="stat-value">${report.totalIssues}</span>
        </div>
        <div class="stat error">
            <span class="stat-label">Errors</span>
            <span class="stat-value">${report.errors}</span>
        </div>
        <div class="stat warning">
            <span class="stat-label">Warnings</span>
            <span class="stat-value">${report.warnings}</span>
        </div>
        <div class="stat info">
            <span class="stat-label">Info</span>
            <span class="stat-value">${report.info}</span>
        </div>
    </div>

    <h2>Issues by Category</h2>
    ${Object.keys(report.byCategory).map(category => `
        <h3>${category}</h3>
        <ul class="issue-list">
            ${report.byCategory[category].map((issue: any) => `
                <li class="issue-item ${issue.severity}">
                    <strong>${issue.file}</strong> (Line ${issue.line}): ${issue.message}
                </li>
            `).join('')}
        </ul>
    `).join('')}
</body>
</html>`;
}

export function deactivate() {
    if (diagnosticCollection) {
        diagnosticCollection.dispose();
    }
}
