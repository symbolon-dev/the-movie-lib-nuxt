<template>
    <div class="space-y-8">
        <Hero class="mt-8" />
        <Segment />
        <MovieList
            :grid-classes="'grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'"
            :initial-visible-count="4"
        />
        <ScrollToTopButton />
    </div>
</template>

<script setup lang="ts">
const { data: initialMovies } = await useFetch<MovieResponse>('/api/movies/now_playing?page=1');

const movieStore = useMovieStore();
const { movies, currentSegmentView, totalPages, totalResults, currentPage } = storeToRefs(movieStore);

if (movies.value.length === 0 && initialMovies.value) {
    movies.value = initialMovies.value.results;
    totalPages.value = initialMovies.value.total_pages;
    totalResults.value = initialMovies.value.total_results;
    currentPage.value = 1;
}

onMounted(() => {
    scrollTo(0, 0);
    currentSegmentView.value = 'now_playing';
});

useHead({
    link: [
        {
            rel: 'preconnect',
            href: 'https://image.tmdb.org'
        },
        {
            rel: 'dns-prefetch',
            href: 'https://image.tmdb.org'
        }
    ]
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
