import dayjs from 'dayjs';
import type { Movie } from '~/types/movie';

type SortableValue = string | number | undefined;

type FilterOptions = {
    searchTerm: string;
    selectedGenres: number[];
    selectedSort: string;
    hasClientSearch: boolean;
    isDiscoverRoute: boolean;
};

export const DEFAULT_SORT = 'popularity.desc';
const DATE_FIELDS = ['release_date', 'primary_release_date'] as const;
const NUMERIC_FIELDS = ['popularity', 'revenue', 'vote_average', 'vote_count'] as const;

type DateField = typeof DATE_FIELDS[number];
type NumericField = typeof NUMERIC_FIELDS[number];
type MovieField = keyof Movie;

const isDateField = (field: string): field is DateField =>
    DATE_FIELDS.includes(field as DateField);

const isNumericField = (field: string): field is NumericField =>
    NUMERIC_FIELDS.includes(field as NumericField);

export const buildDiscoverParams = (selectedSort: string, selectedGenres: number[]): URLSearchParams => {
    const params = new URLSearchParams();

    if (selectedSort) {
        params.append('sort_by', selectedSort);
    }

    if (selectedGenres.length > 0) {
        params.append('with_genres', selectedGenres.join(','));
    }

    return params;
};

const getSortValue = (movie: Movie, field: string): SortableValue => {
    if (isDateField(field)) {
        const rawValue = movie[field];
        const dateValue = typeof rawValue === 'string' ? rawValue : movie.release_date;
        if (!dateValue) return undefined;
        const parsed = dayjs(dateValue);
        return parsed.isValid() ? parsed.valueOf() : undefined;
    }

    if (isNumericField(field)) {
        const numericValue = movie[field];
        return typeof numericValue === 'number'
            ? numericValue
            : Number(numericValue ?? 0);
    }

    // Fallback for other string fields
    if (field in movie) {
        const value = movie[field as MovieField];
        if (typeof value === 'string') {
            return value.toLowerCase();
        }
        if (typeof value === 'number') {
            return value;
        }
    }

    return undefined;
};

const compareValues = (
    aValue: SortableValue,
    bValue: SortableValue,
    direction: 'asc' | 'desc',
): number => {
    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return direction === 'asc' ? 1 : -1;
    if (bValue === undefined) return direction === 'asc' ? -1 : 1;

    if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return direction === 'asc' ? comparison : -comparison;
    }

    return 0;
};

const applySearch = (items: Movie[], searchTerm: string, hasClientSearch: boolean): Movie[] => {
    if (!hasClientSearch) return items;
    const searchLower = searchTerm.toLowerCase();
    return items.filter(movie =>
        movie.title.toLowerCase().includes(searchLower) ||
        movie.original_title.toLowerCase().includes(searchLower),
    );
};

const applyGenreFilter = (items: Movie[], selectedGenres: number[]): Movie[] => {
    if (selectedGenres.length === 0) return items;
    return items.filter(movie =>
        selectedGenres.every(genreId => {
            const genreIds = movie.genre_ids ?? movie.genres?.map(genre => genre.id) ?? [];
            return genreIds.includes(genreId);
        }),
    );
};

const applySort = (items: Movie[], selectedSort: string, isDiscoverRoute: boolean, hasClientSearch: boolean): Movie[] => {
    const canApplySort = selectedSort && (!isDiscoverRoute || hasClientSearch);
    if (!canApplySort) return items;

    const [field, direction] = selectedSort.split('.') as [string, 'asc' | 'desc' | undefined];
    if (direction !== 'asc' && direction !== 'desc') return items;

    return [...items].sort((a, b) => {
        const aValue = getSortValue(a, field);
        const bValue = getSortValue(b, field);
        return compareValues(aValue, bValue, direction);
    });
};

export const filterMoviesList = (movies: Movie[], options: FilterOptions): Movie[] => {
    const {
        searchTerm,
        selectedGenres,
        selectedSort,
        hasClientSearch,
        isDiscoverRoute,
    } = options;

    const searchedMovies = applySearch(movies, searchTerm, hasClientSearch);
    const filteredMovies = applyGenreFilter(searchedMovies, selectedGenres);
    const sortedMovies = applySort(filteredMovies, selectedSort, isDiscoverRoute, hasClientSearch);

    return sortedMovies;
};
