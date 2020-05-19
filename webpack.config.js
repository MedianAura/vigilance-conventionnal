const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const threadLoader = require('thread-loader');

threadLoader.warmup({}, ['babel-loader', 'ts-loader']);

const cacheLoader = {
  loader: 'cache-loader',
  options: {
    cacheDirectory: path.resolve(__dirname, './.cache')
  }
};

const config = {
  entry: {
    main: './src/entry.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
  },
  target: 'node',
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          cacheLoader,
          'thread-loader',
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
              transpileOnly: true
            }
          },
          'shebang-loader'
        ]
      },
      {
        test: /\.jsx?$/,
        use: [cacheLoader, 'thread-loader', 'babel-loader', 'shebang-loader']
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      }
    ]
  },
  plugins: [new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })]
};

module.exports = (conf, argv) => {
  return config;
};
