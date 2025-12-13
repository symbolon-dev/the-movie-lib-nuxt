<script setup lang="ts">
const error = useError();

const errorCode = computed(() => error.value?.statusCode ?? 'Unknown');
const errorMessage = computed(() => error.value?.message ?? 'An unexpected error occurred.');
</script>

<template>
    <div class="flex min-h-screen flex-col items-center justify-center">
        <h1 class="heading-1 mb-2">
            Error {{ errorCode }}
        </h1>
        <p class="mb-8 max-w-xl text-center ">
            {{ errorMessage }}
        </p>
        <button
            type="button"
            class="btn btn-primary"
            @click="clearError({ redirect: '/' })"
        >
            Back to homepage
        </button>
    </div>
</template>
