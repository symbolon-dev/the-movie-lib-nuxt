<template>
    <div>
        <BackButton class="mt-8" />

        <div class="mt-8 grid gap-4 lg:grid-cols-[300px_1fr]">
            <div
                class="flex h-fit w-full flex-col space-y-4 rounded-md border border-gray-300 bg-surface/80 p-4 shadow-xl backdrop-blur-md"
            >
                <FilterSearch />
                <FilterGenres />
                <FilterSort />

                <button
                    type="button"
                    class="btn btn-secondary mt-4 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:active:scale-100"
                    :disabled="!hasActiveFilters"
                    @click="handleResetFilters"
                >
                    <Icon name="ion:refresh" class="mr-2" />
                    <span>Reset</span>
                </button>
            </div>

            <div class="mb-8">
                <ErrorComponent
                    v-if="error"
                    :message="getErrorMessage(error)"
                    @retry="refresh"
                />

                <template v-else>
                    <MovieList
                        :movies="displayedMovies"
                        :loading="pending"
                        :grid-classes="'movie-grid'"
                        :initial-visible-count="10"
                    />

                    <div class="mt-6 flex flex-col items-center gap-3">
                        <div ref="sentinelRef" class="flex h-20 items-center justify-center" :class="{ 'invisible': !hasMore }">
                            <span v-if="isLoadingMore" class="loading loading-spinner loading-lg" />
                        </div>

                        <p v-if="!hasMore && displayedMovies.length > 0" class="text-center text-sm text-gray-500">
                            No more results
                        </p>
                    </div>
                </template>
            </div>
        </div>
        <ScrollToTopButton />
    </div>
</template>

<script setup lang="ts">
import { getErrorMessage } from '~/utils/error';

const {
    filterMovies,
    hasActiveFilters,
    selectedGenres,
} = useDiscoverFilters();
const {
    allMovies,
    pending,
    error,
    refresh,
    loadMore,
    isLoadingMore,
    hasMore,
    reset,
    hasSearch,
} = useDiscoverMovies();

const displayedMovies = computed(() => {
    if (allMovies.value.length === 0) {return [];}
    if (hasSearch.value && selectedGenres.value.length > 0) {
        return filterMovies(allMovies.value);
    }
    return allMovies.value;
});

const handleResetFilters = async () => {
    await reset(true);
};

const sentinelRef = ref<HTMLElement | null>(null);

const checkIfNeedMore = () => {
    if (!sentinelRef.value || !hasMore.value || isLoadingMore.value) {return;}

    const rect = sentinelRef.value.getBoundingClientRect();
    const isNearBottom = rect.top < window.innerHeight + 600;

    if (isNearBottom) {
        loadMore();
    }
};

useIntersectionObserver(
    sentinelRef,
    (entries: IntersectionObserverEntry[]) => {
        const [{ isIntersecting } = {}] = entries;
        if (isIntersecting && hasMore.value && !isLoadingMore.value) {
            loadMore();
        }
    },
    { rootMargin: '600px' },
);


watch(isLoadingMore, async (loading) => {
    if (!loading) {
        await nextTick(checkIfNeedMore);
    }
});

useSeoMeta({
    title: 'Discover Movies - The Movie Lib',
    description: 'Discover and explore movies with advanced search and filtering options. Find movies by genre, release year, rating and more.',
    ogTitle: 'Discover Movies - The Movie Lib',
    ogDescription: 'Discover and explore movies with advanced search and filtering options. Find movies by genre, release year, rating and more.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'Discover Movies - The Movie Lib',
    twitterDescription: 'Discover and explore movies with advanced search and filtering options. Find movies by genre, release year, rating and more.',
});
</script>
