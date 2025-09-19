import { z } from 'zod';

// Constants
const MAX_PAGE_LIMIT = 1000;

// Common schemas
export const PageSchema = z.coerce.number().min(1).max(MAX_PAGE_LIMIT).default(1);

// Movie list types
export const MovieListTypeSchema = z.enum(['now_playing', 'popular', 'top_rated', 'upcoming']);

// Movie ID validation
export const MovieIdSchema = z.string().min(1, 'Movie ID is required').regex(/^\d+$/, 'Movie ID must be numeric');

// Search schemas
export const SearchQuerySchema = z.object({
    query: z.string().min(1, 'Query parameter is required'),
    page: PageSchema.optional(),
});

// Discover schemas
export const DiscoverQuerySchema = z.object({
    sort_by: z.string().optional(),
    with_genres: z.union([
        z.string(),
        z.array(z.string()),
    ]).optional(),
    page: PageSchema.optional(),
});

// Helper to transform genres array to string
export const normalizeGenres = (genres: string | string[] | undefined): string | undefined => {
    if (!genres) return undefined;
    return Array.isArray(genres) ? genres.join(',') : genres;
};

// Error handler for Zod validation
export const handleValidationError = (error: z.ZodError, context: string = 'Validation') => {
    const message = error.issues.map((issue: z.ZodIssue) => `${issue.path.join('.')}: ${issue.message}`).join(', ');
    throw createError({
        statusCode: 400,
        statusMessage: `${context} failed: ${message}`,
    });
};
