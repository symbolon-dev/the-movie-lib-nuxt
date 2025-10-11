export type Genre = {
    id: number;
    name: string;
};

export type GenresResponse = {
    genres: Genre[];
};

export type Movie = {
    id: number;
    title: string;
    original_title: string;
    overview?: string;
    release_date?: string;
    primary_release_date?: string;
    genre_ids?: number[];
    poster_path?: string;
    backdrop_path?: string;
    genres?: Genre[];
    vote_average?: number;
    vote_count?: number;
    popularity?: number;
    runtime?: number;
    revenue?: number;
    homepage?: string;
    tagline?: string;
};

export type MovieResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};

export const MIN_SEARCH_LENGTH = 2;

export const MOVIE_CATEGORIES = [
    { key: 'now_playing', label: 'Now Playing' },
    { key: 'popular', label: 'Popular' },
    { key: 'top_rated', label: 'Top Rated' },
    { key: 'upcoming', label: 'Upcoming' },
] as const;

export type MovieListType = typeof MOVIE_CATEGORIES[number]['key'];
