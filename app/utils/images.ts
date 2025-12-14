export const TMDB_IMAGE_BASE = 'https://image.tmdb.org';

export type TmdbImageSize = 'w500' | 'original';

export const getTmdbImageUrl = (path: string | undefined, size: TmdbImageSize = 'w500'): string | undefined => {
    if (path == null || path === '') {
        return undefined;
    }
    return `${TMDB_IMAGE_BASE}/t/p/${size}${path}`;
};
