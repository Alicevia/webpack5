
module.exports = function (api) {
  api.cache(true);
  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',//当使用了一些api并且需要转换的时候，自己引入core-js内部对应的包而不是全部引入
        corejs: 3,
        modules: false, // for tree shaking
      },
    ],
  ];
  const plugins = [
    [
      '@babel/plugin-transform-runtime',//转译api 从之前的直接修改原型改为了从一个统一的模块中引入，避免了对全局变量及其原型的污染，解决了// 这个插件可以实现一次导入，多次使用，不再是使用多少次就导入多少次，减少代码冗余
      // helpers 从之前的原地定义改为了从一个统一的模块中引入，使得打包的结果中每个 helper 只会存在一个，解决了第二个问题
      {
        "corejs": {
          "version": 3,
          "proposals": true
        },
        "useESModules": true
      }
    ],
    // '@babel/plugin-syntax-dynamic-import'
  ];
  return {
    presets,
    plugins,
  };
};
