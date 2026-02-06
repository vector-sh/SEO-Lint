import * as vscode from 'vscode';

export class ImageAnalyzer {
    async analyze(document: vscode.TextDocument, text: string): Promise<vscode.Diagnostic[]> {
        const diagnostics: vscode.Diagnostic[] = [];

        // Find all image tags (HTML and JSX)
        const imgRegex = /<img[^>]*>/gi;
        let match;

        while ((match = imgRegex.exec(text)) !== null) {
            const imgTag = match[0];
            const position = document.positionAt(match.index);
            const range = new vscode.Range(position, position.translate(0, imgTag.length));

            // Check for alt attribute
            const altMatch = imgTag.match(/alt=["']([^"']*)["']/i);
            if (!altMatch) {
                const diagnostic = new vscode.Diagnostic(
                    range,
                    'Image is missing alt attribute. Add descriptive alt text for accessibility and SEO.',
                    vscode.DiagnosticSeverity.Error
                );
                diagnostic.source = 'SEO Lint';
                diagnostics.push(diagnostic);
            } else {
                const altText = altMatch[1];
                
                // Check if alt is empty
                if (altText.trim().length === 0) {
                    const diagnostic = new vscode.Diagnostic(
                        range,
                        'Image has empty alt attribute. Provide descriptive alt text for SEO and accessibility.',
                        vscode.DiagnosticSeverity.Warning
                    );
                    diagnostic.source = 'SEO Lint';
                    diagnostics.push(diagnostic);
                }
                // Check if alt is too short
                else if (altText.length < 5) {
                    const diagnostic = new vscode.Diagnostic(
                        range,
                        'Alt text is too short. Provide more descriptive alt text for better SEO.',
                        vscode.DiagnosticSeverity.Information
                    );
                    diagnostic.source = 'SEO Lint';
                    diagnostics.push(diagnostic);
                }
                // Check if alt is too long
                else if (altText.length > 125) {
                    const diagnostic = new vscode.Diagnostic(
                        range,
                        'Alt text is too long (> 125 characters). Keep it concise while descriptive.',
                        vscode.DiagnosticSeverity.Information
                    );
                    diagnostic.source = 'SEO Lint';
                    diagnostics.push(diagnostic);
                }
                // Check for generic alt text
                else if (this.isGenericAltText(altText)) {
                    const diagnostic = new vscode.Diagnostic(
                        range,
                        `Alt text "${altText}" is too generic. Use specific, descriptive text.`,
                        vscode.DiagnosticSeverity.Warning
                    );
                    diagnostic.source = 'SEO Lint';
                    diagnostics.push(diagnostic);
                }
            }

            // Check for title attribute (bonus for SEO)
            const titleMatch = imgTag.match(/title=["']([^"']*)["']/i);
            if (!titleMatch) {
                const diagnostic = new vscode.Diagnostic(
                    range,
                    'Consider adding a title attribute to the image for enhanced SEO.',
                    vscode.DiagnosticSeverity.Information
                );
                diagnostic.source = 'SEO Lint';
                diagnostics.push(diagnostic);
            }

            // Check for loading attribute
            const loadingMatch = imgTag.match(/loading=["']([^"']*)["']/i);
            if (!loadingMatch) {
                const diagnostic = new vscode.Diagnostic(
                    range,
                    'Consider adding loading="lazy" for better page performance.',
                    vscode.DiagnosticSeverity.Information
                );
                diagnostic.source = 'SEO Lint';
                diagnostics.push(diagnostic);
            }

            // Check for width and height attributes (Core Web Vitals)
            const widthMatch = imgTag.match(/width=/i);
            const heightMatch = imgTag.match(/height=/i);
            if (!widthMatch || !heightMatch) {
                const diagnostic = new vscode.Diagnostic(
                    range,
                    'Specify width and height attributes to prevent layout shifts (Core Web Vitals).',
                    vscode.DiagnosticSeverity.Information
                );
                diagnostic.source = 'SEO Lint';
                diagnostics.push(diagnostic);
            }
        }

        return diagnostics;
    }

    private isGenericAltText(altText: string): boolean {
        const genericTerms = [
            'image', 'picture', 'photo', 'img', 'graphic',
            'icon', 'logo', 'banner', 'placeholder'
        ];
        
        const lowerAlt = altText.toLowerCase().trim();
        return genericTerms.some(term => lowerAlt === term || lowerAlt === `${term}.png` || lowerAlt === `${term}.jpg`);
    }
}
