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
                lang: 'de',
            },
        },
    },  

    compatibilityDate: '2025-05-15',

    dayjs: {
        locales: ['de'],
        defaultLocale: 'de',
    },

    modules: [
        '@nuxt/eslint',
        '@nuxthub/core',
        '@nuxt/image',
        '@nuxt/icon',
        'dayjs-nuxt',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        '@vueuse/nuxt',
        '@nuxtjs/tailwindcss',
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
        configPath: 'tailwind.config',
        exposeConfig: true,
    },
});
