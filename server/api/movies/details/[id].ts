import type { Movie } from '~/types/movie';
import { fetchFromTmdb, handleApiError } from '~/server/utils/tmdb';
import { MovieIdSchema } from '~/server/utils/schemas';

export default defineEventHandler(async (event) => {
    try {
        const movieId = MovieIdSchema.parse(event.context?.params?.id);

        return await fetchFromTmdb<Movie>(`movie/${movieId}`);
    } catch (error) {
        handleApiError(error, 'Error fetching movie details');
    }
});
