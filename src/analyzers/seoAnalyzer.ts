import * as vscode from 'vscode';
import { MetaTagAnalyzer } from './metaTagAnalyzer';
import { HeadingAnalyzer } from './headingAnalyzer';
import { ContentQualityAnalyzer } from './contentQualityAnalyzer';
import { KeywordAnalyzer } from './keywordAnalyzer';
import { ImageAnalyzer } from './imageAnalyzer';
import { SchemaAnalyzer } from './schemaAnalyzer';

export class SeoAnalyzer {
    private metaTagAnalyzer: MetaTagAnalyzer;
    private headingAnalyzer: HeadingAnalyzer;
    private contentQualityAnalyzer: ContentQualityAnalyzer;
    private keywordAnalyzer: KeywordAnalyzer;
    private imageAnalyzer: ImageAnalyzer;
    private schemaAnalyzer: SchemaAnalyzer;

    constructor() {
        this.metaTagAnalyzer = new MetaTagAnalyzer();
        this.headingAnalyzer = new HeadingAnalyzer();
        this.contentQualityAnalyzer = new ContentQualityAnalyzer();
        this.keywordAnalyzer = new KeywordAnalyzer();
        this.imageAnalyzer = new ImageAnalyzer();
        this.schemaAnalyzer = new SchemaAnalyzer();
    }

    async analyze(document: vscode.TextDocument): Promise<vscode.Diagnostic[]> {
        const diagnostics: vscode.Diagnostic[] = [];
        const text = document.getText();
        const languageId = document.languageId;

        // Only analyze files that likely contain HTML-like content
        if (!this.shouldAnalyzeFile(document, text)) {
            return diagnostics;
        }

        try {
            // Run all analyzers
            diagnostics.push(...await this.metaTagAnalyzer.analyze(document, text));
            diagnostics.push(...await this.headingAnalyzer.analyze(document, text));
            diagnostics.push(...await this.contentQualityAnalyzer.analyze(document, text));
            diagnostics.push(...await this.keywordAnalyzer.analyze(document, text));
            diagnostics.push(...await this.imageAnalyzer.analyze(document, text));
            diagnostics.push(...await this.schemaAnalyzer.analyze(document, text));
        } catch (error) {
            console.error('Error during SEO analysis:', error);
        }

        return diagnostics;
    }

    private shouldAnalyzeFile(document: vscode.TextDocument, text: string): boolean {
        const languageId = document.languageId;
        
        // Always analyze HTML files
        if (languageId === 'html') {
            return true;
        }

        // For React/Vue files, check if they contain JSX/HTML-like content
        if (['javascript', 'javascriptreact', 'typescript', 'typescriptreact', 'vue'].includes(languageId)) {
            // Check for common patterns that indicate HTML content
            const hasHtmlContent = 
                text.includes('<html') ||
                text.includes('<head') ||
                text.includes('<meta') ||
                text.includes('<title') ||
                text.includes('<body') ||
                (text.includes('<h1') || text.includes('<h2') || text.includes('<h3')) ||
                text.includes('return (') && text.includes('<');
            
            return hasHtmlContent;
        }

        return false;
    }
}
