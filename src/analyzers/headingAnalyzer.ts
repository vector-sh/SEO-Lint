import * as vscode from 'vscode';

export class HeadingAnalyzer {
    async analyze(document: vscode.TextDocument, text: string): Promise<vscode.Diagnostic[]> {
        const diagnostics: vscode.Diagnostic[] = [];

        // Find all headings (HTML and JSX)
        const headingRegex = /<(h[1-6])[^>]*>(.*?)<\/\1>|<(h[1-6])[^>]*\/>/gi;
        const headings: { level: number; content: string; position: number }[] = [];
        
        let match;
        while ((match = headingRegex.exec(text)) !== null) {
            const level = parseInt(match[1] || match[3]);
            const content = match[2] || '';
            headings.push({ level, content, position: match.index });
        }

        // Check for H1
        const h1Count = headings.filter(h => h.level === 1).length;
        if (h1Count === 0) {
            diagnostics.push(this.createDiagnostic(
                document,
                text,
                '<body',
                'Missing H1 heading. Every page should have exactly one H1 tag.',
                vscode.DiagnosticSeverity.Error
            ));
        } else if (h1Count > 1) {
            // Mark each H1 after the first one
            const h1s = headings.filter(h => h.level === 1);
            for (let i = 1; i < h1s.length; i++) {
                const position = document.positionAt(h1s[i].position);
                const range = new vscode.Range(position, position.translate(0, 10));
                const diagnostic = new vscode.Diagnostic(
                    range,
                    'Multiple H1 tags found. Use only one H1 per page for better SEO.',
                    vscode.DiagnosticSeverity.Warning
                );
                diagnostic.source = 'SEO Lint';
                diagnostics.push(diagnostic);
            }
        }

        // Check heading hierarchy
        let previousLevel = 0;
        for (const heading of headings) {
            if (previousLevel > 0 && heading.level > previousLevel + 1) {
                const position = document.positionAt(heading.position);
                const range = new vscode.Range(position, position.translate(0, 10));
                const diagnostic = new vscode.Diagnostic(
                    range,
                    `Heading hierarchy skipped from H${previousLevel} to H${heading.level}. Maintain proper heading order for accessibility.`,
                    vscode.DiagnosticSeverity.Warning
                );
                diagnostic.source = 'SEO Lint';
                diagnostics.push(diagnostic);
            }
            previousLevel = heading.level;
        }

        // Check for empty headings
        for (const heading of headings) {
            if (!heading.content.trim()) {
                const position = document.positionAt(heading.position);
                const range = new vscode.Range(position, position.translate(0, 10));
                const diagnostic = new vscode.Diagnostic(
                    range,
                    'Empty heading tag. Headings should contain descriptive text.',
                    vscode.DiagnosticSeverity.Warning
                );
                diagnostic.source = 'SEO Lint';
                diagnostics.push(diagnostic);
            } else if (heading.content.trim().length < 3) {
                const position = document.positionAt(heading.position);
                const range = new vscode.Range(position, position.translate(0, 10));
                const diagnostic = new vscode.Diagnostic(
                    range,
                    'Heading text is too short. Use descriptive headings for better SEO.',
                    vscode.DiagnosticSeverity.Information
                );
                diagnostic.source = 'SEO Lint';
                diagnostics.push(diagnostic);
            }
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
            range = new vscode.Range(0, 0, 0, 1);
        }

        const diagnostic = new vscode.Diagnostic(range, message, severity);
        diagnostic.source = 'SEO Lint';
        return diagnostic;
    }
}
