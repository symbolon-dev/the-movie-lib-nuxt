<script setup lang="ts">
const props = defineProps<{
    isLoading: boolean;
    hasMore: boolean;
    loadingText?: string;
    loadMoreText?: string;
    noMoreText?: string;
}>();

defineEmits<{
    loadMore: [];
}>();

const isDisabled = computed(() => props.isLoading || !props.hasMore);

const buttonText = computed(() => {
    if (props.isLoading) {
        return props.loadingText ?? 'Loading…';
    }
    if (props.hasMore) {
        return props.loadMoreText ?? 'Load more';
    }
    return props.noMoreText ?? 'No more movies';
});
</script>

<template>
    <button
        class="btn btn-secondary flex items-center gap-2 disabled:cursor-not-allowed"
        :disabled="isDisabled"
        @click="$emit('loadMore')"
    >
        <span v-if="props.isLoading" class="loading loading-spinner loading-sm" />
        <span>{{ buttonText }}</span>
    </button>
</template>
