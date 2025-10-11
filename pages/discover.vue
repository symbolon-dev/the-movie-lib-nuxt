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
                <Error
                    v-if="error"
                    :message="getErrorMessage(error)"
                    @retry="refresh"
                />

                <template v-else>
                    <!-- Low Results Warning -->
                    <div
                        v-if="hasLowResults"
                        class="mb-6 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4 backdrop-blur-sm"
                    >
                        <div class="flex items-start gap-3">
                            <Icon name="ion:information-circle" class="mt-0.5 size-5 shrink-0 text-yellow-600" />
                            <div class="flex-1">
                                <h3 class="mb-1 font-semibold text-yellow-900 dark:text-yellow-100">
                                    Limited results found
                                </h3>
                                <p class="mb-3 text-sm text-yellow-800 dark:text-yellow-200">
                                    Only {{ displayedMovies.length }} of {{ totalUnfilteredResults }} search results match your genre filter.
                                </p>
                                <button
                                    type="button"
                                    class="inline-flex items-center gap-2 rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-yellow-700"
                                    @click="toggleShowAllResults"
                                >
                                    <Icon name="ion:eye" class="size-4" />
                                    Show all {{ totalUnfilteredResults }} results
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Show All Results Info -->
                    <div
                        v-if="showAllResults && hasGenreFilter"
                        class="mb-6 rounded-lg border border-blue-500/30 bg-blue-500/10 p-4 backdrop-blur-sm"
                    >
                        <div class="flex items-start gap-3">
                            <Icon name="ion:information-circle" class="mt-0.5 size-5 shrink-0 text-blue-600" />
                            <div class="flex-1">
                                <h3 class="mb-1 font-semibold text-blue-900 dark:text-blue-100">
                                    Showing all search results
                                </h3>
                                <p class="mb-3 text-sm text-blue-800 dark:text-blue-200">
                                    Genre filter temporarily disabled. Showing all {{ displayedMovies.length }} results for your search.
                                </p>
                                <button
                                    type="button"
                                    class="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                    @click="toggleShowAllResults"
                                >
                                    <Icon name="ion:funnel" class="size-4" />
                                    Apply genre filter again
                                </button>
                            </div>
                        </div>
                    </div>

                    <MovieList
                        :movies="displayedMovies"
                        :loading="pending"
                        :grid-classes="'movie-grid'"
                        :initial-visible-count="10"
                    />

                    <div class="mt-6 flex flex-col items-center gap-3">
                        <p
                            v-if="hasSearch && displayedMovies.length > 0 && !showAllResults"
                            class="text-center text-sm text-gray-500"
                        >
                            Showing search results. Genre and sort filters are applied client-side.
                        </p>
                        <ClientOnly>
                            <LoadMoreButton
                                v-if="!hasSearch"
                                :is-loading="isLoadingMore"
                                :has-more="hasMoreResults"
                                load-more-text="Load more results"
                                @load-more="loadMore"
                            />
                        </ClientOnly>
                    </div>
                </template>
            </div>
        </div>
        <ScrollToTopButton />
    </div>
</template>

<script setup lang="ts">
import { getErrorMessage } from '~/utils/error';

const LOW_RESULTS_THRESHOLD = 10;

const {
    filterMovies,
    resetFilters,
    hasActiveFilters,
    hasGenreFilter,
    showAllResults,
    toggleShowAllResults,
} = useDiscoverFilters();
const {
    allMovies,
    pending,
    error,
    refresh,
    loadMore,
    isLoadingMore,
    hasMoreResults,
    reset,
    hasSearch,
} = useDiscoverMovies();

const displayedMovies = computed(() => {
    if (allMovies.value.length === 0) return [];
    if (hasSearch.value) {
        return filterMovies(allMovies.value);
    }
    return allMovies.value;
});

const hasLowResults = computed(() => (
    hasGenreFilter.value &&
        !showAllResults.value &&
        displayedMovies.value.length > 0 &&
        displayedMovies.value.length <= LOW_RESULTS_THRESHOLD &&
        allMovies.value.length > displayedMovies.value.length
));

const totalUnfilteredResults = computed(() => allMovies.value.length);

const handleResetFilters = () => {
    resetFilters();
    reset();
};

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
