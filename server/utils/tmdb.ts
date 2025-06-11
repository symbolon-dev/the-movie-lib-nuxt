import type { H3Event } from 'h3';

export type MovieResponse = {
    page: number;
    results: unknown[];
    total_pages: number;
    total_results: number;
};

export const getTmdbApiKey = (): string => {
    const { tmdbApiKey } = useRuntimeConfig();
    if (!tmdbApiKey) {
        throw new Error('API key is not set in the runtime configuration.');
    }
    return tmdbApiKey;
};

export const fetchFromTmdb = async <TmdbResponseType>(endpoint: string, params?: Record<string, string | number>): Promise<TmdbResponseType> => {
    const tmdbApiKey = getTmdbApiKey();
    
    const defaultParams = {
        language: 'de-DE',
        ...params,
    };
    
    const urlParams = new URLSearchParams();
    Object.entries(defaultParams).forEach(([key, value]) => {
        urlParams.set(key, String(value));
    });
    
    const queryString = urlParams.toString();
    const url = `https://api.themoviedb.org/3/${endpoint}${queryString ? `?${queryString}` : ''}`;
    
    const response = await $fetch(url, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${tmdbApiKey}`,
        },
    });
    
    return response as TmdbResponseType;
};

export const getPageFromQuery = (event: H3Event, defaultPage = 1, maxPage = 1000): number => {
    const query = getQuery(event);
    const pageStr = query.page;
    let page = defaultPage;
    
    if (pageStr && typeof pageStr === 'string') {
        const parsed = parseInt(pageStr);
        if (!isNaN(parsed) && parsed > 0) {
            page = parsed;
        }
    }
    
    if (page > maxPage) {
        throw createError({
            statusCode: 400,
            statusMessage: `Page number exceeds maximum allowed value (${maxPage})`,
        });
    }
    
    return page;
};

export const handleApiError = (error: unknown, message = 'Internal Server Error'): never => {
    console.error('Error in TMDB API: ', error);
    throw createError({
        statusCode: 500,
        statusMessage: message,
        data: error,
    });
};
