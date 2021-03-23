import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import svelte from 'rollup-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import svelteNodeGUIPreprocessor from '@nodegui/svelte-nodegui-preprocessor'
import url from '@rollup/plugin-url'
import replace from '@rollup/plugin-replace'

const projectDir = path.resolve()
const outDir = path.join(projectDir, 'dist')
const srcDir = path.join(projectDir, 'src')

const isDev = process.env.NODE_ENV !== 'production'

const preprocessor = {
    ...sveltePreprocess(),
    ...svelteNodeGUIPreprocessor(),
};

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
        replace({
            '__DEV__': isDev,
            '__TEST__': false,
        }),
        svelte({
            emitCss: false,
            preprocess: preprocessor,
        }),
    ],
    input: path.join(srcDir, 'app.ts'),
    output: {
        format: 'cjs',
        dir: outDir,
        sourcemap: isDev,
        compact: !isDev,
    },
    external: [
        '@nodegui/nodegui',
    ]
}

export default config
