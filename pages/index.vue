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

// SEO Meta Tags
useSeoMeta({
    title: 'The Movie Lib - Discover Movies',
    description: 'Discover the latest movies, popular films, and top-rated cinema. Browse through an extensive collection of movies with detailed information and ratings.',
    ogTitle: 'The Movie Lib - Discover Movies',
    ogDescription: 'Discover the latest movies, popular films, and top-rated cinema. Browse through an extensive collection of movies with detailed information and ratings.',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'The Movie Lib - Discover Movies',
    twitterDescription: 'Discover the latest movies, popular films, and top-rated cinema. Browse through an extensive collection of movies with detailed information and ratings.',
});
</script>
