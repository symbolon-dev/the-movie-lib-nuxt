import type { MovieResponse } from '~~/server/types/api';
import { fetchFromTmdb, handleApiError } from '~~/server/utils/tmdbApi';
import { DiscoverQuerySchema, normalizeGenres } from '~~/server/utils/schemas';

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);

        const { sort_by, with_genres, page = 1 } = DiscoverQuerySchema.parse(query);

        const params: Record<string, string | number> = {
            page,
            ...(sort_by && { sort_by }),
            ...(with_genres && { with_genres: normalizeGenres(with_genres) }),
        };

        const data: MovieResponse = await fetchFromTmdb('discover/movie', params);
        data.page = page;

        return data;
    } catch (error) {
        handleApiError(error, 'Error discovering movies');
    }
});
