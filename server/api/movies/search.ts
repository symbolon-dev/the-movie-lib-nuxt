import type { MovieResponse } from '~/server/types/api';
import { fetchFromTmdb, handleApiError } from '~/server/utils/tmdbApi';
import { SearchQuerySchema } from '~/server/utils/schemas';

export default defineEventHandler(async (event) => {
    try {
        const queryParams = getQuery(event);

        const { query, page = 1 } = SearchQuerySchema.parse(queryParams);

        const data: MovieResponse = await fetchFromTmdb('search/movie', {
            query,
            page,
        });

        data.page = page;

        return data;
    } catch (error) {
        handleApiError(error, 'Error searching movies');
    }
});
