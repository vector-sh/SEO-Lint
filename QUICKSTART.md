# Quick Start Guide

Get started with SEO Lint in 5 minutes!

## Installation

1. Open VSCode
2. Press `Ctrl+Shift+X` (Extensions)
3. Search for "SEO Lint"
4. Click "Install"

## First Use

1. Open any HTML, JSX, TSX, or Vue file
2. SEO Lint automatically analyzes your file
3. Check the "Problems" panel (View > Problems or `Ctrl+Shift+M`)
4. See inline squiggly lines for SEO issues

## Common Issues & Fixes

### ❌ Missing Title Tag
**Problem**: No `<title>` tag found  
**Fix**: Add `<title>Your Page Title Here</title>` in `<head>`

### ⚠️ Title Too Short
**Problem**: Title is less than 30 characters  
**Fix**: Expand your title to 50-60 characters for better SEO

### ❌ Missing Meta Description
**Problem**: No meta description tag  
**Fix**: Add `<meta name="description" content="Your description here">`

### ❌ Missing H1
**Problem**: No H1 heading found  
**Fix**: Add one `<h1>Main Page Heading</h1>` per page

### ❌ Image Without Alt Text
**Problem**: `<img>` tag missing alt attribute  
**Fix**: Add `alt="descriptive text"` to all images

### ⚠️ Low Word Count
**Problem**: Page has less than 300 words  
**Fix**: Add more content (aim for 300+ words)

### ⚠️ Keyword Stuffing
**Problem**: Keyword appears too frequently  
**Fix**: Reduce keyword usage to 2-3% of total words

### ℹ️ Missing Open Graph Tags
**Problem**: No social media meta tags  
**Fix**: Add Open Graph tags:
```html
<meta property="og:title" content="Your Title">
<meta property="og:description" content="Your Description">
<meta property="og:image" content="image-url.jpg">
<meta property="og:url" content="https://yoursite.com">
```

## Commands

### Analyze Current Page
- Press `Ctrl+Shift+P`
- Type "SEO Lint: Analyze Current Page"
- Press Enter

### Run Site Audit
- Press `Ctrl+Shift+P`
- Type "SEO Lint: Run Site Audit"
- Press Enter
- Wait for analysis to complete

### Show SEO Report
- Press `Ctrl+Shift+P`
- Type "SEO Lint: Show SEO Report"
- Press Enter
- View comprehensive report in new panel

## Configuration

Access settings: File > Preferences > Settings > Search "SEO Lint"

**Quick Settings:**
- `seoLint.enabled`: Turn extension on/off
- `seoLint.minWordCount`: Set minimum word count (default: 300)
- `seoLint.maxKeywordDensity`: Set max keyword density % (default: 3)

## Tips for Best Results

### ✅ Do's
- Write unique, descriptive title tags
- Keep titles between 50-60 characters
- Write meta descriptions of 150-160 characters
- Use exactly one H1 tag per page
- Maintain proper heading hierarchy (H1 → H2 → H3)
- Add descriptive alt text to all images
- Aim for 300+ words of quality content
- Include structured data (JSON-LD)
- Add Open Graph tags for social sharing

### ❌ Don'ts
- Don't use multiple H1 tags
- Don't skip heading levels (H1 → H3)
- Don't use generic alt text ("image", "photo")
- Don't stuff keywords (keep under 3% density)
- Don't leave images without alt text
- Don't write titles over 60 characters
- Don't forget viewport meta tag

## Example: Perfect HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Best Coffee Makers 2024 - Expert Reviews</title>
    <meta name="description" content="Discover the best coffee makers of 2024. Expert reviews, comparisons, and buying tips to help you find the perfect coffee machine.">
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
        "author": {"@type": "Person", "name": "John Doe"},
        "datePublished": "2024-01-15",
        "image": "https://example.com/coffee-makers.jpg"
    }
    </script>
</head>
<body>
    <h1>Best Coffee Makers of 2024</h1>
    
    <p>
        Finding the perfect coffee maker can transform your morning routine. 
        In this comprehensive guide, we'll explore the top coffee makers 
        available in 2024...
    </p>

    <h2>Our Top Picks</h2>
    
    <img 
        src="coffee-maker.jpg" 
        alt="Modern stainless steel coffee maker brewing fresh coffee" 
        width="800" 
        height="600"
        loading="lazy"
    >
    
    <!-- More content here (300+ words total) -->
</body>
</html>
```

## Troubleshooting

### Extension Not Working?
1. Check that file is HTML/JSX/TSX/Vue
2. Verify `seoLint.enabled` is `true` in settings
3. Reload window: Press `Ctrl+Shift+P` → "Reload Window"

### No Diagnostics Showing?
1. Open the "Problems" panel: View > Problems
2. Look for inline squiggly underlines in code
3. Try running "SEO Lint: Analyze Current Page" command

### Too Many Warnings?
1. Adjust settings to reduce sensitivity
2. Increase `minWordCount` threshold
3. Increase `maxKeywordDensity` threshold
4. Disable specific checks in settings

## Learn More

- **Full Documentation**: See README.md
- **Testing Guide**: See TESTING.md
- **Implementation Details**: See IMPLEMENTATION.md
- **Report Issues**: https://github.com/vector-sh/SEO-Lint/issues

## Support

Need help? Check:
1. README.md for detailed documentation
2. TESTING.md for common test cases
3. GitHub Issues for known problems
4. Create new issue for bugs or feature requests

---

**Happy SEO Optimizing! 🚀**
