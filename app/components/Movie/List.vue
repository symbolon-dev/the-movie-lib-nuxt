<script setup lang="ts">
import type { Movie } from '~/types/movie';

const props = defineProps<{
    movies: Movie[];
    loading?: boolean;
    gridClasses: string;
    initialVisibleCount?: number;
}>();
const SKELETON_COUNT = 12;
const DEFAULT_INITIAL_VISIBLE_COUNT = 4;
</script>

<template>
    <div>
        <div class="grid grid-cols-1 gap-6" :class="props.gridClasses">
            <MovieCard
                v-for="(movie, index) in props.movies"
                :key="movie.id"
                :movie="movie"
                :index="index"
                :is-lazy="index >= (props.initialVisibleCount ?? DEFAULT_INITIAL_VISIBLE_COUNT)"
            />

            <template v-if="props.loading && props.movies.length === 0">
                <MovieSkeleton v-for="n in SKELETON_COUNT" :key="n" />
            </template>
        </div>

        <div v-if="props.loading && props.movies.length > 0" class="mt-6 flex justify-center" aria-live="polite">
            <div class="flex items-center gap-2 text-primary">
                <span class="loading loading-spinner loading-md" />
                <span class="text-sm font-medium">Loading more movies...</span>
            </div>
        </div>

        <div v-if="!props.loading && props.movies.length === 0" class="py-8 text-center">
            <p class="text-gray-500">
                No movies found
            </p>
        </div>
    </div>
</template>
