<template>
    <header
        class="sticky top-0 z-20 h-20 bg-surface/80 shadow-xl backdrop-blur-md"
    >
        <div
            class="
                max-w-8xl mx-auto flex size-full w-full items-center
                justify-start px-4
                xs:px-8
                lg:px-16
            "
        >
            <NuxtLink to="/" class="mr-12">
                <span
                    class="
                        bg-linear-to-r from-primary-dark via-primary
                        to-primary-light bg-clip-text text-3xl font-black
                        tracking-wide text-transparent drop-shadow-lg
                    "
                >
                    TheMovieLib
                </span>
            </NuxtLink>
        </div>
    </header>
</template>
