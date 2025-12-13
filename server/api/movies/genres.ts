import type { GenresResponse } from '~~/server/types/api';
import { fetchFromTmdb, handleApiError } from '~~/server/utils/tmdbApi';

export default defineEventHandler(async () => {
    try {
        return await fetchFromTmdb<GenresResponse>('genre/movie/list');
    }
    catch (error) {
        handleApiError(error, 'Error fetching movie genres');
    }
});
