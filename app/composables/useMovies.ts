import type { GenresResponse, MovieResponse } from '#shared/types/api';
import type { Movie, MovieListType } from '~/types/movie';

export const useMovies = () => {
    const listType = ref<MovieListType>('now_playing');
    const page = ref(1);
    const allMovies = ref<Movie[]>([]);
    const isLoading = ref(false);
    const error = ref<Error>();
    const totalPages = ref(1);
    const isResetting = ref(false);

    const previousListType = ref(listType.value);

    const fetchMovies = async () => {
        if (isLoading.value) {
            return;
        }

        isLoading.value = true;
        error.value = undefined;

        try {
            const url = `/api/movies/${listType.value}?page=${page.value}`;
            const data: MovieResponse = await $fetch(url);

            allMovies.value
                = page.value === 1
                    ? data.results
                    : [
                            ...allMovies.value,
                            ...data.results.filter(
                                (movie: Movie) =>
                                    !allMovies.value.some(existing => existing.id === movie.id),
                            ),
                        ];

            totalPages.value = data.total_pages;
        }
        catch (err) {
            error.value = err as Error;
        }
        finally {
            isLoading.value = false;
        }
    };

    const loadMore = () => {
        if (!isLoading.value && page.value < totalPages.value) {
            page.value++;
        }
    };

    const setListType = (value: MovieListType) => {
        listType.value = value;
    };

    watch(listType, async (newType) => {
        if (newType === previousListType.value) {
            return;
        }

        isResetting.value = true;

        page.value = 1;
        allMovies.value = [];
        previousListType.value = newType;

        await nextTick();

        isResetting.value = false;
        await fetchMovies();
    });

    watch(page, async () => {
        if (isResetting.value) {
            return;
        }
        await fetchMovies();
    });

    onMounted(async () => {
        await fetchMovies();
    });

    return {
        allMovies: computed(() => allMovies.value),
        pending: computed(() => isLoading.value),
        error: computed(() => error.value),
        refresh: fetchMovies,
        listType,
        page,
        hasMore: computed(() => page.value < totalPages.value),
        isLoadingMore: computed(() => isLoading.value && page.value > 1),
        setListType,
        loadMore,
    };
};

export const useMovieDetails = (initialId?: string) => {
    const movieId = ref(initialId ?? '');

    const { data, pending, error, refresh } = useFetch<Movie>(
        () => `/api/movies/details/${movieId.value}`,
        {
            key: () => `movie-${movieId.value}`,
            immediate: Boolean(initialId),
        },
    );

    const setMovieId = (id: string) => {
        movieId.value = id;
    };

    return {
        data,
        pending,
        error,
        refresh,
        movieId,
        setMovieId,
    };
};

export const useGenres = () => {
    const { data, pending, error, refresh } = useFetch<GenresResponse>(
        '/api/movies/genres',
        {
            key: 'genres',
            getCachedData: (key: string) =>
                useNuxtData<GenresResponse>(key).data.value,
            default: () => ({ genres: [] }),
        },
    );

    return {
        data,
        pending,
        error,
        refresh,
    };
};
