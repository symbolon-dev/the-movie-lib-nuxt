<template>
    <div class="space-y-8">
        <Hero class="mt-8" />
        <Segment />
        <MovieList 
            :grid-classes="'grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'" 
            :initial-visible-count="10"
        />
        <ScrollToTopButton />
    </div>
</template>

<script setup lang="ts">
const movieStore = useMovieStore();
const { movies, currentSegmentView } = storeToRefs(movieStore);
const { loadMovies } = movieStore;

onMounted(async () => {
    currentSegmentView.value = 'now_playing';
    scrollTo(0, 0);
    
    if (movies.value.length === 0) {
        await loadMovies();
    }
});
</script>
