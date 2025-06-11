<template>
    <div class="flex flex-col space-y-1">
        <label>
            Genres
        </label>

        <div class="flex flex-wrap gap-2">
            <div
                v-for="genre in genres"
                :key="genre.id"
                class="cursor-pointer"
                :class="{
                    'badge-primary': selectedGenres.includes(genre.id),
                    'badge-secondary': !selectedGenres.includes(genre.id)
                }"
                @click="handleGenreToggle(genre.id)"
            >
                <span class="text-sm font-medium">{{ genre.name }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const movieStore = useMovieStore();
const { getGenres } = movieStore;
const { genres, selectedGenres } = storeToRefs(movieStore);

const handleGenreToggle = (genreId: number) => {
    selectedGenres.value = 
        selectedGenres.value.includes(genreId) 
            ? selectedGenres.value.filter((id: number) => id !== genreId)
            : [...selectedGenres.value, genreId];
};

if (genres.value.length === 0) {
    await getGenres();
}
</script>
