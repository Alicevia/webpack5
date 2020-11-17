
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');
// const postcssImport = require('postcss-import');
// const postcssUrl = require('postcss-url');

module.exports = {
  plugins: [
    autoprefixer, // 添加 autoprefixer 支持，需要配置 browserslist
    postcssPresetEnv(),
    // postcssImport,
    // postcssUrl({
    //     url: 'rebase',
    //     assetsPath: '../images/',
    // }),
  ],
};
