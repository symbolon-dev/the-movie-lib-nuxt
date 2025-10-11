import type { MovieResponse } from '~/types/movie';

type MergeOptions = {
    existing: MovieResponse['results'];
    incoming: MovieResponse['results'];
};

export const createDefaultMovieResponse = (pageValue: number): MovieResponse => ({
    page: pageValue,
    results: [],
    total_pages: 0,
    total_results: 0,
});

export const mergeMovieResults = ({ existing, incoming }: MergeOptions): MovieResponse['results'] => (
    existing.length === 0 ? incoming : [...existing, ...incoming]
);
