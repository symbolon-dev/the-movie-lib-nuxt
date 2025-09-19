# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The Movie Lib is a modern movie database web application built with Nuxt 3, showcasing TMDB (The Movie Database) integration. The application demonstrates server-side rendering, state management with Pinia, and responsive design with Tailwind CSS.

## Development Commands

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Linting
pnpm lint        # Check for linting errors
pnpm lint:fix    # Auto-fix linting errors

# Install dependencies
pnpm install
```

## Environment Setup

Required environment variable in `.env`:
```
NUXT_TMDB_API_KEY=your_tmdb_api_key
```

## Project Structure

```
├── components/           # Vue components organized by feature
│   ├── Movie/           # Movie-specific components
│   │   ├── Card.vue     # Movie card display
│   │   ├── List.vue     # Movie grid/list with infinite scroll
│   │   └── Skeleton.vue # Loading skeleton
│   ├── Filter/          # Search and filtering components
│   │   ├── Search.vue   # Search input
│   │   └── Genres.vue   # Genre filter dropdown
│   ├── Header.vue       # Main navigation
│   ├── Hero.vue         # Landing page hero section
│   └── Segment.vue      # Movie category segments
├── pages/               # Nuxt file-based routing
│   ├── index.vue        # Home page (/), shows movie segments
│   ├── discover.vue     # Advanced search page (/discover)
│   ├── movies/          # Movie detail pages
│   │   └── [id].vue     # Individual movie page (/movies/123)
│   └── styleguide.vue   # Development style guide
├── stores/              # Pinia state management
│   ├── movieStore.ts    # Movies, pagination, API calls
│   └── filterStore.ts   # Search, filters, sorting
├── server/              # Nuxt server-side API
│   ├── api/movies/      # TMDB API proxy endpoints
│   │   ├── [listType].ts    # Dynamic movie lists (now_playing, popular)
│   │   ├── search.ts        # Movie search
│   │   ├── discover.ts      # Advanced movie discovery
│   │   ├── genres.ts        # Genre metadata
│   │   └── details/[id].ts  # Movie details
│   └── utils/tmdb.ts    # TMDB API integration utilities
├── assets/              # Static assets, fonts, images
├── layouts/             # Nuxt layout templates
├── middleware/          # Route middleware
└── public/              # Public static files
```

## Architecture Overview

### State Management
- **movieStore.ts**: Central store for movie data, pagination, and API interactions
- **filterStore.ts**: Manages search, filtering, and sorting functionality
- Uses Pinia with TypeScript composition API pattern
- Persistent state with `pinia-plugin-persistedstate`

### API Layer
- **Server-side API routes** in `server/api/movies/`:
  - `[listType].ts`: Dynamic routes for movie lists (now_playing, popular, etc.)
  - `search.ts`: Movie search functionality
  - `discover.ts`: Advanced movie discovery with filters
  - `genres.ts`: Genre metadata
  - `details/[id].ts`: Individual movie details
- **TMDB utility** (`server/utils/tmdb.ts`): Centralized TMDB API integration with error handling

### Component Structure
- **Movie/**: Movie-specific components (Card, List, Skeleton)
- **Filter/**: Search and genre filtering components
- **Shared components**: Header, Hero, Segment, navigation helpers
- Components follow Vue 3 Composition API with TypeScript

### Routing
- **index.vue**: Home page with movie segments
- **discover.vue**: Advanced search and filtering
- **movies/[id].vue**: Movie detail pages
- **styleguide.vue**: Development style guide

### Code Style Rules

The project enforces strict ESLint rules:
- **Indentation**: 4 spaces (both JS/TS and Vue templates)
- **Quotes**: Single quotes preferred
- **Semicolons**: Required
- **Vue-specific**:
  - 3 max attributes per line (single line), 1 per line (multiline)
  - Object curly spacing enforced
  - Multi-word component names disabled
- **Modern JS patterns enforced**:
  - No traditional for loops (use iterable methods or for..of)
  - Prefer const, destructuring, template literals, arrow functions
  - No parameter reassignment

### Key Patterns

1. **Store Integration**: Components use `storeToRefs()` for reactive references and destructure actions from stores
2. **API Pagination**: Implements infinite scroll with `loadNextPage()` and proper loading states
3. **Route-based Behavior**: movieStore adapts behavior based on current route (home vs discover)
4. **Scroll Position Management**: Saves/restores scroll positions for better UX
5. **Search Optimization**: Multi-page search loading when genre filters are applied
6. **Error Handling**: Centralized error handling in TMDB utility functions

### Performance Optimizations
- Lazy loading for movie poster images
- Skeleton loading states
- Debounced search with minimum 2-character requirement
- Image optimization with Nuxt Image (WebP format)
- Prevents duplicate movie entries during pagination

## Testing

Currently no test framework is configured. When adding tests, check with the team for preferred testing approach.

## Development Notes

- German locale is default (`de-DE` for TMDB API, German language in meta)
- Uses NuxtHub for deployment configuration
- Tailwind CSS with custom configuration
- Embla Carousel for interactive components
- Day.js for date manipulation
- Package manager: pnpm (see packageManager field in package.json)
