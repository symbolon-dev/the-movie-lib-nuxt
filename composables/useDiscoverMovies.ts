import type { Movie, MovieResponse } from '~/types/movie';
import { MIN_SEARCH_LENGTH } from '~/types/movie';

const MIN_MOVIES_THRESHOLD = 20;
const MAX_PREFETCH_PAGES = 5;

export const useDiscoverMovies = () => {
    const { searchTerm, selectedGenres, selectedSort, getDiscoverParams, filterMovies } = useDiscoverFilters();

    const page = ref(1);
    const allMovies = ref<Movie[]>([]);
    const isLoading = ref(false);
    const error = ref<Error>();
    const totalPages = ref(1);
    const lastFetchedPage = ref(0);

    const normalizedSearch = computed(() => {
        const value = searchTerm.value.trim();
        return value.length >= MIN_SEARCH_LENGTH ? value : '';
    });

    const hasSearch = computed(() => normalizedSearch.value.length > 0);

    const hasGenreFilter = computed(() => selectedGenres.value.length > 0);

    const needsPrefetch = computed(() => hasSearch.value && hasGenreFilter.value);

    const filtersKey = computed(() => [
        hasSearch.value ? `search:${normalizedSearch.value}` : 'discover',
        `genres:${selectedGenres.value.join(',')}`,
        `sort:${selectedSort.value}`,
    ].join('|'));

    const previousFilterKey = ref(filtersKey.value);

    const fetchSinglePage = async (pageNum: number): Promise<Movie[]> => {
        const url = hasSearch.value
            ? `/api/movies/search?query=${encodeURIComponent(normalizedSearch.value)}&page=${pageNum}`
            : `/api/movies/discover?${getDiscoverParams().toString()}&page=${pageNum}`;

        const data = await $fetch<MovieResponse>(url);
        totalPages.value = data.total_pages;
        return data.results;
    };

    const getFilteredCount = (movies: Movie[]): number => {
        if (!needsPrefetch.value) return movies.length;
        return filterMovies(movies).length;
    };

    const fetchMovies = async () => {
        if (isLoading.value) return;
        if (lastFetchedPage.value === page.value) return;

        isLoading.value = true;
        error.value = undefined;

        try {
            const results = await fetchSinglePage(page.value);

            if (page.value === 1) {
                allMovies.value = results;
            } else {
                const newMovies = results.filter(
                    movie => !allMovies.value.some(existing => existing.id === movie.id),
                );
                allMovies.value = [...allMovies.value, ...newMovies];
            }

            lastFetchedPage.value = page.value;

            // Prefetch more pages if needed (Search + Genre scenario)
            if (needsPrefetch.value) {
                let prefetchCount = 0;
                let currentPage = page.value;

                while (
                    getFilteredCount(allMovies.value) < MIN_MOVIES_THRESHOLD &&
                    currentPage < totalPages.value &&
                    prefetchCount < MAX_PREFETCH_PAGES
                ) {
                    currentPage++;
                    prefetchCount++;

                    const nextResults = await fetchSinglePage(currentPage);
                    const newMovies = nextResults.filter(
                        movie => !allMovies.value.some(existing => existing.id === movie.id),
                    );
                    allMovies.value = [...allMovies.value, ...newMovies];
                    lastFetchedPage.value = currentPage;
                    page.value = currentPage;
                }
            }
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

    const reset = () => {
        page.value = 1;
        allMovies.value = [];
        lastFetchedPage.value = 0;
    };

    watch(filtersKey, (newKey) => {
        if (newKey !== previousFilterKey.value) {
            reset();
            previousFilterKey.value = newKey;
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
        hasSearch,
        hasMore: computed(() => page.value < totalPages.value),
        isLoadingMore: computed(() => isLoading.value && page.value > 1),
        loadMore,
        reset,
    };
};
