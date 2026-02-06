# 🔍 SEO Lint - Complete SEO Optimizer for VSCode

![Version](https://img.shields.io/visual-studio-marketplace/v/vector-sh.seo-lint.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![VSCode](https://img.shields.io/badge/VSCode-1.80.0+-blue.svg)

> **Analyze and optimize website SEO directly in your editor.** Real-time diagnostics for meta tags, headings, keywords, content quality, and technical SEO. Catch SEO issues before deployment!

---

## 📑 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [How to Use](#-how-to-use)
- [Commands Reference](#-commands-reference)
- [Configuration](#-configuration)
- [What SEO Lint Checks](#-what-seo-lint-checks)
- [Framework Support](#-framework-support)
- [Troubleshooting](#-troubleshooting)
- [Examples](#-examples)
- [FAQs](#-faqs)
- [Contributing](#-contributing)

---

## ✨ Features

### 🎯 Real-time SEO Analysis
- **Meta Tags Validation**: Title tags, meta descriptions, Open Graph tags, Twitter Cards
- **Heading Structure**: H1-H6 hierarchy validation and accessibility checks
- **Content Quality**: Flesch Reading Ease score, word count, paragraph analysis
- **Keyword Analysis**: Density detection, stuffing prevention, placement optimization
- **Image Optimization**: Alt text validation, lazy loading, Core Web Vitals compliance
- **Schema.org Validation**: JSON-LD structured data validation
- **URL Structure**: SEO-friendly URL validation and recommendations
- **Link Analysis**: Internal/external links, anchor text quality, security attributes
- **Technical SEO**: robots.txt and sitemap.xml generation and validation

### 🚀 Framework Support
- ✅ **HTML** - Static websites
- ✅ **React/JSX** - React applications  
- ✅ **TypeScript/TSX** - TypeScript React
- ✅ **Next.js** - Server and client components
- ✅ **Vue.js** - Vue templates
- ✅ **JavaScript** - Dynamic websites

### 📊 Key Capabilities
- **Real-time diagnostics** with inline warnings
- **Site-wide audits** across your entire workspace
- **SEO reports** with categorized issues
- **Sitemap generation** from HTML files
- **85+ SEO checks** across 10 categories
- **Problems panel integration** for easy issue tracking

---

## 🛠️ Installation

### Method 1: VSCode Marketplace (Recommended)
1. Open VSCode
2. Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac)
3. Search for "**SEO Lint**"
4. Click **Install**

### Method 2: Quick Install
1. Press `Ctrl+P` (Windows/Linux) or `Cmd+P` (Mac)
2. Type: `ext install vector-sh.seo-lint`
3. Press **Enter**

### Method 3: Manual Installation
1. Download the `.vsix` file from releases
2. Open VSCode
3. Press `Ctrl+Shift+P` and type "**Install from VSIX**"
4. Select the downloaded file

---

## 🚀 Quick Start

### Step 1: Open a File
Open any HTML, JSX, TSX, or Vue file in your workspace.

### Step 2: See Real-time Diagnostics
SEO Lint automatically analyzes your file. Look for:
- **Squiggly underlines** in your code (red = error, yellow = warning, blue = info)
- **Problems panel** (View → Problems or `Ctrl+Shift+M`)

### Step 3: Fix Issues
Hover over underlined text to see the issue description and recommendations.

### Step 4: Run Site Audit
Press `Ctrl+Shift+P` and type "**SEO Lint: Run Site Audit**" to analyze your entire workspace.

---

## 📖 How to Use

### Automatic Analysis

SEO Lint works automatically once installed:

1. **Open a file** - Analysis starts immediately for HTML, JSX, TSX, Vue, JS, TS files
2. **Type and edit** - Real-time feedback as you code
3. **Save file** - Re-analysis ensures everything is up-to-date
4. **View problems** - Check the Problems panel (`Ctrl+Shift+M`) for all issues

### Manual Analysis

**Analyze Current Page:**
1. Press `Ctrl+Shift+P` (Command Palette)
2. Type: `SEO Lint: Analyze Current Page`
3. Press Enter
4. View results in Problems panel

**Run Site Audit:**
1. Press `Ctrl+Shift+P`
2. Type: `SEO Lint: Run Site Audit`
3. Press Enter
4. Wait for progress notification
5. Review all issues across your workspace

**View SEO Report:**
1. Press `Ctrl+Shift+P`
2. Type: `SEO Lint: Show SEO Report`
3. Press Enter
4. View comprehensive HTML report with:
   - Total issues count
   - Issues by severity (Errors, Warnings, Info)
   - Issues by category (Meta Tags, Headings, etc.)

### robots.txt Management

**Validate robots.txt:**
1. Create or open `robots.txt` in workspace root
2. Press `Ctrl+Shift+P`
3. Type: `SEO Lint: Validate robots.txt`
4. View validation results in Problems panel

**Example robots.txt:**
```txt
User-agent: *
Disallow: /admin/
Disallow: /private/
Allow: /public/

Sitemap: https://yoursite.com/sitemap.xml
```

### Sitemap Management

**Generate sitemap.xml:**
1. Press `Ctrl+Shift+P`
2. Type: `SEO Lint: Generate sitemap.xml`
3. Enter your base URL (e.g., `https://yoursite.com`)
4. Extension scans workspace and creates `sitemap.xml`

**Validate sitemap.xml:**
1. Press `Ctrl+Shift+P`
2. Type: `SEO Lint: Validate sitemap.xml`
3. View validation results in Problems panel

**What gets included in sitemap:**
- All `.html` and `.htm` files in workspace
- Automatic URL path generation
- File modification dates as `lastmod`
- Smart removal of `index.html` and `.html` extensions

---

## 🎮 Commands Reference

Access commands via Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`):

| Command | Description | Shortcut |
|---------|-------------|----------|
| **SEO Lint: Analyze Current Page** | Analyze the currently open file | - |
| **SEO Lint: Run Site Audit** | Scan all HTML/JSX/Vue files in workspace | - |
| **SEO Lint: Show SEO Report** | Display comprehensive SEO report | - |
| **SEO Lint: Validate robots.txt** | Validate robots.txt syntax and best practices | - |
| **SEO Lint: Generate sitemap.xml** | Generate sitemap from HTML files | - |
| **SEO Lint: Validate sitemap.xml** | Validate sitemap.xml structure and content | - |

**Pro Tip:** Right-click in any supported file to access commands from the context menu.

---

## ⚙️ Configuration

Configure SEO Lint via VSCode settings:

### Access Settings
1. Press `Ctrl+,` (Windows/Linux) or `Cmd+,` (Mac)
2. Search for "**SEO Lint**"
3. Modify settings

### Available Settings

```json
{
  "seoLint.enabled": true,
  "seoLint.minWordCount": 300,
  "seoLint.maxKeywordDensity": 3,
  "seoLint.requireMetaDescription": true,
  "seoLint.requireOpenGraph": true,
  "seoLint.checkReadability": true
}
```

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `seoLint.enabled` | boolean | `true` | Enable/disable SEO Lint diagnostics |
| `seoLint.minWordCount` | number | `300` | Minimum word count for content quality |
| `seoLint.maxKeywordDensity` | number | `3` | Maximum keyword density percentage |
| `seoLint.requireMetaDescription` | boolean | `true` | Require meta description tags |
| `seoLint.requireOpenGraph` | boolean | `true` | Require Open Graph tags |
| `seoLint.checkReadability` | boolean | `true` | Check content readability (Flesch score) |

### Example Custom Configuration

```json
{
  "seoLint.enabled": true,
  "seoLint.minWordCount": 500,
  "seoLint.maxKeywordDensity": 2,
  "seoLint.requireMetaDescription": true,
  "seoLint.requireOpenGraph": true,
  "seoLint.checkReadability": true
}
```

---

## 📋 What SEO Lint Checks

### Meta Tags (12 checks)
- ✅ Title tag presence and length (50-60 characters)
- ✅ Meta description presence and length (150-160 characters)
- ✅ Open Graph tags (og:title, og:description, og:image, og:url)
- ✅ Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image)
- ✅ Viewport meta tag for mobile responsiveness
- ✅ Charset declaration (UTF-8)
- ✅ Canonical URL

### Headings (6 checks)
- ✅ H1 tag presence (exactly one per page)
- ✅ Multiple H1 detection
- ✅ Heading hierarchy (no skipped levels)
- ✅ Empty or too-short headings
- ✅ Keyword usage in headings

### Content Quality (8 checks)
- ✅ Minimum word count (configurable, default 300)
- ✅ Flesch Reading Ease score (0-100 scale)
- ✅ Average sentence length (< 25 words)
- ✅ Paragraph length (< 150 words)
- ✅ Duplicate content detection

### Keywords (5 checks)
- ✅ Keyword density analysis
- ✅ Keyword stuffing detection (configurable max 3%)
- ✅ Primary keyword in title
- ✅ Primary keyword in meta description
- ✅ Primary keyword in H1

### Images (8 checks)
- ✅ Alt text presence (required)
- ✅ Alt text length (5-125 characters)
- ✅ Generic alt text detection ("image", "photo")
- ✅ Empty alt text warning
- ✅ Loading attribute (lazy loading)
- ✅ Width and height attributes (Core Web Vitals)
- ✅ Title attribute

### URLs & Links (10 checks)
- ✅ SEO-friendly URL structure
- ✅ URL length validation (< 75 characters)
- ✅ Lowercase URL enforcement
- ✅ Hyphen vs underscore usage
- ✅ Internal link detection
- ✅ External link security (rel attributes)
- ✅ Anchor text quality
- ✅ Generic link text detection
- ✅ Empty link text errors

### Technical SEO - robots.txt (10 checks)
- ✅ Syntax validation
- ✅ User-agent directive checks
- ✅ Disallow/Allow directive validation
- ✅ Sitemap URL validation
- ✅ Crawl-delay validation
- ✅ Unknown directive warnings
- ✅ Critical blocking detection (Disallow: /)

### Technical SEO - Sitemap (15 checks)
- ✅ XML declaration validation
- ✅ xmlns namespace requirement
- ✅ Absolute URL validation
- ✅ URL length validation (2048 char limit)
- ✅ changefreq value validation
- ✅ priority range validation (0.0-1.0)
- ✅ lastmod date format validation
- ✅ 50,000 URL limit enforcement
- ✅ 50MB file size limit check

### Schema.org (8 checks)
- ✅ JSON-LD structured data presence
- ✅ Valid JSON syntax
- ✅ Required @context and @type
- ✅ Schema-specific property validation
- ✅ Organization, Person, Article, Product, WebSite, BreadcrumbList schemas

**Total: 85+ SEO checks across 10 categories**

---

## 🌐 Framework Support

### HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Your Page Title</title>
    <meta name="description" content="Your description">
</head>
<body>
    <h1>Main Heading</h1>
</body>
</html>
```

### React/Next.js (JSX/TSX)
```jsx
export default function Page() {
  return (
    <>
      <Head>
        <title>Your Page Title</title>
        <meta name="description" content="Your description" />
      </Head>
      <h1>Main Heading</h1>
    </>
  );
}
```

### Vue
```vue
<template>
  <div>
    <h1>Main Heading</h1>
  </div>
</template>
```

**Detection:** SEO Lint automatically detects framework based on file extension and content patterns.

---

## 🔧 Troubleshooting

### Extension Not Working?

**Check file type:**
- SEO Lint only analyzes: `.html`, `.htm`, `.jsx`, `.tsx`, `.vue`, `.js`, `.ts`
- Verify your file has HTML-like content

**Check if enabled:**
1. Open Settings (`Ctrl+,`)
2. Search "seoLint.enabled"
3. Ensure it's set to `true`

**Reload window:**
1. Press `Ctrl+Shift+P`
2. Type: "Reload Window"
3. Press Enter

### No Diagnostics Showing?

**Open Problems panel:**
- View → Problems
- Or press `Ctrl+Shift+M`

**Run manual analysis:**
- `Ctrl+Shift+P` → "SEO Lint: Analyze Current Page"

**Check console:**
1. Help → Toggle Developer Tools
2. Check Console tab for errors

### Too Many Warnings?

**Adjust settings:**
```json
{
  "seoLint.minWordCount": 500,
  "seoLint.maxKeywordDensity": 4,
  "seoLint.requireOpenGraph": false
}
```

**Disable temporarily:**
```json
{
  "seoLint.enabled": false
}
```

### Performance Issues?

**For large files:**
- SEO Lint is optimized for files up to 10,000 lines
- Consider splitting very large files

**For large workspaces:**
- Site audit scans up to 100 files
- Use specific file patterns to limit scope

---

## 📚 Examples

### Example 1: Perfect HTML Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Best Coffee Makers 2024 - Complete Buying Guide</title>
    <meta name="description" content="Discover the best coffee makers of 2024. Expert reviews, comparisons, and buying tips to help you find the perfect coffee machine.">
    <link rel="canonical" href="https://example.com/coffee-makers">
    
    <!-- Open Graph -->
    <meta property="og:title" content="Best Coffee Makers 2024">
    <meta property="og:description" content="Expert reviews and buying guide">
    <meta property="og:image" content="https://example.com/og-image.jpg">
    <meta property="og:url" content="https://example.com/coffee-makers">
    
    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Best Coffee Makers 2024">
    <meta name="twitter:description" content="Expert reviews and buying guide">
    <meta name="twitter:image" content="https://example.com/twitter-image.jpg">
    
    <!-- Schema.org -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Best Coffee Makers 2024",
        "author": {"@type": "Person", "name": "Jane Doe"},
        "datePublished": "2024-01-15",
        "image": "https://example.com/coffee-makers.jpg"
    }
    </script>
</head>
<body>
    <h1>Best Coffee Makers of 2024</h1>
    
    <p>Finding the perfect coffee maker can transform your morning routine. 
    This comprehensive guide explores the top coffee makers of 2024...</p>
    
    <img 
        src="coffee-maker.jpg" 
        alt="Modern stainless steel coffee maker brewing fresh coffee"
        width="800" 
        height="600"
        loading="lazy"
    >
    
    <h2>Our Top Picks</h2>
    <p>Based on extensive testing, here are our recommendations...</p>
</body>
</html>
```

### Example 2: Next.js Page

```tsx
import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Premium Coffee Beans | Fresh Roasted Daily</title>
        <meta name="description" content="Order premium coffee beans roasted fresh daily. Free shipping on orders over $30." />
        <meta property="og:title" content="Premium Coffee Beans" />
        <meta property="og:description" content="Fresh roasted daily" />
        <meta property="og:image" content="/og-image.jpg" />
      </Head>
      
      <h1>Premium Coffee Beans</h1>
      <p>Welcome to our collection of freshly roasted coffee beans...</p>
      
      <img 
        src="/beans.jpg" 
        alt="Freshly roasted coffee beans in a burlap sack"
        width={800}
        height={600}
        loading="lazy"
      />
    </>
  );
}
```

### Example 3: robots.txt

```txt
# Allow all search engines
User-agent: *
Disallow: /admin/
Disallow: /api/
Disallow: /private/
Allow: /public/

# Specific bot rules
User-agent: Googlebot
Crawl-delay: 10

# Sitemap location
Sitemap: https://yoursite.com/sitemap.xml
```

---

## ❓ FAQs

### Q: Does SEO Lint work offline?
**A:** Yes! SEO Lint runs entirely locally without internet connection.

### Q: Does it send my code anywhere?
**A:** No. All analysis happens locally in VSCode. Your code never leaves your machine.

### Q: Can I customize the rules?
**A:** Yes, through settings. You can adjust thresholds for word count, keyword density, and enable/disable specific checks.

### Q: Does it work with TypeScript?
**A:** Yes! Full support for `.tsx` and `.ts` files with React/JSX content.

### Q: Can I use it for static site generators?
**A:** Yes! Works great with Jekyll, Hugo, Gatsby, Next.js, and other SSGs.

### Q: Does it check for duplicate content across files?
**A:** Currently checks within files. Cross-file duplicate detection is planned for future updates.

### Q: Can I export the SEO report?
**A:** The HTML report can be copied from the webview panel. Export feature planned for future updates.

### Q: Does it integrate with CI/CD?
**A:** Currently designed for local development. CI/CD integration planned for future versions.

---

## 📖 Additional Resources

- **[QUICKSTART.md](./QUICKSTART.md)** - 5-minute quick start guide
- **[TESTING.md](./TESTING.md)** - Testing procedures and test cases
- **[FEATURES.md](./FEATURES.md)** - Complete feature breakdown
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history
- **[IMPLEMENTATION.md](./IMPLEMENTATION.md)** - Technical implementation details

---

## 🐛 Issues & Support

Found a bug or have a feature request?

1. **Search existing issues:** [GitHub Issues](https://github.com/vector-sh/SEO-Lint/issues)
2. **Create new issue:** Provide details, steps to reproduce, and expected behavior
3. **Community:** Join discussions and get help from other users

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with ❤️ for developers and agencies building SEO-friendly websites.

Special thanks to:
- VSCode Extension API
- SEO community for best practices
- All contributors and users

---

**Author:** Vector  
**Repository:** [github.com/vector-sh/SEO-Lint](https://github.com/vector-sh/SEO-Lint)

---

*Happy SEO Optimizing! 🚀*
