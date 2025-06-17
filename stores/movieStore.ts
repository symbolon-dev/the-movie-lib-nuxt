export type Movie = {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    release_date: string;
    genre_ids: number[];
    poster_path: string;
    genres: { id: number; name: string }[];
    vote_average: number;
    runtime: number;
    homepage: string;
    [key: string]: unknown;
}

export type MovieResponse = {
    results: Movie[];
    total_pages: number;
    total_results: number;
    page?: number;
}

export const useMovieStore = defineStore('movieData', () => {
    const route = useRoute();
    const filterStore = useFilterStore();

    const {
        searchTerm, selectedSort, selectedGenres,
    } = storeToRefs(filterStore);
    const { getDiscoverParams, filterMovies, resetFilters } = filterStore;
    
    const movies = ref<Movie[]>([]);
    const genres = ref<{ id: number; name: string }[]>([]);
    const totalPages = ref(0);
    const totalResults = ref(0);
    const loading = ref(false);
    const loadingMore = ref(false);
    const currentPage = ref(1);
    const currentSegmentView = ref('now_playing');
    const scrollPositions = ref<Record<string, number>>({});
    
    const hasMoreMovies = computed(() => currentPage.value < totalPages.value);

    const displayMovies = computed(() => {
        if (route.path === '/discover') {
            return filterMovies(movies.value);
        }
        return movies.value;
    });

    const filteredMovies = computed(() => displayMovies.value);
    const resetPagination = () => {
        currentPage.value = 1;
        totalPages.value = 0;
        totalResults.value = 0;
    };

    const saveScrollPosition = (routePath: string) => {
        scrollPositions.value[routePath] = window.scrollY;
    };

    const restoreScrollPosition = (routePath: string) => {
        const savedPosition = scrollPositions.value[routePath];
        if (savedPosition !== undefined) {
            nextTick(() => {
                window.scrollTo(0, savedPosition);
            });
        }
    };

    const getGenres = async () => {
        if (!genres.value.length) {
            return await fetchGenres();
        }
        return genres.value;
    };

    const fetchGenres = async () => {
        try {
            const response = await $fetch<{ genres: {id: number, name: string}[] }>('/api/movies/genres');
            genres.value = response.genres;
            return genres.value;
        } catch (error) {
            console.error('Failed to fetch genres:', error);
            return [];
        }
    };

    const fetchMovies = async (listType: string, page: number = 1, append: boolean = false) => {
        if (!append) {
            loading.value = true;
        } else {
            loadingMore.value = true;
        }

        try {
            const response = await $fetch<MovieResponse>(`/api/movies/${listType}?page=${page}`);

            if (append) {
                const newMovies: Movie[] = response.results.filter((movie: Movie) => 
                    !movies.value.some((existing: Movie) => existing.id === movie.id),
                );
                movies.value = [...movies.value, ...newMovies];
            } else {
                movies.value = response.results;
            }

            totalPages.value = response.total_pages;
            totalResults.value = response.total_results;
            
            await new Promise(resolve => setTimeout(resolve, 250));
        } catch (error) {
            console.error('Movie fetching failed:', error);
        } finally {
            loading.value = false;
            loadingMore.value = false;
        }
    };

    const searchMovies = async (query: string, page: number = 1, append: boolean = false) => {
        if (!query.trim() || query.trim().length < 2) return;

        const hasGenreFilters = selectedGenres.value.length > 0;
        
        if (page === 1 && hasGenreFilters && !append) {
            return await loadMultipleSearchPages(query);
        }

        if (!append) {
            loading.value = true;
            if (page === 1) {
                movies.value = [];
            }
        } else {
            loadingMore.value = true;
        }
        
        try {
            const response = await $fetch<MovieResponse>(`/api/movies/search?query=${encodeURIComponent(query)}&page=${page}`);
            
            if (append) {
                const existingIds = new Set(movies.value.map(m => m.id));
                const newMovies: Movie[] = response.results.filter((movie: Movie) => !existingIds.has(movie.id));
                
                if (newMovies.length > 0) {
                    movies.value = [...movies.value, ...newMovies];
                }
            } else {
                movies.value = response.results;
            }
            
            totalPages.value = response.total_pages;
            totalResults.value = response.total_results;
            
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            loading.value = false;
            loadingMore.value = false;
        }
    };

    const discoverMovies = async (params: URLSearchParams, page: number = 1, append: boolean = false) => {
        params.set('page', page.toString());

        if (!append) {
            loading.value = true;
            if (page === 1) {
                movies.value = [];
            }
        } else {
            loadingMore.value = true;
        }
        
        try {
            const response = await $fetch<MovieResponse>(`/api/movies/discover?${params.toString()}`);

            if (append) {
                const existingIds = new Set(movies.value.map(m => m.id));
                const newMovies: Movie[] = response.results.filter((movie: Movie) => !existingIds.has(movie.id));
                
                if (newMovies.length > 0) {
                    movies.value = [...movies.value, ...newMovies];
                }
            } else {
                movies.value = response.results;
            }

            totalPages.value = response.total_pages;
            totalResults.value = response.total_results;
            
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            console.error('Discover failed:', error);
        } finally {
            loading.value = false;
            loadingMore.value = false;
        }
    };

    const loadMovies = async (append: boolean = false) => {
        if (route.path === '/discover') {
            if (searchTerm.value && searchTerm.value.trim().length >= 2) {
                await searchMovies(searchTerm.value, currentPage.value, append);
            } else if (!searchTerm.value || searchTerm.value.trim().length === 0) {
                await discoverMovies(getDiscoverParams(), currentPage.value, append);
            } else {
                if (!append) {
                    movies.value = [];
                    totalPages.value = 0;
                    totalResults.value = 0;
                }
            }
        } else {
            await fetchMovies(currentSegmentView.value, currentPage.value, append);
        }
    };

    let isLoadingNextPage = false;

    const loadNextPage = async () => {        
        if (!hasMoreMovies.value || loading.value || loadingMore.value || isLoadingNextPage) {
            return;
        }
        
        isLoadingNextPage = true;
        const nextPage = currentPage.value + 1;

        try { 
            if (route.path === '/discover') {
                if (searchTerm.value && searchTerm.value.trim().length >= 2) {
                    await searchMovies(searchTerm.value, nextPage, true);
                } else {
                    await discoverMovies(getDiscoverParams(), nextPage, true);
                }
            } else {
                await fetchMovies(currentSegmentView.value, nextPage, true);
            }
            
            currentPage.value = nextPage;
            await new Promise(resolve => setTimeout(resolve, 200));
        } catch (error) {
            console.error('Failed to load next page:', error);
        } finally {
            isLoadingNextPage = false;
        }
    };



    const loadMultipleSearchPages = async (query: string, pagesToLoad: number = 5) => {
        loading.value = true;
        movies.value = [];
        
        try {
            const pages = Array.from({ length: pagesToLoad }, (_, index) => index + 1);
            
            const pagePromises = pages.map(page => 
                $fetch<MovieResponse>(`/api/movies/search?query=${encodeURIComponent(query)}&page=${page}`),
            );
            
            const responses = await Promise.all(pagePromises);
            
            const allMovies: Movie[] = [];
            const movieIds = new Set<number>();
            
            responses.forEach((response, index) => {
                response.results.forEach(movie => {
                    if (!movieIds.has(movie.id)) {
                        allMovies.push(movie);
                        movieIds.add(movie.id);
                    }
                });
                
                if (index === 0) {
                    totalPages.value = response.total_pages;
                    totalResults.value = response.total_results;
                }
            });
            
            movies.value = allMovies;
            currentPage.value = pagesToLoad;
            
            return allMovies;
        } catch (error) {
            console.error('Failed to load multiple search pages:', error);
            return [];
        } finally {
            loading.value = false;
        }
    };

    watch(currentSegmentView, () => {
        resetPagination();
        loadMovies();
    });

    watch([selectedGenres, selectedSort], () => {
        if (route.path === '/discover') {
            resetPagination();
            loadMovies();
        }
    }, { deep: true });
    
    watch(searchTerm, (newValue) => {
        if (route.path === '/discover') {
            resetPagination();
            
            if (!newValue || newValue.trim().length >= 2) {
                loadMovies();
            } else {
                movies.value = [];
                totalPages.value = 0;
                totalResults.value = 0;
                loading.value = false;
            }
        }
    });

    return {
        movies,
        genres,
        totalPages,
        totalResults,
        currentPage,
        loading,
        loadingMore,
        hasMoreMovies,
        currentSegmentView,
        fetchMovies,
        searchMovies,
        discoverMovies,
        loadMovies,
        loadNextPage,
        resetPagination,
        getGenres,
        filteredMovies,
        displayMovies,
        resetFilters,
        selectedGenres,
        searchTerm,
        selectedSort,
        saveScrollPosition,
        restoreScrollPosition,
    };
});
