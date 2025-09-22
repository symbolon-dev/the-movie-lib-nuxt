<template>
    <NuxtLink
        :to="`/movies/${movie.id}`"
        class="group block h-full touch-manipulation overflow-hidden rounded-lg bg-surface/80 shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-95"
    >
        <div class="aspect-[2/3] w-full">
            <NuxtImg
                v-if="movie.poster_path"
                :src="`https://image.tmdb.org/t/p/w185${movie.poster_path}`"
                :alt="movie.title"
                class="size-full object-cover"
                :loading="isLazy ? 'lazy' : 'eager'"
                :fetchpriority="index < 4 ? 'high' : undefined"
                :preload="!isLazy"
                format="webp"
                sizes="185px"
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
    index?: number;
}>();
</script>
