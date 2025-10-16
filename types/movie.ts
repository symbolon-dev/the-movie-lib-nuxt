export type Genre = {
    id: number;
    name: string;
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

export type MovieListType = 'now_playing' | 'popular' | 'top_rated' | 'upcoming';
