import { fetchFromTmdb, handleApiError } from '~/server/utils/tmdb';

export default defineEventHandler(async (event) => {
    try {
        const movieId = event.context?.params?.id;
        if (!movieId) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Movie ID is missing in the request parameters',
            });
        }

        const data = await fetchFromTmdb<Record<string, unknown>>(`movie/${movieId}`);
        return data;
    } catch (error) {
        return handleApiError(error, 'Error fetching movie details');
    }
});
