<script setup lang="ts">
import type { MovieListType } from '~/types/movie';

const props = defineProps<{
    current: MovieListType;
}>();

defineEmits<{
    change: [segment: MovieListType];
}>();

const MOVIE_CATEGORIES = [
    { key: 'now_playing', label: 'Now Playing' },
    { key: 'popular', label: 'Popular' },
    { key: 'top_rated', label: 'Top Rated' },
    { key: 'upcoming', label: 'Upcoming' },
] as const;

const movieCategories = MOVIE_CATEGORIES;

const buttons = ref<HTMLElement[]>([]);
const indicatorStyle = ref('');
const containerRef = ref<HTMLElement>();

function updateIndicator() {
    const activeIndex = movieCategories.findIndex(c => c.key === props.current);
    const activeButton = buttons.value[activeIndex];

    if (activeButton) {
        const { offsetLeft, offsetWidth } = activeButton;
        indicatorStyle.value = `left: ${offsetLeft}px; width: ${offsetWidth}px;`;
    }
}

watch(() => props.current, updateIndicator);

useResizeObserver(containerRef, updateIndicator);

onMounted(async () => {
    await nextTick(updateIndicator);
});
</script>

<template>
    <div ref="containerRef" class="relative flex w-full overflow-x-auto rounded-full bg-surface/80 shadow-md backdrop-blur-md md:w-max">
        <div
            class="absolute left-0 top-0 z-0 h-full rounded-full bg-primary/90 transition-all duration-300 ease-out"
            :style="indicatorStyle"
        />

        <button
            v-for="category in movieCategories"
            :key="category.key"
            ref="buttons"
            type="button"
            class="relative z-10 flex-1 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-200 focus:outline-none sm:px-4 sm:py-2 sm:text-sm md:px-5"
            :class="props.current === category.key
                ? 'text-content-light'
                : 'text-primary hover:text-primary-dark'"
            @click="$emit('change', category.key)"
        >
            {{ category.label }}
        </button>
    </div>
</template>

<style scoped>
button:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
}
</style>
