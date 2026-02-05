import * as vscode from 'vscode';

export class MetaTagAnalyzer {
    async analyze(document: vscode.TextDocument, text: string): Promise<vscode.Diagnostic[]> {
        const diagnostics: vscode.Diagnostic[] = [];
        const config = vscode.workspace.getConfiguration('seoLint');

        // Check for title tag
        const titleMatch = text.match(/<title[^>]*>(.*?)<\/title>/i);
        if (!titleMatch) {
            diagnostics.push(this.createDiagnostic(
                document,
                text,
                '<head',
                'Missing <title> tag. Every page should have a unique, descriptive title.',
                vscode.DiagnosticSeverity.Error
            ));
        } else {
            const titleContent = titleMatch[1];
            if (titleContent.length < 30) {
                diagnostics.push(this.createDiagnostic(
                    document,
                    text,
                    titleMatch[0],
                    'Title tag is too short (< 30 characters). Optimal length is 50-60 characters.',
                    vscode.DiagnosticSeverity.Warning
                ));
            } else if (titleContent.length > 60) {
                diagnostics.push(this.createDiagnostic(
                    document,
                    text,
                    titleMatch[0],
                    'Title tag is too long (> 60 characters). It may be truncated in search results.',
                    vscode.DiagnosticSeverity.Warning
                ));
            }
        }

        // Check for meta description
        if (config.get<boolean>('requireMetaDescription', true)) {
            const metaDescMatch = text.match(/<meta\s+name=["']description["'][^>]*>/i);
            if (!metaDescMatch) {
                diagnostics.push(this.createDiagnostic(
                    document,
                    text,
                    '<head',
                    'Missing meta description. Add a meta description to improve click-through rates.',
                    vscode.DiagnosticSeverity.Error
                ));
            } else {
                const contentMatch = metaDescMatch[0].match(/content=["']([^"']*)["']/);
                if (contentMatch) {
                    const descLength = contentMatch[1].length;
                    if (descLength < 120) {
                        diagnostics.push(this.createDiagnostic(
                            document,
                            text,
                            metaDescMatch[0],
                            'Meta description is too short (< 120 characters). Optimal length is 150-160 characters.',
                            vscode.DiagnosticSeverity.Warning
                        ));
                    } else if (descLength > 160) {
                        diagnostics.push(this.createDiagnostic(
                            document,
                            text,
                            metaDescMatch[0],
                            'Meta description is too long (> 160 characters). It may be truncated in search results.',
                            vscode.DiagnosticSeverity.Warning
                        ));
                    }
                }
            }
        }

        // Check for Open Graph tags
        if (config.get<boolean>('requireOpenGraph', true)) {
            const ogTags = ['og:title', 'og:description', 'og:image', 'og:url'];
            for (const tag of ogTags) {
                const regex = new RegExp(`<meta\\s+property=["']${tag}["'][^>]*>`, 'i');
                if (!text.match(regex)) {
                    diagnostics.push(this.createDiagnostic(
                        document,
                        text,
                        '<head',
                        `Missing Open Graph tag: ${tag}. Add it to improve social media sharing.`,
                        vscode.DiagnosticSeverity.Information
                    ));
                }
            }
        }

        // Check for viewport meta tag
        const viewportMatch = text.match(/<meta\s+name=["']viewport["'][^>]*>/i);
        if (!viewportMatch) {
            diagnostics.push(this.createDiagnostic(
                document,
                text,
                '<head',
                'Missing viewport meta tag. Add it for mobile responsiveness.',
                vscode.DiagnosticSeverity.Warning
            ));
        }

        // Check for charset
        const charsetMatch = text.match(/<meta\s+charset=["']?[^"'>]+["']?\s*\/?>/i);
        if (!charsetMatch) {
            diagnostics.push(this.createDiagnostic(
                document,
                text,
                '<head',
                'Missing charset declaration. Add <meta charset="UTF-8"> for proper character encoding.',
                vscode.DiagnosticSeverity.Warning
            ));
        }

        // Check for canonical URL
        const canonicalMatch = text.match(/<link\s+rel=["']canonical["'][^>]*>/i);
        if (!canonicalMatch) {
            diagnostics.push(this.createDiagnostic(
                document,
                text,
                '<head',
                'Missing canonical URL. Add a canonical link to prevent duplicate content issues.',
                vscode.DiagnosticSeverity.Information
            ));
        }

        return diagnostics;
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
            // If not found, mark the first line
            range = new vscode.Range(0, 0, 0, 1);
        }

        const diagnostic = new vscode.Diagnostic(range, message, severity);
        diagnostic.source = 'SEO Lint';
        return diagnostic;
    }
}
