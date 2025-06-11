<template>
    <div>
        <!-- Movie Grid -->
        <div class="grid grid-cols-1 gap-6" :class="gridClasses">
            <!-- Loading State -->
            <template v-if="loading">
                <MovieSkeleton v-for="n in 12" :key="n" />
            </template>
      
            <!-- Movies -->
            <template v-else>
                <MovieCard 
                    v-for="(movie, index) in movies" 
                    :key="movie.id"
                    :movie="movie"
                    :index="index"
                />
            </template>
        </div>
    
        <div v-if="!loading && hasMoreMovies" class="my-8 text-center">
            <button 
                :disabled="loadingMore"
                class="btn-primary"
                @click="loadNextPage"
            >
                {{ loadingMore ? 'Laden...' : 'Mehr laden' }}
            </button>
        </div>
    
        <!-- No Results -->
        <div v-if="!loading && movies.length === 0" class="py-8 text-center">
            <p class="text-gray-500">Keine Filme gefunden</p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    gridClasses: string;
}>();

const movieStore = useMovieStore();
const { displayMovies, loading, loadingMore, hasMoreMovies } = storeToRefs(movieStore);
const { loadNextPage } = movieStore;

const movies = displayMovies;
</script>
