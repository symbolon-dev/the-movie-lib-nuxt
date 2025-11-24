import type { MovieListType } from '~/types/movie';
import type { MovieResponse } from '~~/server/types/api';
import { fetchFromTmdb, handleApiError } from '~~/server/utils/tmdbApi';
import { MovieListTypeSchema, PageSchema } from '~~/server/utils/schemas';

export const errorMessages: Record<MovieListType, string> = {
    now_playing: 'Error fetching now playing movies',
    popular: 'Error fetching popular movies',
    top_rated: 'Error fetching top rated movies',
    upcoming: 'Error fetching upcoming movies',
};

export default defineEventHandler(async (event) => {
    try {
        const listType = MovieListTypeSchema.parse(event.context.params?.listType);
        const page = PageSchema.parse(getQuery(event).page);

        const data: MovieResponse = await fetchFromTmdb(`movie/${listType}`, { page });
        data.page = page;

        return data;
    } catch (error) {
        const listType = event.context.params?.listType;
        const message = (listType && listType in errorMessages)
            ? errorMessages[listType as MovieListType]
            : 'Error fetching movies';
        handleApiError(error, message);
    }
});
