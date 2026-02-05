import * as vscode from 'vscode';

export class SchemaAnalyzer {
    async analyze(document: vscode.TextDocument, text: string): Promise<vscode.Diagnostic[]> {
        const diagnostics: vscode.Diagnostic[] = [];

        // Check for JSON-LD schema
        const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
        const jsonLdMatches = Array.from(text.matchAll(jsonLdRegex));

        if (jsonLdMatches.length === 0) {
            diagnostics.push(this.createDiagnostic(
                document,
                text,
                '<head',
                'No structured data (Schema.org JSON-LD) found. Add structured data to improve search result appearance.',
                vscode.DiagnosticSeverity.Information
            ));
        } else {
            // Validate JSON-LD syntax
            for (const match of jsonLdMatches) {
                const jsonContent = match[1].trim();
                const position = document.positionAt(match.index);
                const range = new vscode.Range(position, position.translate(0, 50));

                try {
                    const schema = JSON.parse(jsonContent);
                    
                    // Check for @context
                    if (!schema['@context']) {
                        const diagnostic = new vscode.Diagnostic(
                            range,
                            'Schema.org structured data missing @context property.',
                            vscode.DiagnosticSeverity.Warning
                        );
                        diagnostic.source = 'SEO Lint';
                        diagnostics.push(diagnostic);
                    }

                    // Check for @type
                    if (!schema['@type']) {
                        const diagnostic = new vscode.Diagnostic(
                            range,
                            'Schema.org structured data missing @type property.',
                            vscode.DiagnosticSeverity.Warning
                        );
                        diagnostic.source = 'SEO Lint';
                        diagnostics.push(diagnostic);
                    }

                    // Validate common schema types
                    if (schema['@type']) {
                        this.validateSchemaType(schema, range, diagnostics);
                    }

                } catch (error) {
                    const diagnostic = new vscode.Diagnostic(
                        range,
                        'Invalid JSON-LD syntax. Fix JSON errors in structured data.',
                        vscode.DiagnosticSeverity.Error
                    );
                    diagnostic.source = 'SEO Lint';
                    diagnostics.push(diagnostic);
                }
            }
        }

        // Check for microdata
        const microdataRegex = /itemscope|itemprop|itemtype/gi;
        if (microdataRegex.test(text)) {
            diagnostics.push(this.createDiagnostic(
                document,
                text,
                'itemscope',
                'Microdata detected. Consider using JSON-LD instead for better maintainability.',
                vscode.DiagnosticSeverity.Information
            ));
        }

        return diagnostics;
    }

    private validateSchemaType(schema: any, range: vscode.Range, diagnostics: vscode.Diagnostic[]): void {
        const type = schema['@type'];

        switch (type) {
            case 'Organization':
                if (!schema.name) {
                    diagnostics.push(this.createSchemaPropertyDiagnostic(range, 'Organization', 'name'));
                }
                if (!schema.url) {
                    diagnostics.push(this.createSchemaPropertyDiagnostic(range, 'Organization', 'url'));
                }
                break;

            case 'Person':
                if (!schema.name) {
                    diagnostics.push(this.createSchemaPropertyDiagnostic(range, 'Person', 'name'));
                }
                break;

            case 'Article':
            case 'BlogPosting':
            case 'NewsArticle':
                if (!schema.headline) {
                    diagnostics.push(this.createSchemaPropertyDiagnostic(range, type, 'headline'));
                }
                if (!schema.author) {
                    diagnostics.push(this.createSchemaPropertyDiagnostic(range, type, 'author'));
                }
                if (!schema.datePublished) {
                    diagnostics.push(this.createSchemaPropertyDiagnostic(range, type, 'datePublished'));
                }
                if (!schema.image) {
                    diagnostics.push(this.createSchemaPropertyDiagnostic(range, type, 'image'));
                }
                break;

            case 'Product':
                if (!schema.name) {
                    diagnostics.push(this.createSchemaPropertyDiagnostic(range, 'Product', 'name'));
                }
                if (!schema.image) {
                    diagnostics.push(this.createSchemaPropertyDiagnostic(range, 'Product', 'image'));
                }
                if (!schema.description) {
                    diagnostics.push(this.createSchemaPropertyDiagnostic(range, 'Product', 'description'));
                }
                break;

            case 'WebSite':
                if (!schema.name) {
                    diagnostics.push(this.createSchemaPropertyDiagnostic(range, 'WebSite', 'name'));
                }
                if (!schema.url) {
                    diagnostics.push(this.createSchemaPropertyDiagnostic(range, 'WebSite', 'url'));
                }
                break;

            case 'BreadcrumbList':
                if (!schema.itemListElement) {
                    diagnostics.push(this.createSchemaPropertyDiagnostic(range, 'BreadcrumbList', 'itemListElement'));
                }
                break;
        }
    }

    private createSchemaPropertyDiagnostic(range: vscode.Range, schemaType: string, property: string): vscode.Diagnostic {
        const diagnostic = new vscode.Diagnostic(
            range,
            `Schema.org ${schemaType} missing recommended property: ${property}`,
            vscode.DiagnosticSeverity.Warning
        );
        diagnostic.source = 'SEO Lint';
        return diagnostic;
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
