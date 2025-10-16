import type { Movie, MovieListType } from '~/types/movie';
import type { MovieResponse, GenresResponse } from '~/server/types/api';

export const useMovies = () => {
    const listType = ref<MovieListType>('now_playing');
    const page = ref(1);
    const allMovies = ref<Movie[]>([]);
    const isLoading = ref(false);
    const error = ref<Error>();
    const totalPages = ref(1);

    const previousListType = ref(listType.value);

    const fetchMovies = async () => {
        if (isLoading.value) return;

        isLoading.value = true;
        error.value = undefined;

        try {
            const url = `/api/movies/${listType.value}?page=${page.value}`;
            const data = await $fetch<MovieResponse>(url);

            if (page.value === 1) {
                allMovies.value = data.results;
            } else {
                const newMovies = data.results.filter(
                    movie => !allMovies.value.some(existing => existing.id === movie.id),
                );
                allMovies.value = [...allMovies.value, ...newMovies];
            }

            totalPages.value = data.total_pages;
        } catch (err) {
            error.value = err as Error;
        } finally {
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
        page.value = 1;
        allMovies.value = [];
    };

    watch(listType, (newType) => {
        if (newType !== previousListType.value) {
            page.value = 1;
            allMovies.value = [];
            previousListType.value = newType;
        }
    });

    watch(page, () => {
        fetchMovies();
    });

    onMounted(() => {
        fetchMovies();
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
    const { data, pending, error, refresh } = useFetch<GenresResponse>('/api/movies/genres', {
        key: 'genres',
        getCachedData: (key: string) => useNuxtData(key).data.value,
        default: () => ({ genres: [] }),
    });

    return {
        data,
        pending,
        error,
        refresh,
    };
};
