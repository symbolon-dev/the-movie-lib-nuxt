<template>
    <div>
        <!-- Movie Grid -->
        <div class="grid grid-cols-1 gap-6" :class="gridClasses">
            <!-- Movies (always show, add skeletons if needed) -->
            <MovieCard
                v-for="(movie, index) in movies"
                :key="movie.id"
                :movie="movie"
                :index="index"
                :is-lazy="index >= initialVisibleCount"
            />

            <!-- Additional skeletons while loading more -->
            <template v-if="loading && movies.length === 0">
                <MovieSkeleton v-for="n in SKELETON_COUNT" :key="n" />
            </template>
        </div>
    
        <div v-if="!loading && hasMoreMovies && !error" class="my-8 text-center">
            <button
                :disabled="loadingMore"
                class="btn-primary"
                @click="loadNextPage"
            >
                {{ loadingMore ? 'Loading...' : 'Load more' }}
            </button>
        </div>
    
        <!-- Error State -->
        <div v-if="!loading && error" class="py-8">
            <Error
                :message="error"
                @retry="loadMovies()"
            />
        </div>

        <!-- No Results -->
        <div v-else-if="!loading && movies.length === 0" class="py-8 text-center">
            <p class="text-gray-500">No movies found</p>
        </div>
    </div>
</template>

<script setup lang="ts">
const SKELETON_COUNT = 12;

withDefaults(defineProps<{
    gridClasses: string;
    initialVisibleCount?: number;
}>(), {
    initialVisibleCount: 4,
});

const movieStore = useMovieStore();
const { displayMovies: movies, loading, loadingMore, hasMoreMovies, error } = storeToRefs(movieStore);
const { loadNextPage, loadMovies } = movieStore;
</script>
