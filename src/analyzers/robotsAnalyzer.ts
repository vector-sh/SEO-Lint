import * as vscode from 'vscode';

export class RobotsAnalyzer {
    async analyzeWorkspace(workspaceFolder: vscode.WorkspaceFolder): Promise<vscode.Diagnostic[]> {
        // Look for robots.txt in the workspace root
        const robotsUri = vscode.Uri.joinPath(workspaceFolder.uri, 'robots.txt');
        
        try {
            const document = await vscode.workspace.openTextDocument(robotsUri);
            return this.analyzeRobotsTxt(document);
        } catch (error) {
            // robots.txt doesn't exist - provide information
            return [{
                range: new vscode.Range(0, 0, 0, 0),
                message: 'robots.txt not found in workspace root. Consider adding one to control search engine crawling.',
                severity: vscode.DiagnosticSeverity.Information,
                source: 'SEO Lint'
            } as vscode.Diagnostic];
        }
    }

    async analyzeRobotsTxt(document: vscode.TextDocument): Promise<vscode.Diagnostic[]> {
        const diagnostics: vscode.Diagnostic[] = [];
        const text = document.getText();
        const lines = text.split('\n');

        let hasUserAgent = false;
        let hasSitemap = false;
        let currentUserAgent = '';

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            const range = new vscode.Range(i, 0, i, line.length || 1);

            // Skip empty lines and comments
            if (!line || line.startsWith('#')) {
                continue;
            }

            // Check for User-agent directive
            if (line.toLowerCase().startsWith('user-agent:')) {
                hasUserAgent = true;
                currentUserAgent = line.substring(line.indexOf(':') + 1).trim();
                
                // Check for proper spacing
                if (!line.includes(': ')) {
                    diagnostics.push(new vscode.Diagnostic(
                        range,
                        'User-agent should be followed by colon and space (e.g., "User-agent: *")',
                        vscode.DiagnosticSeverity.Warning
                    ));
                }
            }
            // Check for Disallow directive
            else if (line.toLowerCase().startsWith('disallow:')) {
                if (!hasUserAgent) {
                    diagnostics.push(new vscode.Diagnostic(
                        range,
                        'Disallow directive must come after a User-agent directive',
                        vscode.DiagnosticSeverity.Error
                    ));
                }
                
                // Check for proper spacing
                if (!line.includes(': ')) {
                    diagnostics.push(new vscode.Diagnostic(
                        range,
                        'Disallow should be followed by colon and space (e.g., "Disallow: /admin")',
                        vscode.DiagnosticSeverity.Warning
                    ));
                }
            }
            // Check for Allow directive
            else if (line.toLowerCase().startsWith('allow:')) {
                if (!hasUserAgent) {
                    diagnostics.push(new vscode.Diagnostic(
                        range,
                        'Allow directive must come after a User-agent directive',
                        vscode.DiagnosticSeverity.Error
                    ));
                }
            }
            // Check for Sitemap directive
            else if (line.toLowerCase().startsWith('sitemap:')) {
                hasSitemap = true;
                const sitemapUrl = line.substring(line.indexOf(':') + 1).trim();
                
                // Validate sitemap URL
                if (!sitemapUrl.startsWith('http://') && !sitemapUrl.startsWith('https://')) {
                    diagnostics.push(new vscode.Diagnostic(
                        range,
                        'Sitemap URL must be an absolute URL (starting with http:// or https://)',
                        vscode.DiagnosticSeverity.Error
                    ));
                }
            }
            // Check for Crawl-delay directive
            else if (line.toLowerCase().startsWith('crawl-delay:')) {
                const delay = line.substring(line.indexOf(':') + 1).trim();
                const delayNum = parseInt(delay);
                
                if (isNaN(delayNum) || delayNum < 0) {
                    diagnostics.push(new vscode.Diagnostic(
                        range,
                        'Crawl-delay must be a positive number',
                        vscode.DiagnosticSeverity.Error
                    ));
                } else if (delayNum > 10) {
                    diagnostics.push(new vscode.Diagnostic(
                        range,
                        `Crawl-delay of ${delayNum} seconds is very high. This may significantly slow down indexing.`,
                        vscode.DiagnosticSeverity.Warning
                    ));
                }
            }
            // Check for unknown directives
            else if (line.includes(':')) {
                const directive = line.substring(0, line.indexOf(':')).trim().toLowerCase();
                const knownDirectives = ['user-agent', 'disallow', 'allow', 'sitemap', 'crawl-delay'];
                
                if (!knownDirectives.includes(directive)) {
                    diagnostics.push(new vscode.Diagnostic(
                        range,
                        `Unknown directive "${directive}". This may be ignored by search engines.`,
                        vscode.DiagnosticSeverity.Warning
                    ));
                }
            } else {
                diagnostics.push(new vscode.Diagnostic(
                    range,
                    'Invalid line format. Expected format: "Directive: value"',
                    vscode.DiagnosticSeverity.Warning
                ));
            }
        }

        // Check for required elements
        if (!hasUserAgent) {
            diagnostics.push(new vscode.Diagnostic(
                new vscode.Range(0, 0, 0, 1),
                'robots.txt missing User-agent directive. Add at least one User-agent.',
                vscode.DiagnosticSeverity.Error
            ));
        }

        if (!hasSitemap) {
            diagnostics.push(new vscode.Diagnostic(
                new vscode.Range(0, 0, 0, 1),
                'robots.txt missing Sitemap directive. Add your sitemap URL for better indexing.',
                vscode.DiagnosticSeverity.Information
            ));
        }

        // Check for "Disallow: /" which blocks all crawling
        if (text.toLowerCase().includes('disallow: /') && currentUserAgent === '*') {
            diagnostics.push(new vscode.Diagnostic(
                new vscode.Range(0, 0, 0, 1),
                'WARNING: robots.txt blocks all search engines from crawling your site. This will prevent indexing.',
                vscode.DiagnosticSeverity.Error
            ));
        }

        return diagnostics;
    }
}
