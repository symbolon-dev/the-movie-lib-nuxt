import type { Movie, MovieResponse } from '~/types/movie';
import { MIN_SEARCH_LENGTH } from '~/types/movie';

const FETCH_TIMEOUT = 5000;
const SEARCH_PREFETCH_PAGES = 5;

export const useDiscoverMovies = () => {
    const { searchTerm, selectedGenres, selectedSort, getDiscoverParams } = useDiscoverFilters();

    const page = ref(1);
    const accumulatedMovies = ref<Movie[]>([]);
    const isLoadingMore = ref(false);
    const searchPrefetchedMovies = ref<Movie[]>([]);

    const normalizedSearch = computed(() => {
        const value = searchTerm.value.trim();
        return value.length >= MIN_SEARCH_LENGTH ? value : '';
    });

    const hasSearch = computed(() => normalizedSearch.value.length > 0);

    const filtersKey = computed(() => [
        hasSearch.value ? `search:${normalizedSearch.value}` : 'discover',
        `genres:${selectedGenres.value.join(',')}`,
        `sort:${selectedSort.value}`,
    ].join('|'));

    const fetchKey = computed(() => `${filtersKey.value}|page:${page.value}`);

    const buildUrl = (pageNum: number = page.value) => {
        if (hasSearch.value) {
            const params = new URLSearchParams({
                query: normalizedSearch.value,
                page: String(pageNum),
            });
            return `/api/movies/search?${params.toString()}`;
        }

        const params = getDiscoverParams();
        params.set('page', String(pageNum));
        return `/api/movies/discover?${params.toString()}`;
    };

    const { data, pending, error, refresh } = useFetch<MovieResponse>(
        () => buildUrl(),
        {
            key: () => fetchKey.value,
            watch: [fetchKey],
        },
    );

    const totalPages = computed(() => data.value?.total_pages ?? 1);

    const accumulatedPages = ref(new Set<number>());

    const prefetchSearchPages = async () => {
        if (!hasSearch.value) {
            searchPrefetchedMovies.value = [];
            return;
        }

        try {
            const pagesToFetch = Math.min(SEARCH_PREFETCH_PAGES, totalPages.value);
            const fetchPromises = Array.from({ length: pagesToFetch }, (_, i) =>
                $fetch<MovieResponse>(buildUrl(i + 1)),
            );

            const results = await Promise.all(fetchPromises);
            const allResults = results.flatMap(result => result?.results ?? []);

            searchPrefetchedMovies.value = allResults;
        } catch (err) {
            console.error('Error prefetching search pages:', err);
            searchPrefetchedMovies.value = [];
        }
    };

    watch([data, page], ([newData, currentPage]) => {
        if (!newData?.results) return;

        if (accumulatedPages.value.has(currentPage)) {
            return;
        }

        accumulatedMovies.value = [...accumulatedMovies.value, ...newData.results];
        accumulatedPages.value.add(currentPage);
    }, { immediate: true });

    watch([hasSearch, data], ([isSearching, currentData]) => {
        if (isSearching && currentData) {
            prefetchSearchPages();
        }
    }, { immediate: true });

    const allMovies = computed(() => {
        if (hasSearch.value && searchPrefetchedMovies.value.length > 0) {
            return searchPrefetchedMovies.value;
        }

        if (accumulatedMovies.value.length === 0) {
            return data.value?.results ?? [];
        }
        return accumulatedMovies.value;
    });

    const hasMore = computed(() => page.value < totalPages.value);
    const hasMoreResults = computed(() => !hasSearch.value && hasMore.value);

    const reset = () => {
        page.value = 1;
        accumulatedMovies.value = [];
        accumulatedPages.value.clear();
        isLoadingMore.value = false;
        searchPrefetchedMovies.value = [];
    };

    watch(filtersKey, (newKey, oldKey) => {
        if (oldKey !== undefined && newKey !== oldKey) {
            reset();
        }
    });

    const loadMore = async () => {
        if (hasSearch.value || !hasMore.value || isLoadingMore.value) return;

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
        hasSearch,
        hasMoreResults,
        isLoadingMore,
        loadMore,
        reset,
    };
};
