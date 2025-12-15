<script setup lang="ts">
const SCROLL_THRESHOLD = 200;

const { y } = useWindowScroll();

const visible = computed(() => y.value > SCROLL_THRESHOLD);

const scrollToTop = () => {
    if (import.meta.client) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};
</script>

<template>
    <button
        v-show="visible"
        class="bg-primary hover:bg-primary-dark focus:ring-primary-light fixed right-6 bottom-6 z-50 flex items-center justify-center rounded-full p-4 text-white shadow-lg transition-all focus:ring-2 focus:outline-none"
        @click="scrollToTop"
    >
        <Icon name="ion:arrow-up-circle" size="24" class="text-white" />
    </button>
</template>
