# Changelog

All notable changes to the "SEO Lint" extension will be documented in this file.

## [1.2.0] - 2024-02-05

### Added
- **Sitemap Generator**: Automatically generate sitemap.xml from HTML files in your workspace
  - Scans workspace for HTML files
  - Prompts for base URL
  - Generates standards-compliant XML sitemap
  - Includes lastmod, changefreq, and priority for each URL
  - Smart URL path conversion (removes index.html, .html extensions)
- **Sitemap Validator**: Complete sitemap.xml validation including:
  - XML structure validation
  - Required xmlns namespace check
  - URL format validation (must be absolute)
  - changefreq value validation (always, hourly, daily, weekly, monthly, yearly, never)
  - priority range validation (0.0 to 1.0)
  - lastmod date format validation (W3C/ISO 8601)
  - 50,000 URL limit enforcement
  - 50MB file size limit check
- **New Commands**:
  - "SEO Lint: Generate sitemap.xml" - Generate sitemap from workspace files
  - "SEO Lint: Validate sitemap.xml" - Validate existing sitemap

## [1.1.0] - 2024-02-05

### Added
- **Flesch Reading Ease Score**: Advanced readability analysis with industry-standard Flesch Reading Ease formula
- **Twitter Card Validation**: Complete validation for Twitter Card meta tags (twitter:card, twitter:title, twitter:description, twitter:image)
- **URL Structure Analysis**: SEO-friendly URL validation including:
  - URL length checks
  - Lowercase enforcement
  - Underscore vs hyphen recommendations
  - Query parameter warnings
  - Path segment analysis
- **Internal Link Analysis**: Comprehensive link validation including:
  - Internal vs external link detection
  - Anchor text quality checks
  - Generic link text detection ("click here", "read more")
  - Empty link text validation
  - External link security (rel="noopener noreferrer")
- **robots.txt Validator**: Complete robots.txt validation including:
  - Syntax validation
  - User-agent directive checks
  - Disallow/Allow directive validation
  - Sitemap URL validation
  - Crawl-delay recommendations
- **New Command**: "SEO Lint: Validate robots.txt" for direct robots.txt validation

### Enhanced
- Content quality analyzer now includes syllable counting for accurate Flesch score
- Diagnostic categorization expanded to include "URLs & Links" and "Technical SEO"
- Improved diagnostic messages with more actionable recommendations

## [1.0.0] - 2024-02-05

### Added
- Initial release of SEO Lint
- Real-time SEO diagnostics for HTML, React, Next.js, Vue, and static sites
- Meta tags analysis (title, description, Open Graph tags)
- Heading structure validation (H1-H6 hierarchy)
- Content quality analysis (word count, readability)
- Keyword density analysis and stuffing detection
- Image optimization checks (alt text, lazy loading, dimensions)
- Schema.org structured data validation (JSON-LD)
- Site-wide audit command
- SEO report generation
- Configurable settings for customization
- Support for multiple frameworks and languages
- Inline warnings and error messages
- Quick fixes for common SEO issues

### Features
- Analyze current page command
- Run site audit command
- Show SEO report command
- Automatic analysis on file open, change, and save
- Severity levels: Error, Warning, Information
- Framework support: HTML, JavaScript, JSX, TypeScript, TSX, Vue

### Configuration Options
- Enable/disable extension
- Minimum word count threshold
- Maximum keyword density
- Meta description requirement
- Open Graph requirement
- Readability checks

## [Unreleased]

### Planned Features
- Custom keyword tracking
- Competitive analysis
- Lighthouse integration
- Performance metrics
- Mobile-first analysis
- International SEO support
- XML sitemap generator and validator
- AI-powered content suggestions
- Accessibility (WCAG) checks
- SERP preview simulator
- Historical SEO score tracking
