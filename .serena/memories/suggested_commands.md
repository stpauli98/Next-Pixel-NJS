# Suggested Commands for NextPixel Development

## Development
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
npm run analyze     # Analyze bundle size
npm run siteMap     # Generate sitemap
```

## Testing & Quality Checks
```bash
npm run lint                     # Check for linting errors
npm run build                     # Type checking during build
npx tsc --noEmit                  # TypeScript type checking
```

## Git Commands
```bash
git status                        # Check current status
git add -A                        # Stage all changes
git commit -m "message"           # Commit changes
git push origin main              # Push to remote
```

## System Utilities (macOS)
```bash
ls -la                            # List files with details
grep -r "pattern" .               # Search in files
find . -name "*.tsx"              # Find files by extension
code .                            # Open in VS Code
```

## Environment Setup
Create `.env.local` file with:
```
RESEND_API_KEY=your_resend_api_key
RECIPIENT_EMAIL=your_email@example.com
```