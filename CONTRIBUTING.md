# Contributing to SEO Lint

Thank you for your interest in contributing to SEO Lint! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- VSCode 1.80.0 or higher
- Git
- Basic knowledge of TypeScript and VSCode Extension API

### Finding Issues to Work On

1. Check the [Issues](https://github.com/vector-sh/SEO-Lint/issues) page
2. Look for issues labeled `good first issue` or `help wanted`
3. Comment on the issue to let others know you're working on it

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR-USERNAME/SEO-Lint.git
cd SEO-Lint
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Open in VSCode

```bash
code .
```

### 4. Compile the Extension

```bash
npm run compile
```

### 5. Run the Extension

1. Press `F5` to open Extension Development Host
2. A new VSCode window will open with the extension loaded
3. Test your changes in this window

## Making Changes

### Branch Naming

Create a descriptive branch name:

```bash
git checkout -b feature/your-feature-name
git checkout -b fix/issue-description
git checkout -b docs/documentation-update
```

### Project Structure

```
SEO-Lint/
├── src/
│   ├── analyzers/          # SEO analysis modules
│   │   ├── seoAnalyzer.ts       # Main analyzer coordinator
│   │   ├── metaTagAnalyzer.ts   # Meta tags
│   │   ├── headingAnalyzer.ts   # Headings
│   │   └── ...                  # Other analyzers
│   ├── extension.ts             # Extension entry point
│   └── diagnosticProvider.ts    # Diagnostic management
├── examples/                # Example test files
├── out/                     # Compiled JavaScript (git-ignored)
└── package.json             # Extension manifest
```

### Adding a New Analyzer

1. Create new file in `src/analyzers/yourAnalyzer.ts`:

```typescript
import * as vscode from 'vscode';

export class YourAnalyzer {
    async analyze(document: vscode.TextDocument, text: string): Promise<vscode.Diagnostic[]> {
        const diagnostics: vscode.Diagnostic[] = [];
        
        // Your analysis logic here
        
        return diagnostics;
    }
}
```

2. Import and integrate in `src/analyzers/seoAnalyzer.ts`:

```typescript
import { YourAnalyzer } from './yourAnalyzer';

export class SeoAnalyzer {
    private yourAnalyzer: YourAnalyzer;
    
    constructor() {
        this.yourAnalyzer = new YourAnalyzer();
    }
    
    async analyze(document: vscode.TextDocument): Promise<vscode.Diagnostic[]> {
        // Add your analyzer to the list
        diagnostics.push(...await this.yourAnalyzer.analyze(document, text));
    }
}
```

## Testing

### Manual Testing

1. Press `F5` to launch Extension Development Host
2. Open test files from `examples/` directory
3. Verify diagnostics appear correctly
4. Test all commands via Command Palette

### Automated Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Compilation

```bash
npm run compile
```

### All Checks

```bash
npm run lint && npm run compile
```

## Submitting Changes

### 1. Commit Your Changes

Follow conventional commit format:

```bash
git commit -m "feat: add new SEO check for X"
git commit -m "fix: resolve issue with Y analyzer"
git commit -m "docs: update README with Z instructions"
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 2. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 3. Create Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill out the PR template:
   - **Title**: Clear, descriptive title
   - **Description**: What changes were made and why
   - **Related Issues**: Reference any related issues (#123)
   - **Testing**: How you tested the changes
   - **Screenshots**: If applicable

### 4. PR Review Process

- Maintainers will review your PR
- Address any requested changes
- Once approved, your PR will be merged

## Coding Standards

### TypeScript Style

- Use TypeScript strict mode
- Provide type annotations for public APIs
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

```typescript
/**
 * Analyzes meta tags in the document
 * @param document The VSCode document to analyze
 * @param text The document text content
 * @returns Array of diagnostics found
 */
async analyze(document: vscode.TextDocument, text: string): Promise<vscode.Diagnostic[]> {
    // Implementation
}
```

### Code Organization

- One analyzer per file
- Keep functions focused and small
- Extract complex logic into helper functions
- Use consistent error handling

### Naming Conventions

- **Classes**: PascalCase (e.g., `MetaTagAnalyzer`)
- **Functions**: camelCase (e.g., `analyzeDocument`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_TITLE_LENGTH`)
- **Private members**: Prefix with underscore (e.g., `_helperMethod`)

### Diagnostic Messages

Write clear, actionable diagnostic messages:

```typescript
// ❌ Bad
"Title problem"

// ✅ Good
"Title tag is too short (15 characters). Optimal length is 50-60 characters for better SEO."
```

### Security

- Never use `eval()` or `Function()` constructor
- Avoid `innerHTML` - use text content or proper escaping
- Sanitize user input before processing
- Use iterative approaches for HTML parsing (not complex regex)

### Performance

- Avoid synchronous file operations
- Use caching where appropriate
- Debounce expensive operations
- Limit regex complexity

## Documentation

### Update Documentation

When making changes, update relevant documentation:

- **README.md** - User-facing features and usage
- **CHANGELOG.md** - Version history and changes
- **FEATURES.md** - Feature implementation status
- **Code comments** - Complex logic explanation

### Documentation Style

- Use clear, concise language
- Provide examples where helpful
- Include code snippets for technical docs
- Keep formatting consistent

## Release Process

Maintainers handle releases:

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create git tag
4. Publish to VSCode Marketplace
5. Create GitHub release with notes

## Questions?

- Open an issue for questions about contributing
- Tag with `question` label
- Maintainers will respond within 48 hours

## Thank You!

Your contributions make SEO Lint better for everyone. We appreciate your time and effort! 🙏
