export default defineNuxtPlugin(() => {
    const movieStore = useMovieStore();
    const { getGenres } = movieStore;

    // Load genres in background without blocking app startup
    getGenres();
});
