<template>
    <NuxtLink
        :to="`/movies/${props.movie.id}`"
        class="group block h-full touch-manipulation overflow-hidden rounded-lg bg-surface/80 shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-95"
    >
        <div class="aspect-[2/3] w-full">
            <NuxtImg
                v-if="posterUrl"
                :src="posterUrl"
                :alt="props.movie.title"
                class="size-full object-cover"
                :loading="(props.isLazy ?? false) ? 'lazy' : 'eager'"
                :fetchpriority="props.index !== undefined && props.index < 4 ? 'high' : undefined"
                :preload="!(props.isLazy ?? false)"
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
import type { Movie } from '~/types/movie';
import { getTmdbImageUrl } from '~/utils/images';

const props = defineProps<{
    movie: Movie;
    isLazy?: boolean;
    index?: number;
}>();

const posterUrl = computed(() => getTmdbImageUrl(props.movie.poster_path));
</script>
