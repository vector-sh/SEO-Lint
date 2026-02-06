import * as vscode from 'vscode';

export class KeywordAnalyzer {
    async analyze(document: vscode.TextDocument, text: string): Promise<vscode.Diagnostic[]> {
        const diagnostics: vscode.Diagnostic[] = [];
        const config = vscode.workspace.getConfiguration('seoLint');
        const maxDensity = config.get<number>('maxKeywordDensity', 3);

        // Extract text content
        const textContent = this.extractTextContent(text);
        const words = textContent.toLowerCase().split(/\s+/).filter(w => w.length > 2);
        const totalWords = words.length;

        if (totalWords < 50) {
            return diagnostics; // Not enough content to analyze
        }

        // Count word frequencies
        const wordFrequency = new Map<string, number>();
        for (const word of words) {
            // Skip common words
            if (this.isCommonWord(word)) {
                continue;
            }
            wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
        }

        // Check for keyword stuffing
        for (const [word, count] of wordFrequency) {
            const density = (count / totalWords) * 100;
            
            if (density > maxDensity && count > 5) {
                diagnostics.push(this.createDiagnostic(
                    document,
                    text,
                    '<body',
                    `Keyword "${word}" appears ${count} times (${density.toFixed(1)}% density). Keyword stuffing may hurt SEO. Recommended max: ${maxDensity}%`,
                    vscode.DiagnosticSeverity.Warning
                ));
            }
        }

        // Check for focus keyword in title
        const titleMatch = text.match(/<title[^>]*>(.*?)<\/title>/i);
        if (titleMatch && wordFrequency.size > 0) {
            const titleWords = titleMatch[1].toLowerCase().split(/\s+/);
            const topKeywords = Array.from(wordFrequency.entries())
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(e => e[0]);

            const hasFocusKeyword = topKeywords.some(kw => titleWords.some(tw => tw.includes(kw)));
            
            if (!hasFocusKeyword) {
                diagnostics.push(this.createDiagnostic(
                    document,
                    text,
                    titleMatch[0],
                    'Consider including your primary keyword in the title tag for better SEO.',
                    vscode.DiagnosticSeverity.Information
                ));
            }
        }

        // Check for keywords in meta description
        const metaDescMatch = text.match(/<meta\s+name=["']description["'][^>]*content=["']([^"']*)["']/i);
        if (metaDescMatch && wordFrequency.size > 0) {
            const descWords = metaDescMatch[1].toLowerCase().split(/\s+/);
            const topKeywords = Array.from(wordFrequency.entries())
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(e => e[0]);

            const hasKeywordInDesc = topKeywords.some(kw => descWords.some(dw => dw.includes(kw)));
            
            if (!hasKeywordInDesc) {
                diagnostics.push(this.createDiagnostic(
                    document,
                    text,
                    metaDescMatch[0],
                    'Consider including your primary keyword in the meta description.',
                    vscode.DiagnosticSeverity.Information
                ));
            }
        }

        // Check for keywords in H1
        const h1Match = text.match(/<h1[^>]*>(.*?)<\/h1>/i);
        if (h1Match && wordFrequency.size > 0) {
            const h1Words = this.stripHtmlTags(h1Match[1]).toLowerCase().split(/\s+/);
            const topKeywords = Array.from(wordFrequency.entries())
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(e => e[0]);

            const hasKeywordInH1 = topKeywords.some(kw => h1Words.some(hw => hw.includes(kw)));
            
            if (!hasKeywordInH1) {
                diagnostics.push(this.createDiagnostic(
                    document,
                    text,
                    h1Match[0],
                    'Consider including your primary keyword in the H1 heading.',
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
        
        text = this.stripHtmlTags(text);
        text = text.replace(/\s+/g, ' ').trim();
        return text;
    }

    private stripHtmlTags(html: string): string {
        return html.replace(/<[^>]*>/g, ' ');
    }

    private isCommonWord(word: string): boolean {
        const commonWords = new Set([
            'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
            'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
            'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
            'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their',
            'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go',
            'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know',
            'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them',
            'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over',
            'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first',
            'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day',
            'most', 'us', 'is', 'was', 'are', 'been', 'has', 'had', 'were', 'said', 'did',
            'having', 'may', 'should', 'does', 'am', 'being', 'might', 'shall'
        ]);
        return commonWords.has(word);
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
