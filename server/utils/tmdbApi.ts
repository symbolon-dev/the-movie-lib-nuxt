const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_DEFAULT_LANGUAGE = 'en-US';

export function getTmdbApiKey(): string {
    const { tmdbApiKey } = useRuntimeConfig();
    if (!tmdbApiKey) {
        throw new Error('API key is not set in the runtime configuration.');
    }
    return tmdbApiKey;
}

type TmdbParams = Record<string, string | number | boolean | undefined>;

export async function fetchFromTmdb<TResponse>(endpoint: string, params: TmdbParams = {}): Promise<TResponse> {
    const tmdbApiKey = getTmdbApiKey();

    const defaultParams: TmdbParams = {
        language: TMDB_DEFAULT_LANGUAGE,
        ...params,
    };

    const urlParams = new URLSearchParams(
        Object.entries(defaultParams)
            .filter(([, value]) => value !== undefined)
            .map(([key, value]) => [key, String(value)]),
    );

    const queryString = urlParams.toString();
    const url = `${TMDB_API_BASE_URL}/${endpoint}${queryString ? `?${queryString}` : ''}`;

    return $fetch(url, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${tmdbApiKey}`,
        },
    }) as Promise<TResponse>;
}

export function handleApiError(error: unknown, message = 'Internal Server Error'): never {
    console.error('Error in TMDB API: ', error);
    throw createError({
        statusCode: 500,
        statusMessage: message,
        data: error instanceof Error ? error.message : error,
    });
}
