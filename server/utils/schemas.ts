import { z } from 'zod';

const MAX_PAGE_LIMIT = 1000;

export const PageSchema = z.coerce.number().min(1).max(MAX_PAGE_LIMIT).default(1);

export const MovieListTypeSchema = z.enum(['now_playing', 'popular', 'top_rated', 'upcoming']);

export const MovieIdSchema = z.string().min(1, 'Movie ID is required').regex(/^\d+$/, 'Movie ID must be numeric');

export const SearchQuerySchema = z.object({
    query: z.string().min(1, 'Query parameter is required'),
    page: PageSchema.optional(),
});

export const DiscoverQuerySchema = z.object({
    sort_by: z.string().optional(),
    with_genres: z.union([
        z.string(),
        z.array(z.string()),
    ]).optional(),
    page: PageSchema.optional(),
});

export const normalizeGenres = (genres: string | string[] | undefined): string | undefined => {
    if (!genres) return undefined;
    return Array.isArray(genres) ? genres.join(',') : genres;
};
