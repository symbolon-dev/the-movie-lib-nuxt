import type { Movie, Genre } from '~/types/movie';

export type MovieResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};

export type GenresResponse = {
    genres: Genre[];
};