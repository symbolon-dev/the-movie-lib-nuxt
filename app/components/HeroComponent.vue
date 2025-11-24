<template>
    <div class="flex h-64 w-full flex-col items-center justify-center rounded-md bg-primary/20 px-4 sm:h-80 sm:px-6 md:h-96">
        <h1 class="heading-1 mb-2 text-center text-2xl sm:text-3xl md:text-4xl">
            Discover Movies
        </h1>

        <p class="heading-5 mb-6 max-w-xs text-center text-sm text-primary/80 sm:mb-8 sm:max-w-md sm:text-base md:mb-10 md:max-w-xl">
            Browse thousands of movies, filter by genre and find your next favorite film
        </p>

        <NuxtLink
            to="/discover"
            class="btn btn-primary text-sm sm:text-base"
        >
            <Icon 
                name="ion:compass"
                class="mr-2"
                size="18" 
            />
            <span>
                Discover now
            </span>
        </NuxtLink>
    </div>
</template>
