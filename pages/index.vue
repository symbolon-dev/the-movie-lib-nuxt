<template>
    <div class="space-y-8">
        <Hero class="mt-8" />
        <Segment :current="listType" @change="setListType" />

        <Error
            v-if="error"
            :message="getErrorMessage(error)"
            @retry="refresh"
        />

        <template v-else>
            <MovieList
                :movies="allMovies"
                :loading="pending"
                :grid-classes="'movie-grid'"
                :initial-visible-count="4"
            />

            <div class="mt-6 flex justify-center">
                <ClientOnly>
                    <LoadMoreButton
                        :is-loading="isLoadingMore"
                        :has-more="hasMore"
                        @load-more="loadMore"
                    />
                </ClientOnly>
            </div>
        </template>

        <ScrollToTopButton />
    </div>
</template>

<script setup lang="ts">
import { getErrorMessage } from '~/utils/error';
import { TMDB_IMAGE_BASE } from '~/utils/tmdb';

const { allMovies, pending, error, refresh, listType, hasMore, isLoadingMore, setListType, loadMore } = useMovies();

useHead({
    link: [
        {
            rel: 'preconnect',
            href: TMDB_IMAGE_BASE,
        },
        {
            rel: 'dns-prefetch',
            href: TMDB_IMAGE_BASE,
        },
    ],
});

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
