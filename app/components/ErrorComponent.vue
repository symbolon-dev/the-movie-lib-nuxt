<script setup lang="ts">
const props = defineProps<{
    title?: string;
    message: string;
    showRetry?: boolean;
}>();

defineEmits<{
    retry: [];
}>();
</script>

<template>
    <div class="mx-auto max-w-md rounded-lg bg-red-50 p-4 text-center">
        <div class="flex items-center justify-center">
            <svg
                class="size-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        </div>
        <h3 class="mt-2 text-lg font-medium text-red-900">
            {{ props.title ?? 'An error occurred' }}
        </h3>
        <p class="mt-2 text-sm text-red-700">
            {{ props.message }}
        </p>
        <button
            v-if="props.showRetry ?? true"
            type="button"
            class="mt-4 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            @click="$emit('retry')"
        >
            Try again
        </button>
    </div>
</template>
