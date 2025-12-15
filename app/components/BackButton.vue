<script setup lang="ts">
import { isNavigationFailure, NavigationFailureType } from 'vue-router';

const router = useRouter();
const route = useRoute();

const isDiscoverPage = computed(() => route.name === 'discover');

const handleBack = async () => {
    try {
        if (isDiscoverPage.value) {
            return await router.push('/');
        }
        router.back();
    }
    catch (err: unknown) {
        if (!isNavigationFailure(err, NavigationFailureType.duplicated)) {
            console.error('Navigation error:', err);
        }
    }
};
</script>

<template>
    <button
        class="
            btn cursor-pointer bg-primary-dark !text-content-light/80
            hover:bg-primary-dark/80
        "
        @click="handleBack"
    >
        <Icon name="ion:arrow-back" size="16" />
        <span> Back </span>
    </button>
</template>
