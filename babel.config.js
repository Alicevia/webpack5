
module.exports = function (api) {
  api.cache(true);
  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        modules: false, // for tree shaking
      },
    ],
  ];
  const plugins = ['@babel/plugin-transform-runtime', '@babel/plugin-syntax-dynamic-import'];
  return {
    presets,
    plugins,
  };
};
