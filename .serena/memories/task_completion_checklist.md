# Task Completion Checklist

## After Making Code Changes

### 1. Type Checking
```bash
npx tsc --noEmit
```

### 2. Linting
```bash
npm run lint
```

### 3. Build Verification
```bash
npm run build
```

### 4. Testing
- Manual testing in development server
- Check all language versions
- Test responsive design
- Verify form submissions

### 5. Performance Check
- Check bundle size if adding dependencies
- Run `npm run analyze` for significant changes
- Verify image optimization
- Check Core Web Vitals

### 6. SEO Verification
- Update sitemap if adding pages
- Check meta tags
- Verify structured data
- Test Open Graph images

### 7. Security Review
- No exposed API keys
- CSP headers intact
- Input validation working
- XSS protection active

### 8. Git Workflow
```bash
git add -A
git commit -m "feat/fix: descriptive message"
git push origin feature-branch
```

### 9. Documentation
- Update README if needed
- Document new environment variables
- Add comments for complex logic