import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import svelte from 'rollup-plugin-svelte'
import sveltePreprocess, { typescript as sveltePreprocessTypescript, scss as sveltePreprocessScss } from 'svelte-preprocess'
import svelteNodeGUIPreprocessor from '@nodegui/svelte-nodegui-preprocessor'
import url from '@rollup/plugin-url'

const projectDir = __dirname
const outDir = path.join(projectDir, 'dist')
const srcDir = path.join(projectDir, 'src')

const isDev = process.env.NODE_ENV !== 'production'

const config = {
    plugins: [
        typescript({
            // sourceMap: isDev,
        }),
        nodeResolve({
            preferBuiltins: true,
            extensions: ['.js', '.json']
          }),
        commonjs({
            include: /node_modules/,
        }),
        url({
            include: ['**/*.svg', '**/*.png', '**/*.jp(e)?g', '**/*.gif', '**/*.webp', '**/*.node'],
        }),
        svelte({
            dev: isDev,
            preprocess: {
                ...svelteNodeGUIPreprocessor(),
                ...sveltePreprocess(),
            },
        }),
    ],
    input: path.join(srcDir, 'app.ts'),
    output: {
        format: 'cjs',
        dir: outDir,
        sourcemap: isDev ? 'inline' : false,
        compact: !isDev,
    },
    external: [
        // '@nodegui/svelte-nodegui',
    ]
}

export default config