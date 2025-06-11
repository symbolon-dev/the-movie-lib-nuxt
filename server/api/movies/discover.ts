import { fetchFromTmdb, handleApiError, type MovieResponse } from '~/server/utils/tmdb';

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        if (!query) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Query parameters are required',
            });
        }

        const params: Record<string, string | number> = {};
        
        if (query.sort_by) {
            params.sort_by = query.sort_by as string;
        }
        
        if (query.with_genres) {
            if (Array.isArray(query.with_genres)) {
                params.with_genres = (query.with_genres as string[]).join(',');
            } else {
                params.with_genres = query.with_genres as string;
            }
        }

        if (query.page) {
            const page = parseInt(query.page as string);
            if (page < 1 || page > 1000) {
                throw createError({
                    statusCode: 400,
                    statusMessage: 'Page number must be between 1 and 1000',
                });
            }
            params.page = page;
        } else {
            params.page = 1;
        }
        
        const data = await fetchFromTmdb<MovieResponse>('discover/movie', params);
        
        data.page = params.page as number;
        
        return data;
    } catch (error) {
        return handleApiError(error, 'Error discovering movies');
    }
});
