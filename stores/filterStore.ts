import dayjs from 'dayjs';

export const useFilterStore = defineStore('filter', () => {
    const route = useRoute();
    const searchTerm = ref('');
    const selectedGenres = ref<number[]>([]);
    const selectedSort = ref('popularity.desc');

    const filterMovies = (movies: Movie[]) => {
        let filtered = [...movies];

        if (searchTerm.value) {
            const searchLower = searchTerm.value.toLowerCase();
            filtered = filtered.filter(movie => 
                movie.title.toLowerCase().includes(searchLower) ||
                movie.original_title.toLowerCase().includes(searchLower),
            );
        }

        if (selectedGenres.value.length > 0 && route.path !== '/discover') {
            filtered = filtered.filter(movie =>
                selectedGenres.value.every((genreId: number) => movie.genre_ids?.includes(genreId)),
            );
        }

        if (selectedSort.value && route.path !== '/discover') {
            const [field, direction] = selectedSort.value.split('.');
            filtered = filtered.sort((a, b) => {
                let aValue: unknown = a[field];
                let bValue: unknown = b[field];

                if (field === 'release_date' || field === 'primary_release_date') {
                    aValue = dayjs(a.release_date).valueOf();
                    bValue = dayjs(b.release_date).valueOf();
                } else if (['popularity', 'revenue', 'vote_average', 'vote_count'].includes(field)) {
                    aValue = Number(a[field]) || 0;
                    bValue = Number(b[field]) || 0;
                } else if (typeof aValue === 'string' && typeof bValue === 'string') {
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                }

                if (aValue === undefined && bValue === undefined) return 0;
                if (aValue === undefined) return direction === 'asc' ? 1 : -1;
                if (bValue === undefined) return direction === 'asc' ? -1 : 1;

                if (direction === 'asc') {
                    return (aValue as string | number) > (bValue as string | number) ? 1 : -1;
                } 
                return (aValue as string | number) < (bValue as string | number) ? 1 : -1;
            });
        }
        return filtered;
    };

    const resetFilters = () => {
        searchTerm.value = '';
        selectedGenres.value = [];
        selectedSort.value = 'popularity.desc';
    };

    const getDiscoverParams = () => {
        const params = new URLSearchParams();
        
        if (selectedSort.value) {
            params.append('sort_by', selectedSort.value);
        }
        
        if (selectedGenres.value.length > 0) {
            params.append('with_genres', selectedGenres.value.join(','));
        }
        
        return params;
    };

    return {
        searchTerm,
        selectedGenres,
        selectedSort,
        filterMovies,
        resetFilters,
        getDiscoverParams,
    };
});
