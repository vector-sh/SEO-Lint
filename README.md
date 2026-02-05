# 🔍 SEO Lint - SEO Optimizer for VSCode

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

> Analyze and optimize website SEO directly in your editor. Real-time diagnostics for meta tags, headings, keywords, and content quality.

## ✨ Features

### 🎯 Real-time SEO Analysis
- **Meta Tags Validation**: Automatically checks title tags, meta descriptions, Open Graph tags, and more
- **Heading Structure**: Ensures proper H1-H6 hierarchy and accessibility
- **Content Quality**: Analyzes word count, readability scores, and paragraph length
- **Keyword Analysis**: Detects keyword stuffing and suggests optimal keyword placement
- **Image Optimization**: Validates alt text, lazy loading, and Core Web Vitals compliance
- **Schema.org Validation**: Checks structured data (JSON-LD) for rich search results

### 🚀 Framework Support
- ✅ **HTML** - Static websites
- ✅ **React/JSX** - React applications
- ✅ **TypeScript/TSX** - TypeScript React
- ✅ **Next.js** - Server and client components
- ✅ **Vue** - Vue.js templates
- ✅ **JavaScript** - Dynamic websites

### 📊 On-Page Analysis
- Inline diagnostics with severity levels (Error, Warning, Info)
- Quick fixes for common SEO issues
- Comprehensive SEO reports
- Site-wide audits

## 🛠️ Installation

1. Open VSCode
2. Press `Ctrl+P` (or `Cmd+P` on Mac)
3. Type: `ext install vector-sh.seo-lint`
4. Press Enter

Or search for "SEO Lint" in the Extensions marketplace.

## 📖 Usage

### Automatic Analysis
SEO Lint automatically analyzes your files as you type, providing real-time feedback.

### Commands

- **SEO Lint: Analyze Current Page** - Analyze the currently open file
- **SEO Lint: Run Site Audit** - Scan all HTML/JSX/Vue files in your workspace
- **SEO Lint: Show SEO Report** - Display a comprehensive SEO report

Access commands via:
- Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
- Right-click context menu

## ⚙️ Configuration

Configure SEO Lint in your VSCode settings:

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

### Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `seoLint.enabled` | boolean | `true` | Enable/disable SEO Lint diagnostics |
| `seoLint.minWordCount` | number | `300` | Minimum word count for content quality |
| `seoLint.maxKeywordDensity` | number | `3` | Maximum keyword density percentage |
| `seoLint.requireMetaDescription` | boolean | `true` | Require meta description tags |
| `seoLint.requireOpenGraph` | boolean | `true` | Require Open Graph tags |
| `seoLint.checkReadability` | boolean | `true` | Check content readability |

## 📋 What SEO Lint Checks

### Meta Tags
- ✅ Title tag presence and length (50-60 characters)
- ✅ Meta description presence and length (150-160 characters)
- ✅ Open Graph tags (og:title, og:description, og:image, og:url)
- ✅ Viewport meta tag for mobile responsiveness
- ✅ Charset declaration
- ✅ Canonical URL

### Headings
- ✅ H1 tag presence (exactly one per page)
- ✅ Heading hierarchy (no skipped levels)
- ✅ Empty or too-short headings
- ✅ Keyword usage in headings

### Content Quality
- ✅ Minimum word count
- ✅ Average sentence length
- ✅ Paragraph length
- ✅ Duplicate content detection
- ✅ Readability metrics

### Keywords
- ✅ Keyword density analysis
- ✅ Keyword stuffing detection
- ✅ Primary keyword in title, meta description, and H1
- ✅ Natural keyword distribution

### Images
- ✅ Alt text presence and quality
- ✅ Alt text length (5-125 characters)
- ✅ Generic alt text detection
- ✅ Loading attribute (lazy loading)
- ✅ Width and height attributes (Core Web Vitals)
- ✅ Title attribute

### Schema.org
- ✅ JSON-LD structured data presence
- ✅ Valid JSON syntax
- ✅ Required properties for common schema types
- ✅ Organization, Person, Article, Product, WebSite schemas

## 🎨 Examples

### HTML Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Best Coffee Makers 2024 - Complete Buying Guide</title>
    <meta name="description" content="Discover the best coffee makers of 2024. Expert reviews, comparisons, and buying tips to help you find the perfect coffee machine for your home.">
    <link rel="canonical" href="https://example.com/coffee-makers">
    
    <!-- Open Graph -->
    <meta property="og:title" content="Best Coffee Makers 2024">
    <meta property="og:description" content="Expert reviews and buying guide">
    <meta property="og:image" content="https://example.com/og-image.jpg">
    <meta property="og:url" content="https://example.com/coffee-makers">
    
    <!-- Schema.org -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Best Coffee Makers 2024",
        "author": {
            "@type": "Person",
            "name": "Jane Doe"
        },
        "datePublished": "2024-01-15",
        "image": "https://example.com/coffee-makers.jpg"
    }
    </script>
</head>
<body>
    <h1>Best Coffee Makers of 2024</h1>
    <p>Finding the perfect coffee maker can transform your morning routine...</p>
    <img src="coffee-maker.jpg" alt="Modern stainless steel coffee maker brewing fresh coffee" width="800" height="600" loading="lazy">
</body>
</html>
```

### React/Next.js Example

```jsx
export default function HomePage() {
  return (
    <>
      <Head>
        <title>Premium Coffee Beans | Fresh Roasted Daily</title>
        <meta name="description" content="Order premium coffee beans roasted fresh daily. Free shipping on orders over $30. Discover our selection of single-origin and blend coffees." />
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

## 🐛 Issues & Suggestions

Found a bug or have a feature request? Please [open an issue](https://github.com/vector-sh/SEO-Lint/issues).

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ for developers and agencies building SEO-friendly websites**