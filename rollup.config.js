import merge from 'deepmerge';
import path from 'path';
import jetpack from 'fs-jetpack';
import builtinModules from 'builtin-modules';
import { createBasicConfig } from '@open-wc/building-rollup';
import nodeResolvePlugin from '@rollup/plugin-node-resolve';
import jsonPlugin from '@rollup/plugin-json';
import commonjsPlugin from '@rollup/plugin-commonjs';
import tsPathsPlugin from 'rollup-plugin-tsconfig-paths';
import typescriptPlugin from 'rollup-plugin-typescript2';

const baseConfig = createBasicConfig();
const resolvePath = (pathParts) => jetpack.path(...pathParts);
const buildOutput = 'dist';
const sourcePath = path.resolve('src');
const packageJson = jetpack.read('package.json', 'json');
const localInstalledPackages = [...Object.keys(packageJson.dependencies)];
const tsConfigPath = resolvePath([sourcePath, 'tsconfig.json']);

export default merge(baseConfig,{
  input: resolvePath([sourcePath, 'index.ts']),
  output: [{
    file: resolvePath([buildOutput, 'index.js']),
    format: 'cjs'
  }],
  plugins: [
    tsPathsPlugin({ tsConfigPath }),
    nodeResolvePlugin({extensions: ['.ts']}),
    jsonPlugin(),
    commonjsPlugin(),
    typescriptPlugin({
      check: false,
      tsconfig: tsConfigPath
    })
  ],
  external: [...builtinModules, ...localInstalledPackages],
  inlineDynamicImports: true
});