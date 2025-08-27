# Code Style and Conventions

## Naming Conventions
- **Components**: PascalCase (e.g., `HeroSection.tsx`)
- **Files**: kebab-case for configs, PascalCase for components
- **Functions**: camelCase (e.g., `handleSubmit`)
- **Constants**: UPPER_SNAKE_CASE for env vars, camelCase for others
- **CSS Classes**: Tailwind utility classes, kebab-case for custom

## TypeScript Usage
- Strict mode enabled
- Interfaces preferred over types for objects
- Explicit return types for functions
- Props interfaces defined for all components
- No `any` types (should be replaced with proper types)

## React Patterns
- Functional components with hooks
- TypeScript FC type for components
- Custom hooks in `src/hooks/`
- Context API for global state (Language)
- Lazy loading for performance-heavy components

## File Organization
- One component per file
- Related components in same directory
- Barrel exports avoided
- Direct imports preferred

## Import Order
1. React and Next.js imports
2. Third-party libraries
3. Internal components
4. Utils and helpers
5. Types and interfaces
6. Styles

## Comments
- Serbian and English mixed (should be standardized)
- JSDoc for complex functions
- Inline comments for complex logic