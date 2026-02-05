import * as vscode from 'vscode';

export class ContentQualityAnalyzer {
    async analyze(document: vscode.TextDocument, text: string): Promise<vscode.Diagnostic[]> {
        const diagnostics: vscode.Diagnostic[] = [];
        const config = vscode.workspace.getConfiguration('seoLint');

        if (!config.get<boolean>('checkReadability', true)) {
            return diagnostics;
        }

        // Extract text content from HTML/JSX
        const textContent = this.extractTextContent(text);
        const words = textContent.split(/\s+/).filter(w => w.length > 0);
        const wordCount = words.length;

        // Check word count
        const minWordCount = config.get<number>('minWordCount', 300);
        if (wordCount < minWordCount) {
            diagnostics.push(this.createDiagnostic(
                document,
                text,
                '<body',
                `Low word count (${wordCount} words). Aim for at least ${minWordCount} words for better SEO.`,
                vscode.DiagnosticSeverity.Information
            ));
        }

        // Calculate readability metrics
        const sentences = textContent.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const sentenceCount = sentences.length;

        if (sentenceCount > 0) {
            const avgWordsPerSentence = wordCount / sentenceCount;
            
            // Flag overly complex sentences
            if (avgWordsPerSentence > 25) {
                diagnostics.push(this.createDiagnostic(
                    document,
                    text,
                    '<body',
                    `Average sentence length is ${avgWordsPerSentence.toFixed(1)} words. Consider shorter sentences for better readability.`,
                    vscode.DiagnosticSeverity.Information
                ));
            }
        }

        // Check for very long paragraphs
        const paragraphRegex = /<p[^>]*>(.*?)<\/p>/gis;
        let pMatch;
        while ((pMatch = paragraphRegex.exec(text)) !== null) {
            const pContent = this.stripHtmlTags(pMatch[1]);
            const pWords = pContent.split(/\s+/).filter(w => w.length > 0).length;
            
            if (pWords > 150) {
                const position = document.positionAt(pMatch.index);
                const range = new vscode.Range(position, position.translate(0, 10));
                const diagnostic = new vscode.Diagnostic(
                    range,
                    `Long paragraph (${pWords} words). Break it into smaller paragraphs for better readability.`,
                    vscode.DiagnosticSeverity.Information
                );
                diagnostic.source = 'SEO Lint';
                diagnostics.push(diagnostic);
            }
        }

        // Check for duplicate content
        if (wordCount > 50) {
            const phrases = this.extractPhrases(words, 5);
            const duplicates = this.findDuplicates(phrases);
            
            if (duplicates.length > 0) {
                diagnostics.push(this.createDiagnostic(
                    document,
                    text,
                    '<body',
                    `Found ${duplicates.length} repeated phrases. Avoid duplicate content for better SEO.`,
                    vscode.DiagnosticSeverity.Information
                ));
            }
        }

        return diagnostics;
    }

    private extractTextContent(html: string): string {
        // Remove script and style tags using iterative replacement to handle all variations
        // This is more secure than complex regex patterns
        let text = html;
        
        // Remove all script tags - multiple passes to handle nested/malformed tags
        let prevText = '';
        while (prevText !== text) {
            prevText = text;
            text = text.replace(/<script\b[^>]*>[\s\S]*?<\/script[^>]*>/gi, ' ');
        }
        
        // Remove all style tags - multiple passes to handle nested/malformed tags
        prevText = '';
        while (prevText !== text) {
            prevText = text;
            text = text.replace(/<style\b[^>]*>[\s\S]*?<\/style[^>]*>/gi, ' ');
        }
        
        // Remove HTML tags
        text = this.stripHtmlTags(text);
        
        // Remove extra whitespace
        text = text.replace(/\s+/g, ' ').trim();
        
        return text;
    }

    private stripHtmlTags(html: string): string {
        return html.replace(/<[^>]*>/g, ' ');
    }

    private extractPhrases(words: string[], length: number): string[] {
        const phrases: string[] = [];
        for (let i = 0; i <= words.length - length; i++) {
            phrases.push(words.slice(i, i + length).join(' ').toLowerCase());
        }
        return phrases;
    }

    private findDuplicates(phrases: string[]): string[] {
        const counts = new Map<string, number>();
        const duplicates: string[] = [];
        
        for (const phrase of phrases) {
            counts.set(phrase, (counts.get(phrase) || 0) + 1);
        }
        
        for (const [phrase, count] of counts) {
            if (count > 2) {
                duplicates.push(phrase);
            }
        }
        
        return duplicates;
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
