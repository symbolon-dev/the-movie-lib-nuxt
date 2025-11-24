<template>
    <div class="flex flex-col space-y-1">
        <label id="sort-label">Sort</label>
        <div ref="dropdownRef" class="relative">
            <button
                ref="buttonRef"
                type="button"
                aria-labelledby="sort-label"
                aria-haspopup="listbox"
                :aria-expanded="isOpen"
                :aria-controls="isOpen ? 'sort-listbox' : undefined"
                class="flex h-10 w-full items-center justify-between rounded-md border border-primary-light bg-white px-3 py-2 text-content transition focus:outline-none focus:ring-2 focus:ring-primary"
                @click="isOpen = !isOpen"
            >
                <span>{{ currentSortLabel }}</span>
                <Icon
                    name="ion:chevron-down"
                    :class="{ 'rotate-180': isOpen }"
                    class="transition-transform duration-200"
                    size="18"
                    aria-hidden="true"
                />
            </button>

            <div
                v-show="isOpen"
                id="sort-listbox"
                role="listbox"
                aria-labelledby="sort-label"
                class="absolute z-20 mt-1 w-full rounded-md border border-primary bg-white shadow-lg"
            >
                <div class="max-h-60 overflow-y-auto">
                    <button
                        v-for="sort in sortVariants"
                        :key="sort.value"
                        type="button"
                        role="option"
                        :aria-selected="selectedSort === sort.value"
                        class="flex w-full items-center px-3 py-2 text-left hover:bg-primary/40"
                        :class="{ 'bg-primary/10 font-semibold': selectedSort === sort.value }"
                        @click="selectOption(sort)"
                    >
                        {{ sort.label }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { selectedSort, setSelectedSort } = useDiscoverFilters();

const dropdownRef = ref<HTMLElement | undefined>(undefined);
const buttonRef = ref<HTMLButtonElement | undefined>(undefined);
const isOpen = ref(false);

const sortVariants = [
    { label: '↓ Popularity', value: 'popularity.desc' },
    { label: '↑ Popularity', value: 'popularity.asc' },
    { label: '↓ Title', value: 'original_title.desc' },
    { label: '↑ Title', value: 'original_title.asc' },
    { label: '↓ Release Date', value: 'primary_release_date.desc' },
    { label: '↑ Release Date', value: 'primary_release_date.asc' },
    { label: '↓ Rating', value: 'vote_average.desc' },
    { label: '↑ Rating', value: 'vote_average.asc' },
    { label: '↓ Vote Count', value: 'vote_count.desc' },
    { label: '↑ Vote Count', value: 'vote_count.asc' },
    { label: '↓ Revenue', value: 'revenue.desc' },
    { label: '↑ Revenue', value: 'revenue.asc' },
];

const currentSortLabel = computed(() => {
    const current = sortVariants.find(sort => sort.value === selectedSort.value);
    return (current ?? sortVariants[0])!.label;
});

const selectOption = async (sort: { value: string }) => {
    await setSelectedSort(sort.value);
    isOpen.value = false;
    await nextTick(() => buttonRef.value?.focus());
};

onClickOutside(dropdownRef, () => {
    isOpen.value = false;
});
</script>
