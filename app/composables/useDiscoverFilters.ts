import type { Movie } from '~/types/movie';
import { isNavigationFailure, NavigationFailureType } from 'vue-router';

const DISCOVER_ROUTE = '/discover';

export const MIN_SEARCH_LENGTH = 2;

export const useDiscoverFilters = () => {
    const route = useRoute();
    const router = useRouter();

    const isDiscoverRoute = computed(() => route.path === DISCOVER_ROUTE);

    const searchTerm = computed(() => {
        if (!isDiscoverRoute.value) {
            return '';
        }
        return getQueryString(route.query.search ?? '');
    });

    const selectedGenres = computed(() => {
        if (!isDiscoverRoute.value) {
            return [];
        }
        return parseGenresQuery(route.query.genres);
    });

    const selectedSort = computed(() => {
        if (!isDiscoverRoute.value) {
            return DEFAULT_SORT;
        }
        return getQueryString(route.query.sort ?? DEFAULT_SORT);
    });

    const hasActiveFilters = computed(
        () =>
            Boolean(searchTerm.value)
            || selectedGenres.value.length > 0
            || selectedSort.value !== DEFAULT_SORT,
    );

    const updateQuery = async (updates: Record<string, string | undefined>) => {
        if (!isDiscoverRoute.value) {
            return;
        }

        try {
            await router.replace({
                query: {
                    ...route.query,
                    ...updates,
                },
            });
        }
        catch (err: unknown) {
            if (!isNavigationFailure(err, NavigationFailureType.duplicated)) {
                console.error('Navigation error:', err);
            }
        }
    };

    const setSearchTerm = async (value: string) => {
        await updateQuery({ search: value || undefined });
    };

    const setSelectedGenres = async (value: number[]) => {
        await updateQuery({
            genres: value.length > 0 ? value.join(',') : undefined,
        });
    };

    const setSelectedSort = async (value: string) => {
        await updateQuery({ sort: value !== DEFAULT_SORT ? value : undefined });
    };

    const resetFilters = async () => {
        if (!isDiscoverRoute.value) {
            return;
        }

        try {
            await router.replace({ query: {} });
        }
        catch (err: unknown) {
            if (!isNavigationFailure(err, NavigationFailureType.duplicated)) {
                console.error('Navigation error:', err);
            }
        }
    };

    const getDiscoverParams = (): URLSearchParams =>
        buildDiscoverParams(selectedSort.value, selectedGenres.value);

    const filterMovies = (movies: Movie[]): Movie[] =>
        filterMoviesList(movies, {
            selectedGenres: selectedGenres.value,
            selectedSort: selectedSort.value,
        });

    return {
        searchTerm,
        selectedGenres,
        selectedSort,
        hasActiveFilters,
        setSearchTerm,
        setSelectedGenres,
        setSelectedSort,
        resetFilters,
        getDiscoverParams,
        filterMovies,
    };
};
