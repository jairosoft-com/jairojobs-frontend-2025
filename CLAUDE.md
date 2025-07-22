# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Running the Application
```bash
npm run dev              # Start development server with Turbopack
npm run build           # Build for production
npm run start           # Start production server
```

### Code Quality
```bash
npm run lint            # Run ESLint
npm run type-check      # TypeScript type checking
npm run format          # Format code with Prettier
```

### Testing
```bash
npm test                # Run unit tests with Vitest
npm run test:e2e        # Run E2E tests with Playwright
npm run test:e2e:ui     # Run E2E tests with Playwright UI
```

### Git Workflow
```bash
npm run prepare         # Install Husky hooks
npx cz                  # Commit with Commitizen (conventional commits)
```

## Architecture Overview

This is a Next.js 15 application using the App Router with React 19. The codebase follows a modular architecture designed for AI-assisted development.

### Key Directories
- `/src/app/` - App Router pages and API routes
- `/src/components/` - React components, with `/ui/` for reusable primitives
- `/src/lib/` - Core libraries and services
- `/src/utils/` - Utility functions and helpers
- `/src/types/` - TypeScript type definitions
- `/tests/` - Test files (unit tests in `/unit/`, E2E in `/e2e/`)

### Important Patterns
1. **Server Components by Default**: All components are React Server Components unless explicitly marked with `"use client"`
2. **Path Aliases**: Use `@/` to import from the `src/` directory
3. **Styling**: Tailwind CSS with CSS variables for theming, use the `cn()` utility from `@/lib/utils` for class merging
4. **Component Library**: Set up for shadcn/ui components (configuration in `components.json`)

### Testing Strategy
- Unit tests use Vitest with React Testing Library
- E2E tests use Playwright with automatic dev server startup
- Test files should be placed in the `/tests/` directory, not colocated with source files

### Code Standards
- TypeScript strict mode is enabled - ensure all code is properly typed
- ESLint and Prettier are configured - code must pass linting before commits
- Conventional commits are enforced via Commitlint
- Pre-commit hooks run linting via Husky

### Environment Variables
Environment variables should be managed in `.env.local` (not committed to repository). No environment files are currently present, which is a security best practice.