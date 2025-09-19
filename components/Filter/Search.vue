<template>
    <div class="flex flex-col space-y-1">
        <label>Search</label>
        <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <Icon 
                    name="ion:search"
                    class="mr-2 text-content"
                    size="20"
                />
            </span>
            <input
                v-model="localSearchTerm"
                type="text"
                placeholder="Search movie titles..."
                class="h-10 w-full rounded-md border border-primary bg-white py-2 pl-10 pr-3 text-content transition placeholder:text-primary/60 focus:outline-none focus:ring-2 focus:ring-primary"
                :class="{ 'border-red-500': isSearchTooShort }"
            >
            <span class="absolute inset-y-0 right-0 flex items-center pr-3">
                <Icon
                    v-if="localSearchTerm"
                    name="ion:close" 
                    class="cursor-pointer text-content"
                    size="20"
                    @click="localSearchTerm = ''; searchTerm = ''"
                />
            </span>
        </div>
        <p v-if="isSearchTooShort" class="text-xs text-red-500">
            Please enter at least {{ MIN_SEARCH_LENGTH }} characters
        </p>
    </div>
</template>

<script setup lang="ts">
const MIN_SEARCH_LENGTH = 2;
const SEARCH_DEBOUNCE_DELAY = 400;

const filterStore = useFilterStore();
const { searchTerm } = storeToRefs(filterStore);

const localSearchTerm = ref(searchTerm.value);
const isSearchTooShort = computed(() => localSearchTerm.value && localSearchTerm.value.trim().length === 1);

let searchTimeout: ReturnType<typeof setTimeout> | undefined = undefined;
watch(localSearchTerm, (newValue) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        if (!newValue || newValue.trim().length === 0 || newValue.trim().length >= MIN_SEARCH_LENGTH) {
            searchTerm.value = newValue;
        }
    }, SEARCH_DEBOUNCE_DELAY);
});

watch(searchTerm, (newValue) => {
    if (newValue !== localSearchTerm.value) {
        localSearchTerm.value = newValue;
    }
});

onUnmounted(() => {
    clearTimeout(searchTimeout);
});
</script>
