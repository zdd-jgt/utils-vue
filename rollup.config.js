import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import polyfillNode from 'rollup-plugin-polyfill-node';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/utils-vue.js',
        format: 'umd',
        name: 'utilsVue',
        exports: 'named'
    },
    plugins: [
        terser(),
        resolve({
            browser: true, // 适配浏览器环境
        }),  // 解析 node_modules 中的依赖
        commonjs(),
        polyfillNode(),
    ]
}
