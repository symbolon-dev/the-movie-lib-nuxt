<script lang="ts" setup>
const { data: genresData } = useGenres();
const { selectedGenres, setSelectedGenres } = useDiscoverFilters();

const genres = computed(() => genresData.value?.genres ?? []);

const handleGenreToggle = async (genreId: number) => {
    const newGenres = selectedGenres.value.includes(genreId)
        ? selectedGenres.value.filter(id => id !== genreId)
        : [...selectedGenres.value, genreId];
    await setSelectedGenres(newGenres);
};
</script>

<template>
    <fieldset class="flex flex-col space-y-1">
        <legend class="text-base">
            Genres
        </legend>

        <div class="flex flex-wrap gap-2">
            <button
                v-for="genre in genres"
                :key="genre.id"
                class="cursor-pointer"
                :class="{
                    'badge-primary': selectedGenres.includes(genre.id),
                    'badge-secondary': !selectedGenres.includes(genre.id),
                }"
                @click="handleGenreToggle(genre.id)"
            >
                <span class="text-sm font-medium">{{ genre.name }}</span>
            </button>
        </div>
    </fieldset>
</template>
