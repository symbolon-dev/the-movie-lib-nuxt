import process from 'node:process';
import tailwindcss from '@tailwindcss/vite';

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
        '@nuxthub/core',
        '@nuxt/image',
        '@nuxt/icon',
        'dayjs-nuxt',
        '@vueuse/nuxt',
        '@nuxt/hints',
        '@nuxt/eslint',
    ],

    eslint: {
        config: {
            standalone: false,
        },
    },

    nitro: {
        experimental: {
            openAPI: true,
        },
    },

    runtimeConfig: {
        tmdbApiKey: process.env.NUXT_TMDB_API_KEY ?? '',
        public: {},
    },

    vite: {
        plugins: [tailwindcss()],
        build: {
            sourcemap: false,
        },
    },
});
