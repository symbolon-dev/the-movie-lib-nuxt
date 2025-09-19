import { fetchFromTmdb, handleApiError, type MovieResponse } from '~/server/utils/tmdb';
import { DiscoverQuerySchema, normalizeGenres } from '~/server/utils/schemas';

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);

        const { sort_by, with_genres, page = 1 } = DiscoverQuerySchema.parse(query);

        const params: Record<string, string | number> = {
            page,
            ...(sort_by && { sort_by }),
            ...(with_genres && { with_genres: normalizeGenres(with_genres) }),
        };

        const data = await fetchFromTmdb<MovieResponse>('discover/movie', params);
        data.page = page;

        return data;
    } catch (error) {
        return handleApiError(error, 'Error discovering movies');
    }
});
