const { name } = require('./package');

module.exports = {
  webpack: (config) => {
    config.output.library = `myreactlib`;
    config.output.libraryTarget = 'umd';
    config.output.chunkLoadingGlobal = `webpackJsonp_myreactlib`;
    config.output.globalObject = 'window';

    return config;
  },

  devServer: (_) => {
    const config = _;

    config.headers = {
      'Access-Control-Allow-Origin': '*',
    };
    config.historyApiFallback = true;
    config.hot = false;
    config.static.watch = false;
    config.liveReload = false;
    config.port = 3001;
    return config;
  },
};
