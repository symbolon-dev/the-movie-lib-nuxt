import withNuxt from './.nuxt/eslint.config.mjs'
import tailwindcss from 'eslint-plugin-tailwindcss';
import vueA11y from 'eslint-plugin-vuejs-accessibility';
import vueParser from 'vue-eslint-parser';

export default withNuxt({
    files: ['**/*.{js,ts,vue}'],

    languageOptions: {
        parser: vueParser,
        parserOptions: {
            parser: '@typescript-eslint/parser',
            project: [
                './.nuxt/tsconfig.app.json',
                './.nuxt/tsconfig.server.json',
                './.nuxt/tsconfig.shared.json',
                './.nuxt/tsconfig.node.json'
            ],
            tsconfigRootDir: process.cwd(),
            extraFileExtensions: ['.vue'],
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
    },

    plugins: {
        tailwindcss,
        'vuejs-accessibility': vueA11y,
    },

    rules: {
        '@typescript-eslint/array-type': ['error', { default: 'array' }],
        '@typescript-eslint/no-invalid-void-type': 'off',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/require-await': 'warn',
        '@typescript-eslint/return-await': ['error', 'in-try-catch'],
        '@typescript-eslint/promise-function-async': 'error',
        '@typescript-eslint/no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-explicit-any': 'error',

        'vue/multi-word-component-names': 'off',
        'vue/object-curly-spacing': ['error', 'always'],
        'vue/html-closing-bracket-spacing': ['error', { selfClosingTag: 'always' }],
        'vue/max-attributes-per-line': ['error', {
            singleline: { max: 3 },
            multiline: { max: 1 },
        }],
        'vue/html-indent': ['error', 4],
        'vue/no-v-html': 'off',
        'vue/require-prop-types': 'off',
        'vue/html-closing-bracket-newline': ['error', {
            singleline: 'never',
            multiline: 'always',
        }],
        'vue/mustache-interpolation-spacing': ['error', 'always'],

        'vuejs-accessibility/alt-text': 'error',
        'vuejs-accessibility/click-events-have-key-events': 'error',
        'vuejs-accessibility/no-static-element-interactions': 'error',
        'vuejs-accessibility/no-redundant-roles': 'error',
        'vuejs-accessibility/heading-has-content': 'error',
        'vuejs-accessibility/tabindex-no-positive': 'error',
        'vuejs-accessibility/anchor-has-content': 'error',

        'prefer-spread': 'error',
        'prefer-destructuring': ['error', { object: true, array: true }],
        'prefer-const': 'error',
        'prefer-template': 'error',
        'eqeqeq': ['error', 'always'],
        'object-shorthand': 'error',
        'default-param-last': 'error',
        'arrow-body-style': ['error', 'as-needed'],
        'no-param-reassign': 'error',
        'prefer-arrow-callback': 'error',
        'no-else-return': 'error',
        'no-shadow': 'error',
        'eol-last': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'no-var': 'error',
        'curly': ['error', 'all'],

        'semi': ['error', 'always'],
        'quotes': ['error', 'single', { avoidEscape: true }],
        'indent': ['error', 4],

        ...tailwindcss.configs['flat/recommended'].rules,
        'tailwindcss/classnames-order': 'error',
        'tailwindcss/no-custom-classname': 'off',
    },
});
