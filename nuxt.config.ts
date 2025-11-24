import process from 'node:process';

export default defineNuxtConfig({
    ssr: true,

    devtools: { enabled: true },

    app: {
        head: {
            title: 'TheMovieLib',
            meta: [
                { name: 'description', content: 'An application for browsing movies' },
            ],
            htmlAttrs: {
                lang: 'en',
            },
        },
    },  

    compatibilityDate: '2025-07-15',

    css: ['~/assets/css/tailwind.css'],

    dayjs: {
        locales: ['en'],
        defaultLocale: 'en',
    },

    modules: [
        '@nuxt/eslint',
        '@nuxthub/core',
        '@nuxt/image',
        '@nuxt/icon',
        'dayjs-nuxt',
        '@vueuse/nuxt',
        '@nuxtjs/tailwindcss',
        '@nuxt/hints',
    ],

    nitro: {
        experimental: {
            openAPI: true,
        },
    },

    runtimeConfig: {
        tmdbApiKey: process.env.NUXT_TMDB_API_KEY ?? '',
        public: {},
    },

    tailwindcss: {
        configPath: 'tailwind.config.js',
        exposeConfig: true,
    },
});
