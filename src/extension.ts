import * as vscode from 'vscode';
import { DiagnosticProvider } from './diagnosticProvider';

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

    // Register event listeners
    context.subscriptions.push(
        analyzeCommand,
        auditCommand,
        reportCommand,
        vscode.workspace.onDidOpenTextDocument(doc => {
            if (shouldAnalyze(doc)) {
                diagnosticProvider.analyzeDocument(doc);
            }
        }),
        vscode.workspace.onDidChangeTextDocument(e => {
            if (shouldAnalyze(e.document)) {
                diagnosticProvider.analyzeDocument(e.document);
            }
        }),
        vscode.workspace.onDidSaveTextDocument(doc => {
            if (shouldAnalyze(doc)) {
                diagnosticProvider.analyzeDocument(doc);
            }
        })
    );

    // Analyze open documents
    vscode.workspace.textDocuments.forEach(doc => {
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
