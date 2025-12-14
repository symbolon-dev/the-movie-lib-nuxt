import antfu from '@antfu/eslint-config';
import tailwindcss from 'eslint-plugin-tailwindcss';

export default antfu(
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
        files: ['**/*.{vue,html,jsx,tsx}'],
        plugins: {
            tailwindcss,
        },
        rules: {
            ...tailwindcss.configs['flat/recommended'].rules,
            'tailwindcss/classnames-order': 'error',
        },
    },
    {
        name: 'project-strict',
        rules: {
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
);
