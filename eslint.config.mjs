import antfu from '@antfu/eslint-config';
import tailwind from 'eslint-plugin-better-tailwindcss';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
    antfu(
        {
            vue: {
                a11y: true,
            },
            typescript: {
                tsconfigPath: './tsconfig.json',
            },
            stylistic: {
                indent: 4,
                quotes: 'single',
                semi: true,
            },
            formatters: true,
        },
        {
            name: 'project-strict',
            rules: {
                // Prefer functional programming methods over loops
                'no-restricted-syntax': [
                    'error',
                    { selector: 'ForStatement', message: 'Use map/filter/reduce instead.' },
                    { selector: 'ForInStatement', message: 'Use Object.keys()/values()/entries() and functional methods.' },
                    { selector: 'ForOfStatement', message: 'Use map/filter/reduce instead of for..of loops.' },
                ],
                'array-callback-return': ['error', { allowImplicit: false }],

                // Prefer arrow functions over function declarations
                'antfu/top-level-function': 'off',
                'prefer-arrow-callback': 'error',
                'func-style': ['error', 'expression'],

                // Prefer type over interface for consistency
                '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

                // Warn when using `any`; allowed only for external data or edge cases
                '@typescript-eslint/no-explicit-any': 'warn',
            },
        },
        {
            name: 'tailwind-config',
            files: ['**/*.vue', '**/*.jsx', '**/*.tsx'],
            plugins: {
                'better-tailwindcss': tailwind,
            },
            settings: {
                'better-tailwindcss': {
                    entryPoint: 'app/assets/css/tailwind.css',
                },
            },
            rules: {
                ...tailwind.configs.stylistic.rules,
                'better-tailwindcss/enforce-consistent-line-wrapping': ['warn', {
                    indent: 4,
                }],
            },
        },
    ),
);
