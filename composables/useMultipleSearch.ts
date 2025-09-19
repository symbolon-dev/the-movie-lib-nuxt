import type { Movie, MovieResponse } from '~/stores/movieStore';

/**
 * Composable for loading multiple search pages in parallel
 * Used when genre filters are applied to get more comprehensive results
 */
export const useMultipleSearch = () => {
    const loadMultipleSearchPages = async (
        query: string,
        pagesToLoad: number = 5,
    ): Promise<{ movies: Movie[], totalPages: number, totalResults: number }> => {
        try {
            const pages = Array.from({ length: pagesToLoad }, (_, index) => index + 1);

            const pagePromises = pages.map(page =>
                $fetch<MovieResponse>(`/api/movies/search?query=${encodeURIComponent(query)}&page=${page}`),
            );

            const responses = await Promise.all(pagePromises);

            const allMovies: Movie[] = [];
            const movieIds = new Set<number>();
            let totalPages = 0;
            let totalResults = 0;

            responses.forEach((response, index) => {
                response.results.forEach(movie => {
                    if (!movieIds.has(movie.id)) {
                        allMovies.push(movie);
                        movieIds.add(movie.id);
                    }
                });

                if (index === 0) {
                    totalPages = response.total_pages;
                    totalResults = response.total_results;
                }
            });

            return {
                movies: allMovies,
                totalPages,
                totalResults,
            };
        } catch (error) {
            console.error('Failed to load multiple search pages:', error);
            return {
                movies: [],
                totalPages: 0,
                totalResults: 0,
            };
        }
    };

    return {
        loadMultipleSearchPages,
    };
};
