import type { Movie } from '~/types/movie';
import type { MovieResponse } from '~/server/types/api';
import { MIN_SEARCH_LENGTH } from './useDiscoverFilters';

export const useDiscoverMovies = () => {
    const { searchTerm, selectedGenres, selectedSort, getDiscoverParams } = useDiscoverFilters();

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

    const filtersKey = computed(() => [
        hasSearch.value ? `search:${normalizedSearch.value}` : 'discover',
        `genres:${selectedGenres.value.join(',')}`,
        `sort:${selectedSort.value}`,
    ].join('|'));

    const previousFilterKey = ref(filtersKey.value);

    const fetchMovies = async () => {
        if (isLoading.value) return;
        if (lastFetchedPage.value === page.value) return;

        isLoading.value = true;
        error.value = undefined;

        try {
            const url = hasSearch.value
                ? `/api/movies/search?query=${encodeURIComponent(normalizedSearch.value)}&page=${page.value}`
                : `/api/movies/discover?${getDiscoverParams().toString()}&page=${page.value}`;

            const data = await $fetch<MovieResponse>(url);
            totalPages.value = data.total_pages;

            if (page.value === 1) {
                allMovies.value = data.results;
            } else {
                allMovies.value = [...allMovies.value, ...data.results];
            }

            lastFetchedPage.value = page.value;
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
        allMovies,
        pending: isLoading,
        error,
        refresh: fetchMovies,
        hasSearch,
        hasMore: computed(() => page.value < totalPages.value),
        isLoadingMore: computed(() => isLoading.value && page.value > 1),
        loadMore,
        reset,
    };
};
