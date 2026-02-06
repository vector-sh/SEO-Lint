# 🔍 SEO Lint - Professional SEO Optimizer for VSCode

<div align="center">

![Version](https://img.shields.io/visual-studio-marketplace/v/vector-sh.seo-lint.svg)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/vector-sh.seo-lint.svg)
![Rating](https://img.shields.io/visual-studio-marketplace/r/vector-sh.seo-lint.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![VSCode](https://img.shields.io/badge/VSCode-1.80.0+-blue.svg)

</div>

> **🚀 Analyze and optimize website SEO directly in your editor!**  
> Real-time diagnostics for meta tags, headings, keywords, content quality, and technical SEO.  
> **Catch SEO issues before deployment** with inline warnings and comprehensive audits.

---

## 🎯 Why SEO Lint?

**SEO Lint brings professional SEO analysis directly into your development workflow:**

- ✅ **Catch issues early** - Fix SEO problems before they go live
- ✅ **Save time** - No need to switch between tools or browser extensions
- ✅ **Learn as you code** - Inline suggestions teach SEO best practices
- ✅ **Framework agnostic** - Works with HTML, React, Next.js, Vue, and more
- ✅ **Zero configuration** - Works out of the box with sensible defaults
- ✅ **85+ checks** - Comprehensive analysis across 10 SEO categories

**Perfect for:**
- 👨‍💻 Web developers building SEO-friendly websites
- 🏢 Agencies managing multiple client sites
- ✍️ Content creators working with static site generators
- 🎯 SEO specialists who work directly with code
- 💼 Freelancers managing website projects

---

## 📑 Table of Contents

- [Why SEO Lint?](#-why-seo-lint)
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

<table>
<tr>
<td width="33%" valign="top">

**📝 Content & Meta Tags**
- Title tag length (50-60 chars)
- Meta description (150-160 chars)
- Open Graph tags (4 required)
- Twitter Cards (4 required)
- Charset & viewport tags

</td>
<td width="33%" valign="top">

**📊 Content Quality**
- Flesch Reading Ease score
- Word count analysis (min 300)
- Paragraph length checks
- Sentence structure analysis
- Keyword density (max 3%)

</td>
<td width="33%" valign="top">

**🔗 Links & Structure**
- Internal/external links
- Anchor text quality
- Generic text detection
- H1-H6 hierarchy
- URL structure validation

</td>
</tr>
<tr>
<td width="33%" valign="top">

**🖼️ Images & Media**
- Alt text presence (required)
- Alt text quality (5-125 chars)
- Width/height attributes
- Lazy loading suggestions
- Core Web Vitals compliance

</td>
<td width="33%" valign="top">

**🔧 Technical SEO**
- robots.txt validation
- Sitemap.xml generation
- Sitemap.xml validation
- Schema.org (JSON-LD)
- Canonical tags

</td>
<td width="33%" valign="top">

**⚡ Developer Experience**
- Real-time diagnostics
- Problems panel integration
- Inline code warnings
- Site-wide audits
- HTML reports

</td>
</tr>
</table>

### 🚀 Framework Support

Works seamlessly with modern web frameworks and static sites:

| Framework | Status | File Types | Notes |
|-----------|--------|------------|-------|
| **HTML** | ✅ Full Support | `.html`, `.htm` | Static websites |
| **React** | ✅ Full Support | `.jsx`, `.tsx` | React applications |
| **Next.js** | ✅ Full Support | `.jsx`, `.tsx`, `.js`, `.ts` | Server & client components |
| **Vue.js** | ✅ Full Support | `.vue` | Vue templates |
| **TypeScript** | ✅ Full Support | `.ts`, `.tsx` | TypeScript projects |
| **JavaScript** | ✅ Full Support | `.js`, `.jsx` | Dynamic websites |

### 📊 Key Capabilities

<div align="center">

| Feature | Description | Benefit |
|---------|-------------|---------|
| 🔴 **Real-time diagnostics** | Inline warnings as you type | Fix issues immediately |
| 🌐 **Site-wide audits** | Analyze entire workspace | Find all SEO problems |
| 📋 **SEO reports** | Categorized issue lists | Prioritize fixes |
| 🗺️ **Sitemap generation** | Auto-create from HTML files | Save time |
| ⚙️ **85+ checks** | Across 10 SEO categories | Comprehensive coverage |
| 🎯 **Problems panel** | VSCode integration | Familiar workflow |

</div>

---

## 🛠️ Installation

### Quick Install (Recommended)

<div align="center">

**Option 1: VSCode Marketplace**

Press `Ctrl+Shift+X` → Search "**SEO Lint**" → Click **Install**

**Option 2: Command Line**

Press `Ctrl+P` → Type `ext install vector-sh.seo-lint` → Press **Enter**

</div>

### Step-by-Step Installation

<details>
<summary><b>📦 Method 1: VSCode Marketplace (Easiest)</b></summary>

1. Open VSCode
2. Click Extensions icon in sidebar (or press `Ctrl+Shift+X`)
3. Search for "**SEO Lint**"
4. Click **Install** button
5. Reload VSCode if prompted

</details>

<details>
<summary><b>⚡ Method 2: Quick Install Command</b></summary>

1. Press `Ctrl+P` (Windows/Linux) or `Cmd+P` (Mac)
2. Paste: `ext install vector-sh.seo-lint`
3. Press **Enter**
4. Wait for installation to complete

</details>

<details>
<summary><b>📂 Method 3: Manual Installation (Offline)</b></summary>

1. Download the `.vsix` file from [GitHub Releases](https://github.com/vector-sh/SEO-Lint/releases)
2. Open VSCode
3. Press `Ctrl+Shift+P` to open Command Palette
4. Type "**Install from VSIX**"
5. Select the downloaded `.vsix` file
6. Reload VSCode

</details>

---

## 🚀 Quick Start

### ⚡ 30-Second Setup

1. **Install** the extension (see above)
2. **Open** any HTML, JSX, TSX, or Vue file
3. **Watch** SEO issues appear automatically in Problems panel
4. **Fix** issues by hovering over red/yellow underlines

That's it! SEO Lint works automatically with zero configuration.

### 📖 Detailed Getting Started

<table>
<tr>
<td width="25%" align="center">

**1️⃣ Open File**

<img src="https://img.shields.io/badge/📄-HTML%20%7C%20JSX%20%7C%20Vue-blue" />

Open any supported file

</td>
<td width="25%" align="center">

**2️⃣ See Diagnostics**

<img src="https://img.shields.io/badge/🔍-Auto%20Analysis-green" />

Issues appear automatically

</td>
<td width="25%" align="center">

**3️⃣ Review Issues**

<img src="https://img.shields.io/badge/⚠️-Problems%20Panel-yellow" />

Press `Ctrl+Shift+M`

</td>
<td width="25%" align="center">

**4️⃣ Fix & Deploy**

<img src="https://img.shields.io/badge/✅-Deploy%20Clean-brightgreen" />

Ship SEO-optimized code

</td>
</tr>
</table>

#### Step-by-Step:

1. **Open a File** - Any HTML, JSX, TSX, Vue, JS, or TS file
2. **See Real-time Diagnostics** - Squiggly underlines appear (🔴 error, 🟡 warning, 🔵 info)
3. **Check Problems Panel** - View → Problems or press `Ctrl+Shift+M`
4. **Fix Issues** - Hover over underlines for descriptions and recommendations
5. **Run Site Audit** - Press `Ctrl+Shift+P` → type "**SEO Lint: Run Site Audit**"

---

## 📖 How to Use

### 🔄 Automatic Analysis (Zero Config)

SEO Lint works automatically once installed - no configuration needed!

| Trigger | What Happens | When |
|---------|--------------|------|
| 📂 **Open file** | Analysis starts immediately | Supported file types only |
| ⌨️ **Type & edit** | Real-time feedback as you code | Every keystroke |
| 💾 **Save file** | Re-analysis ensures accuracy | On file save |
| 👁️ **View problems** | Problems panel updates | Continuous |

**Supported files:** `.html`, `.htm`, `.jsx`, `.tsx`, `.vue`, `.js`, `.ts`

### 🎮 Manual Commands

#### 🔍 Analyze Current Page

Manually trigger analysis for the active file:

```
Ctrl+Shift+P → "SEO Lint: Analyze Current Page" → Enter
```

**Use when:**
- You want to force a re-analysis
- File wasn't automatically detected
- Need to refresh diagnostics

#### 🌐 Run Site Audit

Analyze all files in your workspace:

```
Ctrl+Shift+P → "SEO Lint: Run Site Audit" → Enter
```

**Features:**
- 📊 Scans up to 100 files
- 📈 Progress notification
- 🎯 Finds all SEO issues site-wide
- 📋 Results in Problems panel

**Perfect for:**
- Pre-deployment checks
- Weekly SEO audits
- New project setup

#### 📊 Show SEO Report

View a comprehensive HTML report:

```
Ctrl+Shift+P → "SEO Lint: Show SEO Report" → Enter
```

**Report includes:**
- 📈 Total issues count
- 🔴🟡🔵 Issues by severity
- 📑 Issues by category
- 📍 File locations

### 🤖 robots.txt Management

#### Validate robots.txt

Check your robots.txt for errors:

```
Ctrl+Shift+P → "SEO Lint: Validate robots.txt" → Enter
```

**Checks:**
- ✅ Syntax validation
- ✅ User-agent directives
- ✅ Disallow/Allow rules
- ✅ Sitemap URLs
- ✅ Crawl-delay settings

**Example robots.txt:**
```txt
User-agent: *
Disallow: /admin/
Disallow: /private/
Allow: /public/

Sitemap: https://yoursite.com/sitemap.xml
```

### 🗺️ Sitemap Management

#### Generate sitemap.xml

Automatically create a sitemap from your HTML files:

```
Ctrl+Shift+P → "SEO Lint: Generate sitemap.xml" → Enter
```

**Steps:**
1. Command palette opens
2. Enter your base URL (e.g., `https://yoursite.com`)
3. Extension scans workspace for HTML files
4. Creates `sitemap.xml` in workspace root
5. Opens the generated file

**Smart Features:**
- 🔍 Finds all `.html` and `.htm` files
- 🔗 Converts file paths to URLs
- 📅 Adds lastmod from file timestamps
- ✂️ Removes `index.html` and `.html` extensions
- ✅ Standards-compliant XML output

#### Validate sitemap.xml

Check your sitemap for errors:

```
Ctrl+Shift+P → "SEO Lint: Validate sitemap.xml" → Enter
```

**15+ Validation Checks:**
- XML structure and namespace
- Absolute URL requirements
- changefreq values
- priority range (0.0-1.0)
- lastmod date format
- 50,000 URL limit
- 50MB file size limit

---

## 🎮 Commands Reference

Access all commands via Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`):

<div align="center">

| Command | Description | Use Case |
|---------|-------------|----------|
| 🔍 **Analyze Current Page** | Analyze the currently open file | Quick single-file check |
| 🌐 **Run Site Audit** | Scan all HTML/JSX/Vue files in workspace | Pre-deployment audit |
| 📊 **Show SEO Report** | Display comprehensive SEO report | Review all issues |
| 🤖 **Validate robots.txt** | Validate robots.txt syntax and rules | Check crawler config |
| 🗺️ **Generate sitemap.xml** | Generate sitemap from HTML files | Create sitemap automatically |
| ✅ **Validate sitemap.xml** | Validate sitemap.xml structure | Check sitemap quality |

</div>

**💡 Pro Tips:**
- Right-click in any supported file to access commands from context menu
- Use keyboard shortcuts for faster workflow
- Commands are context-aware and only show when relevant

---

## ⚙️ Configuration

### 🔧 Access Settings

**Quick Access:**
```
Ctrl+, → Search "SEO Lint"
```

**Or:**
1. File → Preferences → Settings
2. Search for "**SEO Lint**"
3. Customize your preferences

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

<div align="center">

### 🎯 **85+ Comprehensive SEO Checks Across 10 Categories**

</div>

<details open>
<summary><h3>📝 Meta Tags (12 checks)</h3></summary>

| Check | Requirement | Severity |
|-------|-------------|----------|
| ✅ Title tag presence | Required | 🔴 Error |
| ✅ Title length | 50-60 characters optimal | 🟡 Warning |
| ✅ Meta description presence | Required | 🔴 Error |
| ✅ Meta description length | 150-160 characters | 🟡 Warning |
| ✅ Open Graph title | og:title required | 🔵 Info |
| ✅ Open Graph description | og:description required | 🔵 Info |
| ✅ Open Graph image | og:image required | 🔵 Info |
| ✅ Open Graph URL | og:url required | 🔵 Info |
| ✅ Twitter Card type | twitter:card required | 🔵 Info |
| ✅ Twitter title | twitter:title required | 🔵 Info |
| ✅ Twitter description | twitter:description required | 🔵 Info |
| ✅ Twitter image | twitter:image required | 🔵 Info |
| ✅ Viewport meta tag | Mobile responsiveness | 🟡 Warning |
| ✅ Charset declaration | UTF-8 encoding | 🟡 Warning |
| ✅ Canonical URL | Duplicate content prevention | 🔵 Info |

</details>

<details>
<summary><h3>📑 Headings (6 checks)</h3></summary>

| Check | Requirement | Severity |
|-------|-------------|----------|
| ✅ H1 presence | Exactly one per page | 🔴 Error |
| ✅ Multiple H1 detection | Only one H1 allowed | 🟡 Warning |
| ✅ Heading hierarchy | No skipped levels (H1→H2→H3) | 🟡 Warning |
| ✅ Empty headings | No empty heading tags | 🔴 Error |
| ✅ Short headings | Minimum 3 characters | 🟡 Warning |
| ✅ Keyword in headings | Primary keyword usage | 🔵 Info |

</details>

<details>
<summary><h3>📊 Content Quality (8 checks)</h3></summary>

| Check | Requirement | Severity |
|-------|-------------|----------|
| ✅ Minimum word count | 300+ words (configurable) | 🔵 Info |
| ✅ Flesch Reading Ease | 0-100 scale readability | 🟡 Warning |
| ✅ Average sentence length | < 25 words per sentence | 🔵 Info |
| ✅ Paragraph length | < 150 words per paragraph | 🔵 Info |
| ✅ Duplicate content | Cross-file detection | 🟡 Warning |

</details>

<details>
<summary><h3>🔑 Keywords (5 checks)</h3></summary>

| Check | Requirement | Severity |
|-------|-------------|----------|
| ✅ Keyword density | 2-3% optimal range | 🟡 Warning |
| ✅ Keyword stuffing | Max 3% (configurable) | 🟡 Warning |
| ✅ Keyword in title | Primary keyword present | 🔵 Info |
| ✅ Keyword in meta description | Primary keyword present | 🔵 Info |
| ✅ Keyword in H1 | Primary keyword present | 🔵 Info |

</details>

<details>
<summary><h3>🖼️ Images (8 checks)</h3></summary>

| Check | Requirement | Severity |
|-------|-------------|----------|
| ✅ Alt text presence | Required for all images | 🔴 Error |
| ✅ Alt text length | 5-125 characters | 🟡 Warning |
| ✅ Generic alt text | Avoid "image", "photo", etc. | 🟡 Warning |
| ✅ Empty alt text | No empty alt attributes | 🔴 Error |
| ✅ Loading attribute | Use lazy loading | 🔵 Info |
| ✅ Width attribute | Core Web Vitals (CLS) | 🔵 Info |
| ✅ Height attribute | Core Web Vitals (CLS) | 🔵 Info |
| ✅ Title attribute | Image titles optional | 🔵 Info |

</details>

<details>
<summary><h3>🔗 URLs & Links (10 checks)</h3></summary>

| Check | Requirement | Severity |
|-------|-------------|----------|
| ✅ SEO-friendly URLs | Lowercase, hyphens | 🟡 Warning |
| ✅ URL length | < 75 characters | 🟡 Warning |
| ✅ Path segments | < 4 segments recommended | 🔵 Info |
| ✅ Underscore in URLs | Use hyphens instead | 🟡 Warning |
| ✅ Internal links | Detect internal links | 🔵 Info |
| ✅ External links security | rel="noopener noreferrer" | 🟡 Warning |
| ✅ Anchor text quality | Descriptive anchor text | 🟡 Warning |
| ✅ Generic link text | Avoid "click here", etc. | 🟡 Warning |
| ✅ Empty link text | No empty anchor tags | 🔴 Error |
| ✅ Internal linking opportunities | Suggest related links | 🔵 Info |

</details>

<details>
<summary><h3>🏗️ Schema.org (8 checks)</h3></summary>

| Check | Requirement | Severity |
|-------|-------------|----------|
| ✅ JSON-LD presence | Structured data exists | 🔵 Info |
| ✅ Valid JSON syntax | Proper JSON formatting | 🔴 Error |
| ✅ @context required | https://schema.org | 🔴 Error |
| ✅ @type required | Schema type specified | 🔴 Error |
| ✅ Article schema | Required properties | 🟡 Warning |
| ✅ Product schema | Required properties | 🟡 Warning |
| ✅ Organization schema | Required properties | 🟡 Warning |
| ✅ WebSite schema | Required properties | 🔵 Info |

</details>

<details>
<summary><h3>🤖 robots.txt (10 checks)</h3></summary>

| Check | Requirement | Severity |
|-------|-------------|----------|
| ✅ Syntax validation | Proper format | 🔴 Error |
| ✅ User-agent directive | Valid user-agents | 🟡 Warning |
| ✅ Disallow rules | Proper path format | 🟡 Warning |
| ✅ Allow rules | Proper path format | 🟡 Warning |
| ✅ Sitemap URL | Absolute URL required | 🔴 Error |
| ✅ Crawl-delay | Reasonable values | 🔵 Info |
| ✅ Unknown directives | Unsupported directives | 🟡 Warning |
| ✅ Critical blocking | Disallow: / detection | 🔴 Error |

</details>

<details>
<summary><h3>🗺️ Sitemap.xml (15 checks)</h3></summary>

| Check | Requirement | Severity |
|-------|-------------|----------|
| ✅ XML declaration | Proper XML header | 🔴 Error |
| ✅ xmlns namespace | Required namespace | 🔴 Error |
| ✅ Absolute URLs | http:// or https:// | 🔴 Error |
| ✅ URL length | < 2048 characters | 🟡 Warning |
| ✅ changefreq values | Valid values only | 🟡 Warning |
| ✅ priority range | 0.0 to 1.0 | 🟡 Warning |
| ✅ lastmod format | W3C/ISO 8601 format | 🟡 Warning |
| ✅ URL limit | Max 50,000 URLs | 🔴 Error |
| ✅ File size | Max 50MB | 🔴 Error |
| ✅ Empty sitemap | At least one URL | 🟡 Warning |

</details>

<div align="center">

### 📊 **Total: 85+ SEO Checks**

**Severity Levels:**
- 🔴 **Error** - Critical issues that must be fixed
- 🟡 **Warning** - Important recommendations
- 🔵 **Info** - Best practices and suggestions

</div>
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

**Need Help?** We're here for you!

<div align="center">

[![GitHub Issues](https://img.shields.io/github/issues/vector-sh/SEO-Lint)](https://github.com/vector-sh/SEO-Lint/issues)
[![GitHub Discussions](https://img.shields.io/github/discussions/vector-sh/SEO-Lint)](https://github.com/vector-sh/SEO-Lint/discussions)

</div>

### 📝 Report a Bug

1. **Search first:** Check [existing issues](https://github.com/vector-sh/SEO-Lint/issues)
2. **Create issue:** Provide details, steps to reproduce, expected behavior
3. **Include:** VSCode version, OS, extension version, sample code

### 💡 Request a Feature

1. **Check roadmap:** See planned features in [FEATURES.md](./FEATURES.md)
2. **Create discussion:** Share your idea in [Discussions](https://github.com/vector-sh/SEO-Lint/discussions)
3. **Vote:** Upvote existing feature requests

### 🆘 Get Help

- 📖 **Documentation:** Read [QUICKSTART.md](./QUICKSTART.md) and [FAQ](#-faqs)
- 💬 **Community:** Join [Discussions](https://github.com/vector-sh/SEO-Lint/discussions)
- 🐛 **Bug?** Create an [issue](https://github.com/vector-sh/SEO-Lint/issues)

---

## 🤝 Contributing

**We ❤️ contributions!** Join our growing community of contributors.

<div align="center">

[![Contributors](https://img.shields.io/github/contributors/vector-sh/SEO-Lint)](https://github.com/vector-sh/SEO-Lint/graphs/contributors)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/vector-sh/SEO-Lint/pulls)

</div>

### How to Contribute

1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. ✨ **Make** your changes
4. ✅ **Test** your changes
5. 📝 **Commit** (`git commit -m 'Add amazing feature'`)
6. 🚀 **Push** (`git push origin feature/amazing-feature`)
7. 🎉 **Submit** a pull request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines, coding standards, and best practices.

**Good First Issues:** Look for issues labeled `good first issue` to get started!

---

## 📄 License

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

**Free to use, modify, and distribute** - even for commercial projects!

</div>

---

## 🙏 Acknowledgments

<div align="center">

**Built with ❤️ by developers, for developers**

Made possible by these awesome technologies:

[![VSCode](https://img.shields.io/badge/VSCode-Extension-blue?logo=visual-studio-code)](https://code.visualstudio.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green?logo=node.js)](https://nodejs.org/)

</div>

**Special Thanks:**
- 🎨 VSCode Extension API team
- 📚 SEO community for best practices
- 🌟 All contributors and users
- 💡 Feature request providers
- 🐛 Bug reporters and testers

---

<div align="center">

## 🌟 Star Us on GitHub!

**If SEO Lint helps your workflow, give us a star ⭐**

[![GitHub stars](https://img.shields.io/github/stars/vector-sh/SEO-Lint?style=social)](https://github.com/vector-sh/SEO-Lint/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/vector-sh/SEO-Lint?style=social)](https://github.com/vector-sh/SEO-Lint/network/members)
[![GitHub watchers](https://img.shields.io/github/watchers/vector-sh/SEO-Lint?style=social)](https://github.com/vector-sh/SEO-Lint/watchers)

---

### 📣 Spread the Word

**Help others discover SEO Lint:**

- ⭐ Star this repository
- 🐦 Share on Twitter
- 📝 Write a blog post
- 💬 Tell your colleagues
- 📺 Create a tutorial

---

**Author:** Vector ([vector-sh](https://github.com/vector-sh))  
**Repository:** [github.com/vector-sh/SEO-Lint](https://github.com/vector-sh/SEO-Lint)  
**Version:** 1.2.0  
**License:** MIT  

---

### 🔗 Quick Links

[📖 Documentation](./README.md) • [🚀 Quick Start](./QUICKSTART.md) • [🐛 Report Bug](https://github.com/vector-sh/SEO-Lint/issues) • [💡 Request Feature](https://github.com/vector-sh/SEO-Lint/discussions) • [🤝 Contributing](./CONTRIBUTING.md)

---

<h3>Happy SEO Optimizing! 🚀</h3>

**May your search rankings be ever in your favor!** 📈✨

</div>
