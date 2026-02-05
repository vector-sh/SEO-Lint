# Testing Guide for SEO Lint

This guide explains how to test the SEO Lint extension during development.

## Prerequisites

- Node.js (v20+)
- VSCode (v1.80.0+)
- TypeScript 5.x

## Installation

```bash
npm install
npm run compile
```

## Running the Extension

### Method 1: Using VSCode Extension Development Host

1. Open the project in VSCode
2. Press `F5` or go to `Run > Start Debugging`
3. A new VSCode window (Extension Development Host) will open
4. Open any HTML, JSX, TSX, or Vue file
5. The extension will automatically analyze the file and show diagnostics

### Method 2: Manual Testing

1. Compile the extension:
   ```bash
   npm run compile
   ```

2. Package the extension:
   ```bash
   npx vsce package
   ```

3. Install the .vsix file in VSCode:
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Extensions: Install from VSIX"
   - Select the generated .vsix file

## Test Cases

### Test Case 1: Good SEO Example

Open `examples/good-example.html` and verify:
- ✅ No errors or warnings should appear (or minimal info suggestions)
- ✅ All meta tags are properly configured
- ✅ Heading hierarchy is correct
- ✅ Images have proper alt text
- ✅ Schema.org data is valid

### Test Case 2: Bad SEO Example

Open `examples/bad-example.html` and verify these diagnostics appear:

**Expected Errors:**
- Missing `<title>` tag or title too short
- Missing meta description
- Missing H1 heading
- Image without alt text

**Expected Warnings:**
- Multiple H1 tags
- Empty alt text
- Generic alt text
- Missing viewport meta tag
- Skipped heading hierarchy

**Expected Information:**
- Low word count
- Missing Open Graph tags
- Missing canonical URL
- Missing structured data

### Test Case 3: React/Next.js Example

Open `examples/react-example.tsx` and verify:
- ✅ Extension correctly parses JSX syntax
- ✅ Meta tags in `<Head>` component are recognized
- ✅ JSX image tags are analyzed
- ✅ JSON-LD structured data is validated

### Test Case 4: Site Audit

1. Open a workspace with multiple HTML/JSX files
2. Run command: "SEO Lint: Run Site Audit"
3. Verify:
   - Progress notification appears
   - All files are analyzed
   - Completion message shows file count
   - Problems panel shows all issues

### Test Case 5: SEO Report

1. Open files with various SEO issues
2. Run command: "SEO Lint: Show SEO Report"
3. Verify:
   - Webview panel opens
   - Report shows total issues count
   - Issues are categorized (Meta Tags, Headings, Content, etc.)
   - Severity levels are color-coded

### Test Case 6: Configuration

Test configuration options:

1. Open VSCode settings
2. Search for "SEO Lint"
3. Change settings:
   - Disable extension: `"seoLint.enabled": false`
   - Adjust word count: `"seoLint.minWordCount": 500`
   - Adjust keyword density: `"seoLint.maxKeywordDensity": 2`
4. Verify diagnostics update accordingly

### Test Case 7: Real-time Analysis

1. Open an HTML file
2. Type new content
3. Verify diagnostics update in real-time
4. Add/remove issues and verify updates

## Expected Diagnostics by Category

### Meta Tags
- Missing title tag (Error)
- Title too short/long (Warning)
- Missing meta description (Error)
- Description too short/long (Warning)
- Missing Open Graph tags (Information)
- Missing viewport (Warning)
- Missing charset (Warning)
- Missing canonical (Information)

### Headings
- Missing H1 (Error)
- Multiple H1 tags (Warning)
- Skipped heading hierarchy (Warning)
- Empty headings (Warning)
- Short headings (Information)

### Content Quality
- Low word count (Information)
- Long sentences (Information)
- Long paragraphs (Information)
- Duplicate content (Information)

### Keywords
- Keyword stuffing (Warning)
- Missing keyword in title (Information)
- Missing keyword in meta description (Information)
- Missing keyword in H1 (Information)

### Images
- Missing alt text (Error)
- Empty alt text (Warning)
- Short alt text (Information)
- Long alt text (Information)
- Generic alt text (Warning)
- Missing title attribute (Information)
- Missing lazy loading (Information)
- Missing dimensions (Information)

### Schema
- No structured data (Information)
- Invalid JSON-LD (Error)
- Missing @context (Warning)
- Missing @type (Warning)
- Missing required properties (Warning)

## Performance Testing

Test with large files:
1. Create an HTML file with 10,000+ lines
2. Open the file
3. Verify:
   - Extension loads without hanging
   - Diagnostics appear within reasonable time (< 5 seconds)
   - Editing is responsive

## Framework-Specific Testing

### React/JSX
- Test `.jsx` and `.tsx` files
- Verify JSX syntax is parsed correctly
- Test with React components returning JSX

### Next.js
- Test with `pages/` directory structure
- Test with `app/` directory (Next.js 13+)
- Verify `<Head>` component analysis

### Vue
- Test `.vue` files
- Test `<template>` section analysis
- Verify Vue-specific syntax

### Static HTML
- Test `.html` files
- Test with various HTML5 structures
- Test with legacy HTML

## Known Limitations

1. Does not analyze:
   - Server-side rendered content
   - Content loaded via JavaScript
   - Dynamic meta tags

2. May produce false positives for:
   - Template files with placeholders
   - Files with conditional content
   - Files with complex JavaScript

## Debugging

Enable extension logging:
1. Open VSCode Developer Tools: `Help > Toggle Developer Tools`
2. View console logs for debugging information
3. Look for "SEO Lint" messages

## Continuous Integration

For CI/CD pipelines:
```bash
npm install
npm run compile
npm run lint
```

All commands should exit with code 0 for successful builds.
