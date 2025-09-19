<template>
    <button 
        :class="{
            'btn cursor-pointer bg-primary-dark !text-content-light hover:bg-primary-dark/80': !isDiscoverPage,
            'btn-secondary cursor-pointer': isDiscoverPage,
        }"
        @click="router.back()"
    >
        <Icon 
            name="ion:arrow-back"
            size="16"
        />
        <span>
            Back
        </span>
    </button>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const isDiscoverPage = computed(() => route.fullPath.includes('/discover'));
</script>
