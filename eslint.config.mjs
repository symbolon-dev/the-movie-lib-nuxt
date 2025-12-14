import antfu from '@antfu/eslint-config';
import tailwindcss from 'eslint-plugin-tailwindcss';

export default antfu({
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
}, {
    plugins: {
        tailwindcss,
    },
    rules: {
        ...tailwindcss.configs['flat/recommended'].rules,
    },
});
