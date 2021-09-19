import rollupConfig from './rollup.config';
// import json from '@rollup/plugin-json';
// import typescript from '@rollup/plugin-typescript';
// import commonjs from '@rollup/plugin-commonjs';
// import nodePolyfills from 'rollup-plugin-polyfill-node';
// import resolve from '@rollup/plugin-node-resolve'

const localPath = '../../../Library/Mobile\ Documents/iCloud~md~obsidian/Documents/WardsWiki/.obsidian/plugins/'
const folderName = 'obsidian-wakatime-local'
const localPluginPath = `${localPath}${folderName}`

export default {
  ...rollupConfig,
  output: {
    ...rollupConfig.output,
    dir: localPluginPath,
  },
  // plugins: [
  //   json(),
  //   typescript(),
  //   resolve({
  //     browser: true,
  //   }),
  //   commonjs({
  //     include: "node_modules/**",
  //   }),
  // ],
};
