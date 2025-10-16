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
                <div ref="sentinelRef" class="flex h-20 items-center justify-center" :class="{ 'invisible': !hasMore }">
                    <span v-if="isLoadingMore" class="loading loading-spinner loading-lg" />
                </div>

                <p v-if="!hasMore && allMovies.length > 0" class="text-center text-sm text-gray-500">
                    No more results
                </p>
            </div>
        </template>

        <ScrollToTopButton />
    </div>
</template>

<script setup lang="ts">
import { getErrorMessage } from '~/utils/error';
import { TMDB_IMAGE_BASE } from '~/utils/images';

const { allMovies, pending, error, refresh, listType, hasMore, isLoadingMore, setListType, loadMore } = useMovies();

const sentinelRef = ref<HTMLElement | null>(null);

useIntersectionObserver(
    sentinelRef,
    ([{ isIntersecting }]) => {
        if (isIntersecting && hasMore.value && !isLoadingMore.value) {
            loadMore();
        }
    },
    { rootMargin: '600px' },
);

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
