import type { Movie, MovieListType, MovieResponse, GenresResponse } from '~/types/movie';

const FETCH_TIMEOUT = 5000;

export const useMovies = () => {
    const listType = ref<MovieListType>('now_playing');
    const page = ref(1);
    const accumulatedMovies = ref<Movie[]>([]);
    const isLoadingMore = ref(false);

    const { data, pending, error, refresh } = useFetch<MovieResponse>(
        () => `/api/movies/${listType.value}`,
        {
            query: { page },
            key: () => `movies-${listType.value}-${page.value}`,
            watch: [listType, page],
        },
    );

    const totalPages = computed(() => data.value?.total_pages ?? 1);

    const accumulatedPages = ref(new Set<number>());

    watch([data, page], ([newData, currentPage]) => {
        if (!newData?.results) return;

        if (accumulatedPages.value.has(currentPage)) return;

        accumulatedMovies.value = [...accumulatedMovies.value, ...newData.results];
        accumulatedPages.value.add(currentPage);
    }, { immediate: true });

    const allMovies = computed(() => accumulatedMovies.value.length === 0 ? (data.value?.results ?? []) : accumulatedMovies.value);

    const hasMore = computed(() => page.value < totalPages.value);

    const setListType = (value: MovieListType) => {
        listType.value = value;
        page.value = 1;
        accumulatedMovies.value = [];
        accumulatedPages.value.clear();
    };

    const loadMore = async () => {
        if (!hasMore.value || isLoadingMore.value) return;

        isLoadingMore.value = true;
        try {
            page.value += 1;
            await until(pending).toBe(false, { timeout: FETCH_TIMEOUT });
        } catch (err) {
            page.value = Math.max(1, page.value - 1);
            throw err;
        } finally {
            isLoadingMore.value = false;
        }
    };

    return {
        allMovies,
        pending,
        error,
        refresh,
        listType,
        page,
        hasMore,
        isLoadingMore,
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
