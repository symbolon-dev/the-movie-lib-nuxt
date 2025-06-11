import { fetchFromTmdb, getPageFromQuery, handleApiError, type MovieResponse } from '~/server/utils/tmdb';

export type MovieListType = 'now_playing' | 'popular' | 'top_rated' | 'upcoming';

export const errorMessages: Record<MovieListType, string> = {
    now_playing: 'Error fetching now playing movies',
    popular: 'Error fetching popular movies',
    top_rated: 'Error fetching top rated movies',
    upcoming: 'Error fetching upcoming movies',
};

export default defineEventHandler(async (event) => {
    try {
        const listType = event.context.params?.listType as MovieListType;
        
        if (!listType || !['now_playing', 'popular', 'top_rated', 'upcoming'].includes(listType)) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Invalid movie list type',
            });
        }
        
        const page = getPageFromQuery(event);
        const data = await fetchFromTmdb<MovieResponse>(`movie/${listType}`, { page });

        data.page = page;
        
        return data;
    } catch (error) {
        const listType = event.context.params?.listType as MovieListType;
        return handleApiError(error, errorMessages[listType] ?? 'Error fetching movies');
    }
});
