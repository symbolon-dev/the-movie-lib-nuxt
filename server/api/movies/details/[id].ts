import { fetchFromTmdb, handleApiError } from '~/server/utils/tmdb';
import { MovieIdSchema } from '~/server/utils/schemas';

export default defineEventHandler(async (event) => {
    try {
        const movieId = MovieIdSchema.parse(event.context?.params?.id);

        const data = await fetchFromTmdb<Record<string, unknown>>(`movie/${movieId}`);
        return data;
    } catch (error) {
        return handleApiError(error, 'Error fetching movie details');
    }
});
