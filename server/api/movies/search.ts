import { fetchFromTmdb, handleApiError, getPageFromQuery, type MovieResponse } from '~/server/utils/tmdb';

export default defineEventHandler(async (event) => {
    try {
        const { query } = getQuery(event);
        if (!query || typeof query !== 'string') {
            throw createError({
                statusCode: 400,
                statusMessage: 'Query parameter is missing or not a string',
            });
        }

        const page = getPageFromQuery(event);
        
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
