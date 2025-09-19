<script setup>
if (process.env.NODE_ENV === 'production') {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
    });
}
</script>

<template>
    <div class="py-8">
        <h1 class="heading-2 mb-8">Styleguide</h1>

        <section class="mb-10">
            <h2 class="heading-4 mb-2">Colour</h2>
            <div class="flex flex-wrap gap-4">
                <div class="flex flex-col items-center">
                    <div class="size-16 rounded-lg border border-gray-500 bg-primary" />
                    <span class="mt-2 text-xs">primary</span>
                </div>
                <div class="flex flex-col items-center">
                    <div class="size-16 rounded-lg border border-gray-500 bg-primary-dark" />
                    <span class="mt-2 text-xs">primary-dark</span>
                </div>
                <div class="flex flex-col items-center">
                    <div class="size-16 rounded-lg border border-gray-500 bg-primary-light" />
                    <span class="mt-2 text-xs">primary-light</span>
                </div>
                <div class="flex flex-col items-center">
                    <div class="size-16 rounded-lg border border-gray-500 bg-surface" />
                    <span class="mt-2 text-xs">surface</span>
                </div>
                <div class="flex flex-col items-center">
                    <div class="size-16 rounded-lg border border-gray-500 bg-surface-dark" />
                    <span class="mt-2 text-xs">surface-dark</span>
                </div>
                <div class="flex flex-col items-center">
                    <div class="size-16 rounded-lg border border-gray-500 bg-surface-light" />
                    <span class="mt-2 text-xs">surface-light</span>
                </div>
                <div class="flex flex-col items-center">
                    <div class="size-16 rounded-lg border border-gray-500 bg-content" />
                    <span class="mt-2 text-xs">content</span>
                </div>
                <div class="flex flex-col items-center">
                    <div class="size-16 rounded-lg border border-gray-500 bg-content-dark" />
                    <span class="mt-2 text-xs">content-dark</span>
                </div>
                <div class="flex flex-col items-center">
                    <div class="size-16 rounded-lg border border-gray-500 bg-content-light" />
                    <span class="mt-2 text-xs">content-light</span>
                </div>
            </div>
        </section>

        <section class="mb-10">
            <h2 class="heading-4 mb-2">Typography</h2>
            <div class="space-y-2">
                <h1 class="heading-1">Heading 1 (h1)</h1>
                <h2 class="heading-2">Heading 2 (h2)</h2>
                <h3 class="heading-3">Heading 3 (h3)</h3>
                <h4 class="heading-4">Heading 4 (h4)</h4>
                <h5 class="heading-5">Heading 5 (h5)</h5>
                <h6 class="heading-6">Heading 6 (h6)</h6>
                <p>Paragraph</p>
                <label>Label</label>
            </div>
        </section>

        <section class="mb-10">
            <h2 class="heading-4 mb-2">Buttons</h2>
            <div class="flex flex-wrap items-center gap-4">
                <button class="btn btn-primary">Primary</button>
                <button class="btn btn-secondary">Secondary</button>
                <button class="btn btn-tertiary">Tertiary</button>
            </div>
        </section>

        <section class="mb-10">
            <h2 class="heading-4 mb-2">Navigation Links</h2>
            <div class="flex flex-wrap items-center gap-4">
                <NuxtLink to="/" class="btn-primary cursor-pointer">Active</NuxtLink>
                <NuxtLink to="/" class="btn hover:btn-primary cursor-pointer">Standard</NuxtLink>
                <NuxtLink to="/" class="btn-secondary cursor-pointer"><Icon name="ion:compass" class="mr-1" />Discover</NuxtLink>
            </div>
        </section>

        <section class="mb-10">
            <h2 class="heading-4 mb-2">Input</h2>
            <div class="max-w-xs"><Search /></div>
        </section>
    
        <section class="mb-10">
            <h2 class="heading-4 mb-2">Dropdown</h2>
            <div class="max-w-xs"><Sort /></div>
        </section>
    
        <section class="mb-10">
            <h2 class="heading-4 mb-2">Badges</h2>
            <div class="flex flex-wrap items-center gap-2">
                <span class="badge-primary cursor-pointer">Action</span>
                <span class="badge-secondary cursor-pointer ">Action</span>
                <div class="inline-flex items-center space-x-0.5 rounded-full bg-gradient-to-r from-primary-dark via-primary to-primary-light px-2 py-0.5 tracking-wide drop-shadow-lg"><Icon name="ion:star" class="text-content-light" size="12" /><span class="text-sm font-medium text-content-light">8.7</span></div>
            </div>
        </section>

        <section class="mb-10">
            <h2 class="heading-4 mb-2">MovieCard</h2>
            <div class="max-w-xs">
                <MovieCard :movie="{ id: 1, title: 'Example Movie', release_date: '2024-01-01', poster_path: null, genre_ids: [1,2], vote_average: 8.7 }" :genres="[{ id:1, name:'Action' },{ id:2, name:'Drama' }]" :index="0" />
            </div>
        </section>

        <section class="mb-10">
            <h2 class="heading-4 mb-2">Skeleton Loading</h2>
            <div class="max-w-xs animate-pulse">
                <MovieSkeleton />
            </div>
        </section>

        <section class="mb-10">
            <h2 class="heading-4 mb-2">Section Header</h2>
            <div class="my-8 flex flex-row items-center">
                <div class="mr-4 flex size-12 items-center justify-center rounded-md bg-primary-light/60">
                    <Icon class="text-primary" name="ion:star" size="28" />
                </div>
                <div>
                    <h1 class="heading-2">Title Example</h1>
                    <p class="text-content/70">This is a Subtitle</p>
                </div>
            </div>
        </section>
    </div>
</template>
