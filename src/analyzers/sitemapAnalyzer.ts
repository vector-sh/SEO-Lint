import * as vscode from 'vscode';
import * as path from 'path';

interface SitemapUrl {
    loc: string;
    lastmod?: string;
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
}

export class SitemapAnalyzer {
    /**
     * Validate an existing sitemap.xml file
     */
    async validateSitemap(document: vscode.TextDocument): Promise<vscode.Diagnostic[]> {
        const diagnostics: vscode.Diagnostic[] = [];
        const text = document.getText();

        // Check for XML declaration
        if (!text.trim().startsWith('<?xml')) {
            diagnostics.push(new vscode.Diagnostic(
                new vscode.Range(0, 0, 0, 1),
                'Sitemap should start with XML declaration: <?xml version="1.0" encoding="UTF-8"?>',
                vscode.DiagnosticSeverity.Warning
            ));
        }

        // Check for urlset namespace
        if (!text.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
            diagnostics.push(new vscode.Diagnostic(
                new vscode.Range(0, 0, 0, 1),
                'Missing required xmlns attribute in urlset: xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
                vscode.DiagnosticSeverity.Error
            ));
        }

        // Parse and validate URLs
        const urlMatches = text.matchAll(/<url>([\s\S]*?)<\/url>/g);
        let urlCount = 0;

        for (const match of urlMatches) {
            urlCount++;
            const urlBlock = match[1];
            const urlIndex = match.index || 0;

            // Check for required <loc> tag
            const locMatch = urlBlock.match(/<loc>(.*?)<\/loc>/);
            if (!locMatch) {
                const position = document.positionAt(urlIndex);
                diagnostics.push(new vscode.Diagnostic(
                    new vscode.Range(position, position.translate(0, 5)),
                    'URL entry missing required <loc> tag',
                    vscode.DiagnosticSeverity.Error
                ));
            } else {
                const url = locMatch[1];
                
                // Validate URL format
                if (!url.startsWith('http://') && !url.startsWith('https://')) {
                    const position = document.positionAt(urlIndex + urlBlock.indexOf(url));
                    diagnostics.push(new vscode.Diagnostic(
                        new vscode.Range(position, position.translate(0, url.length)),
                        'URL must be absolute and start with http:// or https://',
                        vscode.DiagnosticSeverity.Error
                    ));
                }

                // Check URL length (limit is 2048 characters)
                if (url.length > 2048) {
                    const position = document.positionAt(urlIndex + urlBlock.indexOf(url));
                    diagnostics.push(new vscode.Diagnostic(
                        new vscode.Range(position, position.translate(0, url.length)),
                        `URL exceeds maximum length of 2048 characters (${url.length})`,
                        vscode.DiagnosticSeverity.Error
                    ));
                }
            }

            // Validate changefreq if present
            const changefreqMatch = urlBlock.match(/<changefreq>(.*?)<\/changefreq>/);
            if (changefreqMatch) {
                const changefreq = changefreqMatch[1];
                const validFreqs = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
                if (!validFreqs.includes(changefreq)) {
                    const position = document.positionAt(urlIndex + urlBlock.indexOf(changefreq));
                    diagnostics.push(new vscode.Diagnostic(
                        new vscode.Range(position, position.translate(0, changefreq.length)),
                        `Invalid changefreq value "${changefreq}". Must be one of: ${validFreqs.join(', ')}`,
                        vscode.DiagnosticSeverity.Error
                    ));
                }
            }

            // Validate priority if present
            const priorityMatch = urlBlock.match(/<priority>(.*?)<\/priority>/);
            if (priorityMatch) {
                const priority = parseFloat(priorityMatch[1]);
                if (isNaN(priority) || priority < 0 || priority > 1) {
                    const position = document.positionAt(urlIndex + urlBlock.indexOf(priorityMatch[1]));
                    diagnostics.push(new vscode.Diagnostic(
                        new vscode.Range(position, position.translate(0, priorityMatch[1].length)),
                        `Invalid priority value "${priorityMatch[1]}". Must be between 0.0 and 1.0`,
                        vscode.DiagnosticSeverity.Error
                    ));
                }
            }

            // Validate lastmod if present
            const lastmodMatch = urlBlock.match(/<lastmod>(.*?)<\/lastmod>/);
            if (lastmodMatch) {
                const lastmod = lastmodMatch[1];
                // Check for valid W3C datetime format (YYYY-MM-DD or ISO 8601)
                if (!/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}([+-]\d{2}:\d{2}|Z)?)?$/.test(lastmod)) {
                    const position = document.positionAt(urlIndex + urlBlock.indexOf(lastmod));
                    diagnostics.push(new vscode.Diagnostic(
                        new vscode.Range(position, position.translate(0, lastmod.length)),
                        `Invalid lastmod date format. Use W3C format: YYYY-MM-DD or ISO 8601`,
                        vscode.DiagnosticSeverity.Warning
                    ));
                }
            }
        }

        // Check URL count limit (50,000 URLs per sitemap)
        if (urlCount > 50000) {
            diagnostics.push(new vscode.Diagnostic(
                new vscode.Range(0, 0, 0, 1),
                `Sitemap contains ${urlCount} URLs. Maximum is 50,000. Consider splitting into multiple sitemaps with a sitemap index.`,
                vscode.DiagnosticSeverity.Error
            ));
        }

        // Check file size (uncompressed limit is 50MB)
        const sizeInBytes = Buffer.byteLength(text, 'utf8');
        const sizeInMB = sizeInBytes / (1024 * 1024);
        if (sizeInMB > 50) {
            diagnostics.push(new vscode.Diagnostic(
                new vscode.Range(0, 0, 0, 1),
                `Sitemap file size is ${sizeInMB.toFixed(2)}MB. Maximum uncompressed size is 50MB.`,
                vscode.DiagnosticSeverity.Error
            ));
        }

        if (urlCount === 0) {
            diagnostics.push(new vscode.Diagnostic(
                new vscode.Range(0, 0, 0, 1),
                'Sitemap contains no URLs',
                vscode.DiagnosticSeverity.Warning
            ));
        }

        return diagnostics;
    }

    /**
     * Generate a sitemap.xml from workspace HTML files
     */
    async generateSitemap(workspaceFolder: vscode.WorkspaceFolder, baseUrl: string): Promise<string> {
        const urls: SitemapUrl[] = [];

        // Find all HTML, JSX, TSX, and route files
        const files = await vscode.workspace.findFiles(
            '**/*.{html,htm}',
            '**/node_modules/**',
            1000
        );

        for (const file of files) {
            const relativePath = path.relative(workspaceFolder.uri.fsPath, file.fsPath);
            
            // Convert file path to URL path
            let urlPath = relativePath
                .replace(/\\/g, '/')  // Convert Windows backslashes
                .replace(/index\.html?$/i, '')  // Remove index.html
                .replace(/\.html?$/i, '');  // Remove .html extension

            // Ensure it starts with /
            if (!urlPath.startsWith('/')) {
                urlPath = '/' + urlPath;
            }

            // Remove trailing slash except for root
            if (urlPath !== '/' && urlPath.endsWith('/')) {
                urlPath = urlPath.slice(0, -1);
            }

            const fullUrl = baseUrl.replace(/\/$/, '') + urlPath;

            // Get file stats for lastmod
            try {
                const stat = await vscode.workspace.fs.stat(file);
                const lastmod = new Date(stat.mtime).toISOString().split('T')[0];

                urls.push({
                    loc: fullUrl,
                    lastmod: lastmod,
                    changefreq: 'weekly',
                    priority: urlPath === '/' ? 1.0 : 0.8
                });
            } catch (error) {
                // If we can't get stats, add without lastmod
                urls.push({
                    loc: fullUrl,
                    changefreq: 'weekly',
                    priority: urlPath === '/' ? 1.0 : 0.8
                });
            }
        }

        // Generate XML
        return this.generateSitemapXml(urls);
    }

    private generateSitemapXml(urls: SitemapUrl[]): string {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

        for (const url of urls) {
            xml += '  <url>\n';
            xml += `    <loc>${this.escapeXml(url.loc)}</loc>\n`;
            if (url.lastmod) {
                xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
            }
            if (url.changefreq) {
                xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
            }
            if (url.priority !== undefined) {
                xml += `    <priority>${url.priority.toFixed(1)}</priority>\n`;
            }
            xml += '  </url>\n';
        }

        xml += '</urlset>';
        return xml;
    }

    private escapeXml(text: string): string {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }
}
