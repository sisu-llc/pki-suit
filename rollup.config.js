// rollup.config.js
import fs from 'fs';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss';
import commonjs from 'rollup-plugin-commonjs'

const pkg = JSON.parse(fs.readFileSync('./package.json'))

export default {
  input: 'src/index.js',
  external: ['react', 'react-dom'],
  output: [
    {file: pkg.main, format: 'cjs', sourcemap: true, exports: 'named'},
    {file: pkg.module, format: 'es', sourcemap: true, exports: 'named'},
  ],
  plugins: [
    replace({ 'process.env.NODE_ENV': JSON.stringify('production')}),
    postcss({ extensions: [ '.css' ] }),
    json(),
    resolve({
      jsnext: true,
      preferBuiltins: false
    }),
    commonjs({
      ignoreGlobal: true,
      include: 'node_modules/**',
      exclude: 'node_modules/react-dom/**',
      namedExports: {
        'node_modules/enumify/lib/enumify.js': ['named'],
        'node_modules/crypto-js/md5.js': ['named'],
      }
    }),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        ['es2015', {modules: false}],
        'react',
        'stage-0'
      ],
      plugins: [ 'external-helpers' ]
    }),
    uglify()
  ]
};
