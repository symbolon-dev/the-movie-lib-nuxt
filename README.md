# The Movie Lib

## Frontend Developer Coding Challenge

Develop a web application that displays a movie list with search, filter, and sort functionality. Users should be able to click on movies to view detailed information.

A modern movie database web application built with Nuxt.js and the TMDB API.

## Project Description

This web application was developed as a solution for the frontend developer coding challenge. The main requirements were:

- Display a list of movies with data from the TMDB API
- Implementation of search, filter, and sort functionality
- Creation of a detail view for individual movies
- Use of Nuxt.js and Tailwind CSS

## Features

- **Movie List:** Clear display of movies from various categories
- **Search:** Real-time search for movie titles
- **Filter:** Filtering by movie genres
- **Sorting:** Various sorting options (popularity, rating, release date)
- **Detail View:** Detailed information for each movie
- **Responsive Design:** Optimized display on all devices
- **Infinite Scrolling:** Automatic loading of more results as you scroll

## Implementation Notes

### Search + Genre Filtering

Due to TMDB API limitations, the `/search` endpoint doesn't support genre filtering. When combining search with genres, the app uses client-side filtering and automatically prefetches up to 5 additional pages to ensure at least 20 filtered results are displayed. This provides a smooth user experience while respecting API rate limits.

## Technologies

- **Framework:** Nuxt 4.1.3 (built on Vue.js)
- **Styling:** Tailwind CSS v3
- **API:** The Movie Database (TMDB)
- **Linting:** ESLint
- **Package Manager:** pnpm
- **TypeScript:** Full TypeScript support

## Architecture

The application is built following these principles:

- **Component-based Structure:** Modular components for optimal reusability
- **Server-side API Integration:** TMDB access via Nuxt Server API Routes
- **State Management:** Lightweight state via Nuxt composables
- **Responsive Design:** Mobile-first approach with Tailwind CSS
- **TMDB Pagination Constraints:** The TMDB API treats `discover` and `search` endpoints differently (e.g. precomputed vs. live results). The app keeps local pagination and filter state in sync to cope with these discrepancies and guard against out-of-range pages.

## Installation

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm/yarn

### Setup

1. Clone the project:

```bash
git clone https://github.com/your-username/the-movie-lib.git
cd the-movie-lib
```

2. Install dependencies:

```bash
# With pnpm (recommended)
pnpm install

# With npm
npm install

# With yarn
yarn install
```

### Environment Variables

Create a `.env` file in the root directory:

```
NUXT_TMDB_API_KEY=your_tmdb_v4_access_token
```

Use your TMDB **v4 API Read Access Token** (Bearer token) from [TMDB settings](https://www.themoviedb.org/settings/api) to authenticate requests.

## Development

Start the development server on `http://localhost:3000`:

```bash
# With pnpm (recommended)
pnpm dev

# With npm
npm run dev

# With yarn
yarn dev
```

## Build

Create a production-ready version:

```bash
# With pnpm
pnpm build

# With npm
npm run build

# With yarn
yarn build
```

Preview the production version:

```bash
# With pnpm
pnpm preview

# With npm
npm run preview

# With yarn
yarn preview
```

## Deployment

The application is prepared for deployment with NuxtHub:

### Local Deployment

After building, the application can be run locally:

```bash
# After build
pnpm preview
```

### NuxtHub Deployment

1. Create a [NuxtHub account](https://nuxthub.com/)
2. Install the NuxtHub CLI:

```bash
npm install -g @nuxthub/cli
```

3. Log in to NuxtHub:

```bash
nuxthub login
```

4. Run the deployment command:

```bash
nuxthub deploy
```

5. Configure environment variables in NuxtHub settings:
    - `NUXT_TMDB_API_KEY=your_tmdb_v4_access_token`
