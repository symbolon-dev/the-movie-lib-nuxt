import { fetchFromTmdb, handleApiError, type MovieResponse } from '~/server/utils/tmdb';
import { SearchQuerySchema } from '~/server/utils/schemas';

export default defineEventHandler(async (event) => {
    try {
        const queryParams = getQuery(event);

        const { query, page = 1 } = SearchQuerySchema.parse(queryParams);

        const data = await fetchFromTmdb<MovieResponse>('search/movie', {
            query: encodeURIComponent(query),
            page,
        });

        data.page = page;

        return data;
    } catch (error) {
        return handleApiError(error, 'Error searching movies');
    }
});
