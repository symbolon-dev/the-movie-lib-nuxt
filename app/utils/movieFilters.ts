import type { Movie } from '~/types/movie';
import dayjs from 'dayjs';

type SortableValue = string | number | undefined;

interface FilterOptions {
    selectedGenres: number[];
    selectedSort: string;
}

export const DEFAULT_SORT = 'popularity.desc';
const DATE_FIELDS = ['release_date', 'primary_release_date'] as const;
const NUMERIC_FIELDS = ['popularity', 'revenue', 'vote_average', 'vote_count'] as const;

type DateField = typeof DATE_FIELDS[number];
type NumericField = typeof NUMERIC_FIELDS[number];
type MovieField = keyof Movie;

function isDateField(field: string): field is DateField {
    return DATE_FIELDS.includes(field as DateField);
}

function isNumericField(field: string): field is NumericField {
    return NUMERIC_FIELDS.includes(field as NumericField);
}

export function buildDiscoverParams(selectedSort: string, selectedGenres: number[]): URLSearchParams {
    const params = new URLSearchParams();

    params.append('sort_by', selectedSort);

    if (selectedGenres.length > 0) {
        params.append('with_genres', selectedGenres.join(','));
    }

    return params;
}

function getSortValue(movie: Movie, field: string): SortableValue {
    if (isDateField(field)) {
        const rawValue = movie[field];
        const dateValue = typeof rawValue === 'string' ? rawValue : movie.release_date;
        if (dateValue == null || dateValue === '') {
            return undefined;
        }
        const parsed = dayjs(dateValue);
        return parsed.isValid() ? parsed.valueOf() : undefined;
    }

    if (isNumericField(field)) {
        return movie[field];
    }

    // Fallback for string fields like original_title
    const value = movie[field as MovieField];
    if (typeof value === 'string') {
        return value.toLowerCase();
    }

    return undefined;
}

function compareValues(aValue: SortableValue, bValue: SortableValue, direction: 'asc' | 'desc'): number {
    if (aValue === undefined && bValue === undefined) {
        return 0;
    }
    if (aValue === undefined) {
        return direction === 'asc' ? 1 : -1;
    }
    if (bValue === undefined) {
        return direction === 'asc' ? -1 : 1;
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return direction === 'asc' ? comparison : -comparison;
    }

    return 0;
}

export function filterMoviesList(movies: Movie[], { selectedGenres, selectedSort }: FilterOptions): Movie[] {
    const [field, direction] = selectedSort.split('.') as [string, 'asc' | 'desc' | undefined];
    if (direction !== 'asc' && direction !== 'desc') {
        return movies;
    }

    return movies
        .filter(movie =>
            selectedGenres.every((genreId) => {
                const genreIds = movie.genre_ids ?? movie.genres?.map(genre => genre.id) ?? [];
                return genreIds.includes(genreId);
            }),
        )
        .sort((a, b) => {
            const aValue = getSortValue(a, field);
            const bValue = getSortValue(b, field);
            return compareValues(aValue, bValue, direction);
        });
}
