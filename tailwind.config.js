module.exports = {
    content: [
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.{vue,js,ts}',
        './pages/**/*.{vue,js,ts}',
        './composables/**/*.{js,ts}',
        './plugins/**/*.{js,ts}',
        './utils/**/*.{js,ts}',
        './app.vue',
        './error.vue',
    ],
    theme: {
        extend: {
            screens: {
                'xs': '475px',
            },
            maxWidth: {
                '8xl': '96rem',
            },
            colors: {
                primary: {
                    DEFAULT: '#588157',
                    dark: '#3a5a40',
                    light: '#a3b18a',
                },
                surface: {
                    DEFAULT: '#fff',
                    dark: '#344e41',
                    light: '#dad7cd',
                },
                content: {
                    DEFAULT: '#18181b',
                    dark: '#2d3e34',
                    light: '#f0f0f0',
                },
            },
            fontFamily: {
                heading: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
                body: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
            },
        },
    },
};
