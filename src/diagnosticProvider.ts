import * as vscode from 'vscode';
import { SeoAnalyzer } from './analyzers/seoAnalyzer';
import { RobotsAnalyzer } from './analyzers/robotsAnalyzer';

interface ReportData {
    totalIssues: number;
    errors: number;
    warnings: number;
    info: number;
    byCategory: { [key: string]: any[] };
}

export class DiagnosticProvider {
    private analyzer: SeoAnalyzer;
    private robotsAnalyzer: RobotsAnalyzer;
    private allDiagnostics: Map<string, vscode.Diagnostic[]> = new Map();

    constructor(private diagnosticCollection: vscode.DiagnosticCollection) {
        this.analyzer = new SeoAnalyzer();
        this.robotsAnalyzer = new RobotsAnalyzer();
    }

    async analyzeDocument(document: vscode.TextDocument): Promise<void> {
        if (document.isClosed) {
            return;
        }

        try {
            const diagnostics = await this.analyzer.analyze(document);
            this.allDiagnostics.set(document.uri.toString(), diagnostics);
            this.diagnosticCollection.set(document.uri, diagnostics);
        } catch (error) {
            console.error('Error analyzing document:', error);
        }
    }

    async analyzeRobotsTxt(document: vscode.TextDocument): Promise<void> {
        try {
            const diagnostics = await this.robotsAnalyzer.analyzeRobotsTxt(document);
            this.allDiagnostics.set(document.uri.toString(), diagnostics);
            this.diagnosticCollection.set(document.uri, diagnostics);
        } catch (error) {
            console.error('Error analyzing robots.txt:', error);
        }
    }

    generateReport(): ReportData {
        let totalIssues = 0;
        let errors = 0;
        let warnings = 0;
        let info = 0;
        const byCategory: { [key: string]: any[] } = {
            'Meta Tags': [],
            'Headings': [],
            'Content Quality': [],
            'Keywords': [],
            'Images': [],
            'Schema': [],
            'Other': []
        };

        for (const [uri, diagnostics] of this.allDiagnostics) {
            for (const diagnostic of diagnostics) {
                totalIssues++;
                
                switch (diagnostic.severity) {
                    case vscode.DiagnosticSeverity.Error:
                        errors++;
                        break;
                    case vscode.DiagnosticSeverity.Warning:
                        warnings++;
                        break;
                    case vscode.DiagnosticSeverity.Information:
                        info++;
                        break;
                }

                const category = this.getCategory(diagnostic.message);
                const fileName = vscode.Uri.parse(uri).fsPath.split('/').pop() || uri;
                
                byCategory[category].push({
                    file: fileName,
                    line: diagnostic.range.start.line + 1,
                    message: diagnostic.message,
                    severity: this.getSeverityString(diagnostic.severity)
                });
            }
        }

        // Remove empty categories
        Object.keys(byCategory).forEach(key => {
            if (byCategory[key].length === 0) {
                delete byCategory[key];
            }
        });

        return {
            totalIssues,
            errors,
            warnings,
            info,
            byCategory
        };
    }

    private getCategory(message: string): string {
        if (message.includes('meta') || message.includes('title') || message.includes('description') || message.includes('Twitter Card')) {
            return 'Meta Tags';
        } else if (message.includes('heading') || message.includes('h1') || message.includes('h2')) {
            return 'Headings';
        } else if (message.includes('word count') || message.includes('readability') || message.includes('Flesch')) {
            return 'Content Quality';
        } else if (message.includes('keyword') || message.includes('density')) {
            return 'Keywords';
        } else if (message.includes('image') || message.includes('alt')) {
            return 'Images';
        } else if (message.includes('schema')) {
            return 'Schema';
        } else if (message.includes('URL') || message.includes('url') || message.includes('link') || message.includes('href')) {
            return 'URLs & Links';
        } else if (message.includes('robots.txt') || message.includes('User-agent') || message.includes('Disallow')) {
            return 'Technical SEO';
        }
        return 'Other';
    }

    private getSeverityString(severity: vscode.DiagnosticSeverity | undefined): string {
        switch (severity) {
            case vscode.DiagnosticSeverity.Error:
                return 'error';
            case vscode.DiagnosticSeverity.Warning:
                return 'warning';
            case vscode.DiagnosticSeverity.Information:
                return 'info';
            default:
                return 'info';
        }
    }
}
