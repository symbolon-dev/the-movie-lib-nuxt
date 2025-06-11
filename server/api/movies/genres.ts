import { fetchFromTmdb, handleApiError } from '~/server/utils/tmdb';

export default defineEventHandler(async () => {
    try {
        const data = await fetchFromTmdb<{ genres: unknown[] }>('genre/movie/list');
        return data;
    } catch (error) {
        return handleApiError(error, 'Error fetching movie genres');
    }
});
