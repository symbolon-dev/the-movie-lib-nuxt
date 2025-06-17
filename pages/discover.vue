<template>
    <div>
        <BackButton class="mt-8" />

        <div class="mt-8 grid gap-4 lg:grid-cols-[300px_1fr]">
            <!-- Filter Sidebar -->
            <div 
                class="flex h-fit w-full flex-col space-y-4 rounded-md border border-gray-300 bg-surface/80 p-4 shadow-xl backdrop-blur-md"
            >
                <FilterSearch />
                <FilterGenres />
                <FilterSort />

                <button 
                    class="btn btn-secondary mt-4"
                    @click="handleResetFilters"
                >
                    <Icon name="ion:refresh" class="mr-2" />
                    <span>Zurücksetzen</span>
                </button>
            </div>

            <div class="mb-8">
                <MovieList 
                    :grid-classes="'grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'" 
                    :initial-visible-count="10"
                />
            </div>
        </div>
        <ScrollToTopButton />
    </div>
</template>

<script setup lang="ts">
const movieStore = useMovieStore();
const { movies } = storeToRefs(movieStore);
const { loadMovies, resetFilters } = movieStore;

const handleResetFilters = async () => {
    resetFilters();
    await loadMovies();
};

onMounted(async () => {
    if (movies.value.length === 0) {
        await loadMovies();
    }
});

onBeforeRouteLeave((to) => {
    if (!to.path.startsWith('/movies/')) {
        resetFilters();
    }
});
</script>
