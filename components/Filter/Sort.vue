<template>
    <div class="flex flex-col space-y-1">
        <label>Sortierung</label>
        <div ref="dropdownRef" class="relative">
            <button
                type="button"
                class="flex h-10 w-full items-center justify-between rounded-md border border-primary-light bg-white px-3 py-2 text-content transition focus:outline-none focus:ring-2 focus:ring-primary"
                @click="isOpen = !isOpen"
            >
                <span>{{ currentSortLabel }}</span>
                <Icon
                    name="heroicons:chevron-down"
                    :class="{ 'rotate-180': isOpen }"
                    class="ransition-transform duration-200"
                    size="18"
                />
            </button>

            <div
                v-show="isOpen"
                class="absolute z-20 mt-1 w-full rounded-md border border-primary bg-white shadow-lg"
            >
                <div class="max-h-60 overflow-y-auto">
                    <button
                        v-for="sort in sortVariants"
                        :key="sort.value"
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
const movieStore = useMovieStore();
const { selectedSort } = storeToRefs(movieStore);

const dropdownRef = ref<HTMLElement | undefined>(undefined);
const isOpen = ref(false);

const sortVariants = [
    { label: '↓ Popularität', value: 'popularity.desc' },   
    { label: '↑ Popularität', value: 'popularity.asc' },
    { label: '↓ Titel', value: 'original_title.desc' },
    { label: '↑ Titel', value: 'original_title.asc' },
    { label: '↓ Erscheinungsdatum', value: 'primary_release_date.desc' },
    { label: '↑ Erscheinungsdatum', value: 'primary_release_date.asc' },
    { label: '↓ Bewertung', value: 'vote_average.desc' }, 
    { label: '↑ Bewertung', value: 'vote_average.asc' },
    { label: '↓ Anzahl Bewertungen', value: 'vote_count.desc' }, 
    { label: '↑ Anzahl Bewertungen', value: 'vote_count.asc' },
    { label: '↓ Umsatz', value: 'revenue.desc' },
    { label: '↑ Umsatz', value: 'revenue.asc' },
];

const currentSortLabel = computed(() => {
    const current = sortVariants.find(sort => sort.value === selectedSort.value);
    return current ? current.label : sortVariants[0].label;
});

const selectOption = (sort: { value: string }) => {
    selectedSort.value = sort.value;
    isOpen.value = false;
};

onClickOutside(dropdownRef, () => {
    isOpen.value = false;
});
</script>
