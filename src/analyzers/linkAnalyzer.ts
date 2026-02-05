import * as vscode from 'vscode';

export class LinkAnalyzer {
    async analyze(document: vscode.TextDocument, text: string): Promise<vscode.Diagnostic[]> {
        const diagnostics: vscode.Diagnostic[] = [];

        // Extract all links
        const linkRegex = /<a[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
        let match;
        const links: Array<{ url: string; text: string; position: number }> = [];

        while ((match = linkRegex.exec(text)) !== null) {
            links.push({
                url: match[1],
                text: this.stripHtmlTags(match[2]),
                position: match.index
            });
        }

        // Check for internal links
        const internalLinks = links.filter(link => 
            !link.url.startsWith('http://') && 
            !link.url.startsWith('https://') && 
            !link.url.startsWith('//') &&
            !link.url.startsWith('mailto:') &&
            !link.url.startsWith('tel:')
        );

        // Check for external links without rel attributes
        const externalLinks = links.filter(link => 
            link.url.startsWith('http://') || 
            link.url.startsWith('https://') || 
            link.url.startsWith('//')
        );

        for (const link of externalLinks) {
            const linkTag = text.substring(link.position, text.indexOf('</a>', link.position) + 4);
            
            // Check for rel="noopener" on external links
            if (!linkTag.includes('target="_blank"')) {
                continue; // Only check links that open in new tab
            }

            if (!linkTag.includes('rel=')) {
                const position = document.positionAt(link.position);
                const range = new vscode.Range(position, position.translate(0, 20));
                const diagnostic = new vscode.Diagnostic(
                    range,
                    `External link opening in new tab missing rel attribute. Add rel="noopener noreferrer" for security and SEO.`,
                    vscode.DiagnosticSeverity.Warning
                );
                diagnostic.source = 'SEO Lint';
                diagnostics.push(diagnostic);
            } else if (!linkTag.includes('noopener')) {
                const position = document.positionAt(link.position);
                const range = new vscode.Range(position, position.translate(0, 20));
                const diagnostic = new vscode.Diagnostic(
                    range,
                    `External link missing "noopener" in rel attribute. Add for security.`,
                    vscode.DiagnosticSeverity.Warning
                );
                diagnostic.source = 'SEO Lint';
                diagnostics.push(diagnostic);
            }
        }

        // Check for generic link text
        const genericTexts = ['click here', 'read more', 'learn more', 'here', 'this', 'link'];
        for (const link of links) {
            const linkText = link.text.trim().toLowerCase();
            if (genericTexts.includes(linkText)) {
                const position = document.positionAt(link.position);
                const range = new vscode.Range(position, position.translate(0, 20));
                const diagnostic = new vscode.Diagnostic(
                    range,
                    `Generic link text "${link.text}". Use descriptive anchor text for better SEO and accessibility.`,
                    vscode.DiagnosticSeverity.Warning
                );
                diagnostic.source = 'SEO Lint';
                diagnostics.push(diagnostic);
            }
        }

        // Check for empty link text
        for (const link of links) {
            if (!link.text.trim()) {
                const position = document.positionAt(link.position);
                const range = new vscode.Range(position, position.translate(0, 20));
                const diagnostic = new vscode.Diagnostic(
                    range,
                    'Link has no visible text. Add descriptive anchor text for accessibility and SEO.',
                    vscode.DiagnosticSeverity.Error
                );
                diagnostic.source = 'SEO Lint';
                diagnostics.push(diagnostic);
            }
        }

        // Check for overly long link text
        for (const link of links) {
            if (link.text.length > 100) {
                const position = document.positionAt(link.position);
                const range = new vscode.Range(position, position.translate(0, 20));
                const diagnostic = new vscode.Diagnostic(
                    range,
                    `Link text is too long (${link.text.length} characters). Keep anchor text concise and descriptive.`,
                    vscode.DiagnosticSeverity.Information
                );
                diagnostic.source = 'SEO Lint';
                diagnostics.push(diagnostic);
            }
        }

        // Provide feedback on internal linking
        if (internalLinks.length === 0 && links.length > 0) {
            diagnostics.push(this.createDiagnostic(
                document,
                text,
                '<body',
                'No internal links found. Internal linking helps with SEO and site navigation.',
                vscode.DiagnosticSeverity.Information
            ));
        } else if (internalLinks.length > 0 && internalLinks.length < 3) {
            diagnostics.push(this.createDiagnostic(
                document,
                text,
                '<body',
                `Only ${internalLinks.length} internal link(s) found. Consider adding more internal links to improve SEO and user navigation.`,
                vscode.DiagnosticSeverity.Information
            ));
        }

        return diagnostics;
    }

    private stripHtmlTags(html: string): string {
        // Remove HTML tags using iterative replacement for security
        let text = html;
        let prevText = '';
        
        // Multiple passes to handle nested/malformed tags
        while (prevText !== text) {
            prevText = text;
            text = text.replace(/<[^>]*>/g, ' ');
        }
        
        return text.trim();
    }

    private createDiagnostic(
        document: vscode.TextDocument,
        text: string,
        searchText: string,
        message: string,
        severity: vscode.DiagnosticSeverity
    ): vscode.Diagnostic {
        const index = text.indexOf(searchText);
        let range: vscode.Range;

        if (index !== -1) {
            const position = document.positionAt(index);
            range = new vscode.Range(position, position.translate(0, searchText.length));
        } else {
            range = new vscode.Range(0, 0, 0, 1);
        }

        const diagnostic = new vscode.Diagnostic(range, message, severity);
        diagnostic.source = 'SEO Lint';
        return diagnostic;
    }
}
