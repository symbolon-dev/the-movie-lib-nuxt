<template>
    <div>
        
        <!-- Detail Hero -->
        <div
            class="relative h-[50vh] w-full overflow-hidden rounded-b-lg bg-cover bg-center md:h-[60vh]"
            :style="{ backgroundImage: movie?.backdrop_path ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` : '' }"
        >
            <div class="absolute inset-0 bg-gradient-to-t from-surface-dark/90 via-surface-dark/20 to-transparent" />
            <div class="container relative z-10 mx-auto flex h-full flex-col justify-end px-4 pb-8 md:pb-12">
                <BackButton class="absolute left-4 top-6 text-white transition-colors hover:text-primary-light md:left-auto" />
                <div class="md:max-w-3xl">
                    <h1 class="font-heading text-3xl font-bold leading-tight text-white md:text-5xl">
                        {{ movie?.title }}
                    </h1>
                </div>
            </div>
        </div>

        <div class=" relative z-20 mx-auto mt-8 pb-16">
            <div class="flex flex-col gap-8 md:flex-row md:items-stretch md:gap-10">
                
                <!-- Movie poster card-->
                <div class="mx-auto w-full max-w-[240px] shrink-0 overflow-hidden rounded-xl border-4 border-surface-dark/60 shadow-2xl md:mx-0 md:max-w-[280px] lg:max-w-[300px]">
                    <NuxtImg
                        :src="movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.png'"
                        :alt="movie?.title"
                        class="size-full object-cover"
                        format="webp"
                    />
                </div>

                <!-- Movie details card -->
                <div class="flex w-full flex-col rounded-2xl border border-surface-light/10 bg-surface-dark/95 p-8 shadow-2xl backdrop-blur-lg md:p-10">
                    <div class="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-surface-light/10 pb-6">
                        <span v-if="movie?.release_date" class="flex items-center gap-2 text-sm font-medium text-content-light/90">
                            <div class="flex size-8 items-center justify-center rounded-full bg-primary/10">
                                <Icon name="ion:calendar-clear-outline" size="16" class="text-primary" />
                            </div>
                            <span>{{ $dayjs(movie?.release_date).format('D. MMMM YYYY') }}</span>
                        </span>

                        <span v-if="movie?.runtime" class="flex items-center gap-2 text-sm font-medium text-content-light/90">
                            <div class="flex size-8 items-center justify-center rounded-full bg-primary/10">
                                <Icon name="ion:time-outline" size="16" class="text-primary" />
                            </div>
                            <span>{{ convertMinutesToHoursAndMinutes(movie?.runtime) }}</span>
                        </span>
                        
                        <span v-if="movie?.vote_average && movie.vote_average > 0" class="flex items-center gap-2 text-sm font-medium">
                            <div class="flex size-8 items-center justify-center rounded-full bg-yellow-400/20">
                                <Icon name="ion:star" class="text-yellow-500" size="16" />
                            </div>
                            <span class="font-bold text-content-light/90">{{ movie?.vote_average.toFixed(1) }}/10</span>
                        </span>
                    </div>

                    <div class="border-b border-surface-light/10 py-6">
                        <h3 class="mb-3 text-sm font-semibold uppercase tracking-wider text-content-light/70">Genres</h3>
                        <div class="flex flex-wrap gap-2">
                            <span
                                v-for="genre in movie?.genres"
                                :key="genre.id"
                                class="badge-primary"
                            >
                                {{ genres.find((g: { id: number; name: string }) => g.id === genre.id)?.name ?? 'Unknown' }}
                            </span>
                        </div>
                    </div>

                    <div class="flex-1 py-6">
                        <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider text-content-light/70">Overview</h3>
                        <p v-if="movie?.overview" class="max-w-none text-base leading-relaxed text-content-light/90">
                            {{ movie?.overview }}
                        </p>
                        <p v-else class="text-base italic text-content-light/60">
                            No description available.
                        </p>
                    </div>
                    
                    <!-- Tagline -->
                    <div v-if="movie?.tagline" class="border-t border-surface-light/10 pt-4">
                        <blockquote class="relative">
                            <div class="absolute -left-2 -top-1 font-serif text-3xl text-primary/30">"</div>
                            <p class="pl-4 text-lg font-medium italic text-primary-light/90">
                                {{ movie?.tagline }}
                            </p>
                            <div class="absolute -bottom-3 -right-1 font-serif text-3xl text-primary/30">"</div>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Movie } from '~/stores/movieStore';

const route = useRoute();
const movieStore = useMovieStore();
const { genres } = storeToRefs(movieStore);

const movieId = route.params.id as string;

const movie = ref<Movie | null>(null);

try {
    movie.value = await $fetch<Movie>(`/api/movies/details/${movieId}`);
} catch {
    throw createError({ statusCode: 404, statusMessage: 'Movie not found' });
}

const convertMinutesToHoursAndMinutes = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
};

// SEO Meta Tags
useSeoMeta({
    title: () => movie.value ? `${movie.value.title} - The Movie Lib` : 'Movie Details - The Movie Lib',
    description: () => movie.value?.overview?.substring(0, 160) || 'Discover movies and get detailed information about your favorite films.',
    ogTitle: () => movie.value?.title || 'Movie Details',
    ogDescription: () => movie.value?.overview?.substring(0, 160) || 'Discover movies and get detailed information about your favorite films.',
    ogImage: () => movie.value?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.value.poster_path}` : undefined,
    ogType: 'video.movie',
    twitterCard: 'summary_large_image',
    twitterTitle: () => movie.value?.title || 'Movie Details',
    twitterDescription: () => movie.value?.overview?.substring(0, 160) || 'Discover movies and get detailed information about your favorite films.',
    twitterImage: () => movie.value?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.value.poster_path}` : undefined,
});
</script>
