import { isNavigationFailure, NavigationFailureType } from 'vue-router';
import type { Movie } from '~/types/movie';
import { MIN_SEARCH_LENGTH } from '~/types/movie';
import {
    DEFAULT_SORT,
    buildDiscoverParams,
    filterMoviesList,
} from '~/utils/movieFilters';
import { getQueryString, parseGenresQuery } from '~/utils/queryParams';

const DISCOVER_ROUTE = '/discover';

export const useDiscoverFilters = () => {
    const route = useRoute();
    const router = useRouter();

    const isDiscoverRoute = computed(() => route.path === DISCOVER_ROUTE);

    const showAllResults = ref(false);

    const searchTerm = computed(() => {
        if (!isDiscoverRoute.value) return '';
        return getQueryString(route.query.search);
    });

    const selectedGenres = computed(() => {
        if (!isDiscoverRoute.value) return [];
        return parseGenresQuery(route.query.genres);
    });

    const selectedSort = computed(() => {
        if (!isDiscoverRoute.value) return DEFAULT_SORT;
        return getQueryString(route.query.sort) || DEFAULT_SORT;
    });

    const hasClientSearch = computed(() => {
        const trimmed = searchTerm.value.trim();
        return trimmed.length >= MIN_SEARCH_LENGTH;
    });

    const hasActiveFilters = computed(() =>
        Boolean(searchTerm.value) ||
        selectedGenres.value.length > 0 ||
        selectedSort.value !== DEFAULT_SORT,
    );

    const hasGenreFilter = computed(() =>
        selectedGenres.value.length > 0 && hasClientSearch.value,
    );

    const updateQuery = async (updates: Record<string, string | undefined>) => {
        if (!isDiscoverRoute.value) return;

        try {
            await router.replace({
                query: {
                    ...route.query,
                    ...updates,
                },
            });
        } catch (err: unknown) {
            if (!isNavigationFailure(err, NavigationFailureType.duplicated)) {
                console.error('Navigation error:', err);
            }
        }
    };

    const setSearchTerm = async (value: string) => {
        await updateQuery({ search: value || undefined });
    };

    const setSelectedGenres = async (value: number[]) => {
        await updateQuery({ genres: value.length > 0 ? value.join(',') : undefined });
    };

    const setSelectedSort = async (value: string) => {
        await updateQuery({ sort: value !== DEFAULT_SORT ? value : undefined });
    };

    const resetFilters = async () => {
        if (!isDiscoverRoute.value) return;

        try {
            await router.replace({ query: {} });
            showAllResults.value = false;
        } catch (err: unknown) {
            if (!isNavigationFailure(err, NavigationFailureType.duplicated)) {
                console.error('Navigation error:', err);
            }
        }
    };

    const toggleShowAllResults = () => {
        showAllResults.value = !showAllResults.value;
    };

    watch([searchTerm, selectedGenres], () => {
        showAllResults.value = false;
    });

    const getDiscoverParams = (): URLSearchParams =>
        buildDiscoverParams(selectedSort.value, selectedGenres.value);

    const filterMovies = (movies: Movie[]): Movie[] =>
        filterMoviesList(movies, {
            searchTerm: searchTerm.value,
            selectedGenres: showAllResults.value ? [] : selectedGenres.value, // Bypass genre filter if showAllResults
            selectedSort: selectedSort.value,
            hasClientSearch: hasClientSearch.value,
            isDiscoverRoute: isDiscoverRoute.value,
        });

    return {
        searchTerm,
        selectedGenres,
        selectedSort,
        hasClientSearch,
        hasActiveFilters,
        hasGenreFilter,
        showAllResults,
        setSearchTerm,
        setSelectedGenres,
        setSelectedSort,
        resetFilters,
        toggleShowAllResults,
        getDiscoverParams,
        filterMovies,
    };
};
