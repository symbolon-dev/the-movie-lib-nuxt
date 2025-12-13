import antfu from '@antfu/eslint-config';
import tailwindcss from 'eslint-plugin-tailwindcss';

export default antfu({
    vue: {
        a11y: true,
    },
    typescript: true,
    stylistic: {
        indent: 4,
        quotes: 'single',
        semi: true,
    },
}, {
    plugins: {
        tailwindcss,
    },
    rules: {
        ...tailwindcss.configs['flat/recommended'].rules,
    },
});
