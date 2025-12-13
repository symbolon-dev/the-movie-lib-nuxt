import type { Genre, Movie } from '~/types/movie';

export interface MovieResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface GenresResponse {
    genres: Genre[];
}
