<script setup lang="ts">
import type { Movie } from '~/types/movie';

const MAX_DESCRIPTION_LENGTH = 160;

const route = useRoute();
const movieId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

const { data: movie, error } = await useFetch<Movie>(
    () => `/api/movies/details/${movieId}`,
    {
        key: `movie-${movieId}`,
    },
);

if (error.value || !movie.value) {
    throw createError({ statusCode: 404, statusMessage: 'Movie not found' });
}

const posterUrl = computed(() => getTmdbImageUrl(movie.value?.poster_path));
const backdropUrl = computed(() => getTmdbImageUrl(movie.value?.backdrop_path, 'original'));

const defaultDescription = 'Discover movies and get detailed information about your favorite films.';

const getDescription = (): string => {
    const overview = movie.value?.overview;
    if (overview) {
        return overview.substring(0, MAX_DESCRIPTION_LENGTH);
    }
    return defaultDescription;
};

useSeoMeta({
    title: () => movie.value ? `${movie.value.title} - The Movie Lib` : 'Movie Details - The Movie Lib',
    description: getDescription,
    ogTitle: () => movie.value?.title || 'Movie Details',
    ogDescription: getDescription,
    ogImage: () => posterUrl.value,
    ogType: 'video.movie',
    twitterCard: 'summary_large_image',
    twitterTitle: () => movie.value?.title || 'Movie Details',
    twitterDescription: getDescription,
    twitterImage: () => posterUrl.value,
});
</script>

<template>
    <div>
        <div
            class="relative h-[50vh] w-full overflow-hidden rounded-b-lg bg-cover bg-center"
            :style="{ backgroundImage: backdropUrl ? `url(${backdropUrl})` : '' }"
        >
            <div class="absolute inset-0 bg-gradient-to-t from-black/75 from-30%" />
            <div class="container relative z-10 mx-auto flex h-full flex-col justify-end px-4 pb-8 md:pb-12">
                <BackButton class="absolute left-4 top-6 text-white transition-colors hover:text-primary-light md:left-auto" />
                <div class="md:max-w-3xl">
                    <h1 class="font-heading text-4xl font-bold leading-tight text-white md:text-6xl">
                        {{ movie?.title }}
                    </h1>
                </div>
            </div>
        </div>

        <div class=" relative z-20 mx-auto mt-8 pb-16">
            <div class="flex flex-col gap-8 md:flex-row md:items-stretch md:gap-10">
                <div class="mx-auto w-full max-w-[240px] shrink-0 overflow-hidden rounded-xl border-4 border-surface-dark/60 shadow-2xl md:mx-0 md:max-w-[280px] lg:max-w-[300px]">
                    <NuxtImg
                        :src="posterUrl ?? '/placeholder.png'"
                        :alt="movie?.title"
                        class="size-full object-cover"
                        format="webp"
                    />
                </div>

                <div class="flex w-full flex-col rounded-2xl border border-surface-light/10 p-8 shadow-2xl backdrop-blur-lg md:p-10">
                    <div class="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-surface-light/10 pb-6">
                        <span v-if="movie?.release_date" class="flex items-center gap-2 text-sm font-medium text-content-dark/90">
                            <div class="flex size-8 items-center justify-center rounded-full bg-primary/10">
                                <Icon name="ion:calendar-clear-outline" size="16" class="text-primary" />
                            </div>
                            <span>{{ $dayjs(movie?.release_date).format('D. MMMM YYYY') }}</span>
                        </span>

                        <span v-if="movie?.runtime" class="flex items-center gap-2 text-sm font-medium text-content-dark/90">
                            <div class="flex size-8 items-center justify-center rounded-full bg-primary/10">
                                <Icon name="ion:time-outline" size="16" class="text-primary" />
                            </div>
                            <span>{{ convertMinutesToHoursAndMinutes(movie?.runtime) }}</span>
                        </span>

                        <span v-if="movie?.vote_average && movie.vote_average > 0" class="flex items-center gap-2 text-sm font-medium">
                            <div class="flex size-8 items-center justify-center rounded-full bg-primary/10">
                                <Icon name="ion:star" class="text-primary" size="16" />
                            </div>
                            <span class="font-bold text-content-dark/90">{{ movie?.vote_average?.toFixed(1) ?? 'N/A' }}/10</span>
                        </span>
                    </div>

                    <div class="border-b border-surface-light/10 py-6">
                        <h2 class="mb-3 text-sm font-semibold uppercase tracking-wider text-content-dark/90">
                            Genres
                        </h2>
                        <div class="flex flex-wrap gap-2">
                            <span
                                v-for="genre in movie?.genres"
                                :key="genre.id"
                                class="badge-primary"
                            >
                                {{ genre.name }}
                            </span>
                        </div>
                    </div>

                    <div class="flex-1 py-6">
                        <h2 class="mb-4 text-sm font-semibold uppercase tracking-wider text-content-dark/90">
                            Overview
                        </h2>
                        <p v-if="movie?.overview" class="max-w-none text-base leading-relaxed text-content-dark/90">
                            {{ movie?.overview }}
                        </p>
                        <p v-else class="text-base italic text-content-light/60">
                            No description available.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
