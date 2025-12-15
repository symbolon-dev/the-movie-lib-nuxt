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
    const current = sortVariants.find(
        sort => sort.value === selectedSort.value,
    );
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

<template>
    <div class="flex flex-col space-y-1">
        <span id="sort-label">Sort</span>
        <div ref="dropdownRef" class="relative">
            <button
                ref="buttonRef"
                class="border-primary-light text-content focus:ring-primary flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 py-2 transition focus:ring-2 focus:outline-none"
                @click="isOpen = !isOpen"
            >
                <span>{{ currentSortLabel }}</span>
                <Icon
                    name="ion:chevron-down"
                    :class="{ 'rotate-180': isOpen }"
                    class="transition-transform duration-200"
                    size="18"
                />
            </button>

            <div
                v-show="isOpen"
                id="sort-listbox"
                class="border-primary absolute z-20 mt-1 w-full rounded-md border bg-white shadow-lg"
            >
                <div class="max-h-60 overflow-y-auto">
                    <button
                        v-for="sort in sortVariants"
                        :key="sort.value"
                        class="hover:bg-primary/40 flex w-full items-center px-3 py-2 text-left"
                        :class="{
                            'bg-primary/10 font-semibold': selectedSort === sort.value,
                        }"
                        @click="selectOption(sort)"
                    >
                        {{ sort.label }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
