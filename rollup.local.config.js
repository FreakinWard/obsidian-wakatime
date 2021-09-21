import rollupConfig from './rollup.config';

const localPath = '../../../Library/Mobile\ Documents/iCloud~md~obsidian/Documents/WardsWiki/.obsidian/plugins/'
const folderName = 'obsidian-wakatime-local'
const localPluginPath = `${localPath}${folderName}`

export default {
  ...rollupConfig,
  watch: {
    exclude: ['node_modules/**'],
  },
  output: {
    ...rollupConfig.output,
    dir: localPluginPath,
  }
};
