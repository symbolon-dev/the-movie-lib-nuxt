import type { Movie } from '~/types/movie';
import { MovieIdSchema } from '~~/server/utils/schemas';
import { fetchFromTmdb, handleApiError } from '~~/server/utils/tmdbApi';

export default defineEventHandler(async (event) => {
    try {
        const movieId = MovieIdSchema.parse(event.context?.params?.id);

        return await fetchFromTmdb<Movie>(`movie/${movieId}`);
    }
    catch (error) {
        handleApiError(error, 'Error fetching movie details');
    }
});
