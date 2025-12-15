<script setup lang="ts">
const SEARCH_DEBOUNCE_DELAY = 400;

const { searchTerm, setSearchTerm } = useDiscoverFilters();

const localSearchTerm = ref(searchTerm.value);

const isSearchTooShort = computed(() => {
    const trimmed = localSearchTerm.value.trim();
    return trimmed.length > 0 && trimmed.length < MIN_SEARCH_LENGTH;
});

const debouncedUpdate = useDebounceFn(async (newValue: string) => {
    if (
        !newValue
        || newValue.trim().length === 0
        || newValue.trim().length >= MIN_SEARCH_LENGTH
    ) {
        await setSearchTerm(newValue);
    }
}, SEARCH_DEBOUNCE_DELAY);

watch(localSearchTerm, debouncedUpdate);

watch(searchTerm, (newValue) => {
    if (localSearchTerm.value !== newValue) {
        localSearchTerm.value = newValue;
    }
});

const handleClear = async () => {
    localSearchTerm.value = '';
    await setSearchTerm('');
};
</script>

<template>
    <div class="flex flex-col space-y-1">
        <label for="movie-search" class="flex flex-col space-y-1">
            <span>Search</span>
            <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Icon name="ion:search" class="mr-2 text-content" size="20" />
                </span>
                <input
                    id="movie-search"
                    v-model="localSearchTerm"
                    placeholder="Search movie titles..."
                    class="
                        min-h-11 w-full touch-manipulation rounded-md border
                        border-primary bg-white py-2 pr-3 pl-10 text-content
                        transition
                        placeholder:text-primary/60
                        focus:ring-2 focus:ring-primary focus:outline-none
                    "
                    :class="{ 'border-red-500': isSearchTooShort }"
                >
                <button
                    v-if="localSearchTerm"
                    class="
                        absolute inset-y-0 right-0 flex touch-manipulation
                        items-center pr-3
                    "
                    @click="handleClear"
                >
                    <Icon
                        name="ion:close"
                        class="
                            text-content transition-colors
                            hover:text-primary
                        "
                        size="20"
                    />
                </button>
            </div>
        </label>
        <p
            v-if="isSearchTooShort" id="search-error" class="
                text-xs text-red-500
            "
        >
            Please enter at least {{ MIN_SEARCH_LENGTH }} characters
        </p>
    </div>
</template>
