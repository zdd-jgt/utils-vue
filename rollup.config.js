import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/utils-vue.js',
        format: 'umd',
        name: 'utilsVue'
    },
    plugins: [terser()]
}