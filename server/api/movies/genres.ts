import type { GenresResponse } from '~/types/movie';
import { fetchFromTmdb, handleApiError } from '~/server/utils/tmdb';

export default defineEventHandler(async () => {
    try {
        return await fetchFromTmdb<GenresResponse>('genre/movie/list');
    } catch (error) {
        handleApiError(error, 'Error fetching movie genres');
    }
});
