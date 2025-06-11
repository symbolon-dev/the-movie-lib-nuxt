<template>
    <button
        v-show="visible"
        class="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full bg-primary p-4 text-white shadow-lg transition-all hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light"
        aria-label="Nach oben scrollen"
        @click="scrollToTop"
    >
        <Icon 
            name="ion:arrow-up-circle"
            size="24"
            class="text-white"
        />
    </button>
</template>

<script setup lang="ts">
const { y } = useWindowScroll();

const visible = computed(() => y.value > 200);

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>
