<template>
    <NuxtLink 
        :to="`/movies/${movie.id}`"
        class="group block h-full overflow-hidden rounded-lg bg-surface/80 shadow-lg transition-transform hover:scale-105"
    >
        <div class="aspect-[2/3] w-full">
            <NuxtImg
                v-if="movie.poster_path"
                :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`"
                :alt="movie.title"
                class="size-full object-cover"
                :loading="isLazy ? 'lazy' : undefined"
                format="webp"
            />
            <div 
                v-else 
                class="flex h-full items-center justify-center bg-gray-100 text-gray-400"
            >
                <span>No Image</span>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
    movie: Movie;
    isLazy?: boolean;
}>();
</script>
