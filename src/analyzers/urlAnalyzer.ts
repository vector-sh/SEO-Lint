import * as vscode from 'vscode';

export class UrlAnalyzer {
    async analyze(document: vscode.TextDocument, text: string): Promise<vscode.Diagnostic[]> {
        const diagnostics: vscode.Diagnostic[] = [];

        // Extract URLs from href attributes
        const urlRegex = /href=["']([^"']+)["']/gi;
        let match;
        const urls: string[] = [];

        while ((match = urlRegex.exec(text)) !== null) {
            urls.push(match[1]);
        }

        // Analyze internal links
        const internalLinks = urls.filter(url => 
            !url.startsWith('http://') && 
            !url.startsWith('https://') && 
            !url.startsWith('//') &&
            !url.startsWith('mailto:') &&
            !url.startsWith('tel:') &&
            !url.startsWith('#')
        );

        // Check for SEO-friendly URL structure in internal links
        for (const url of internalLinks) {
            const position = text.indexOf(`href="${url}"`);
            if (position === -1) {
                continue;
            }

            // Check for problematic URL patterns
            if (url.includes('?')) {
                const docPosition = document.positionAt(position);
                const range = new vscode.Range(docPosition, docPosition.translate(0, url.length + 6));
                const diagnostic = new vscode.Diagnostic(
                    range,
                    `URL contains query parameters: "${url}". Consider using clean, descriptive URLs for better SEO.`,
                    vscode.DiagnosticSeverity.Information
                );
                diagnostic.source = 'SEO Lint';
                diagnostics.push(diagnostic);
            }

            // Check for uppercase letters
            if (url !== url.toLowerCase() && url.length > 1) {
                const docPosition = document.positionAt(position);
                const range = new vscode.Range(docPosition, docPosition.translate(0, url.length + 6));
                const diagnostic = new vscode.Diagnostic(
                    range,
                    `URL contains uppercase letters: "${url}". Use lowercase URLs for consistency and SEO.`,
                    vscode.DiagnosticSeverity.Information
                );
                diagnostic.source = 'SEO Lint';
                diagnostics.push(diagnostic);
            }

            // Check for underscores (should use hyphens)
            if (url.includes('_')) {
                const docPosition = document.positionAt(position);
                const range = new vscode.Range(docPosition, docPosition.translate(0, url.length + 6));
                const diagnostic = new vscode.Diagnostic(
                    range,
                    `URL uses underscores: "${url}". Use hyphens instead for better SEO (search engines treat hyphens as word separators).`,
                    vscode.DiagnosticSeverity.Warning
                );
                diagnostic.source = 'SEO Lint';
                diagnostics.push(diagnostic);
            }

            // Check URL length
            if (url.length > 75) {
                const docPosition = document.positionAt(position);
                const range = new vscode.Range(docPosition, docPosition.translate(0, url.length + 6));
                const diagnostic = new vscode.Diagnostic(
                    range,
                    `URL is too long (${url.length} characters): "${url}". Keep URLs under 75 characters for better user experience and SEO.`,
                    vscode.DiagnosticSeverity.Information
                );
                diagnostic.source = 'SEO Lint';
                diagnostics.push(diagnostic);
            }

            // Check for too many path segments
            const segments = url.split('/').filter(s => s.length > 0);
            if (segments.length > 4) {
                const docPosition = document.positionAt(position);
                const range = new vscode.Range(docPosition, docPosition.translate(0, url.length + 6));
                const diagnostic = new vscode.Diagnostic(
                    range,
                    `URL has too many path segments (${segments.length}): "${url}". Simpler URL structures are better for SEO.`,
                    vscode.DiagnosticSeverity.Information
                );
                diagnostic.source = 'SEO Lint';
                diagnostics.push(diagnostic);
            }
        }

        // Check for broken internal link patterns
        const suspiciousPatterns = [
            { pattern: /href=["']\/\//g, message: 'Double slashes in URL path may cause broken links' },
            { pattern: /href=["'][^"']*\s[^"']*["']/g, message: 'URL contains spaces, which will break the link' },
            { pattern: /href=["'][^"']*%20[^"']*["']/g, message: 'URL contains encoded spaces. Use hyphens for better readability' }
        ];

        for (const { pattern, message } of suspiciousPatterns) {
            let patternMatch;
            while ((patternMatch = pattern.exec(text)) !== null) {
                const position = document.positionAt(patternMatch.index);
                const range = new vscode.Range(position, position.translate(0, patternMatch[0].length));
                const diagnostic = new vscode.Diagnostic(
                    range,
                    message,
                    vscode.DiagnosticSeverity.Warning
                );
                diagnostic.source = 'SEO Lint';
                diagnostics.push(diagnostic);
            }
        }

        return diagnostics;
    }
}
