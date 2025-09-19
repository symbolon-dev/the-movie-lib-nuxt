export default defineNuxtPlugin(async () => {
    const movieStore = useMovieStore();
    const { getGenres } = movieStore;

    // Load genres on app initialization
    await getGenres();
});
