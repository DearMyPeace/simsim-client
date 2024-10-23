const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const appDirectory = path.resolve(__dirname, './');

const uncompiled = [
  'react-native-vector-icons',
  '@react-navigation',
  'react-native-collapsible',
  'react-native-collapsible/Accordion',
  'react-native-calendars',
  'react-native-swipe-gestures',
  'react-native-paper',
  'react-native-element-dropdown',
  '@invertase/react-native-apple-authentication',
  'react-native-chart-kit',
  'react-native-date-picker',
  'react-native-markdown-display',
  'react-apple-signin-auth',
  'react-native-svg',
  'react-native-svg-transformer',
  'react-native-gesture-handler',
  'react-native-reanimated',
  '@react-native-async-storage/async-storage',
  'react-native-encrypted-storage',
  'react-chartjs-2',
  'chart.js',
  'chartjs-plugin-datalabels',
];

const babelLoaderConfiguration = {
  test: /\.(tsx|ts|jsx|js|mjs)$/,
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'src'),
    ...uncompiled.map((name) => path.resolve(appDirectory, `node_modules/${name}`)),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      plugins: ['react-native-web', 'react-native-reanimated/plugin'],
    },
  },
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|ttf)$/,
  include: [
    path.resolve(appDirectory, 'src/assets'),
    ...uncompiled.map((name) => path.resolve(appDirectory, `node_modules/${name}`)),
  ],
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[hash].[ext]',
      esModule: false,
      limit: 100,
      fallback: 'file-loader',
      publicPath: '/',
    },
  },
};

const svgLoaderConfiguration = {
  test: /\.svg$/,
  use: {
    loader: '@svgr/webpack',
    options: {
      icon: true,
    },
  },
};

const cssLoaderConfiguration = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
};

module.exports = {
  entry: [path.resolve(appDirectory, 'index.web.js')],
  output: {
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      cssLoaderConfiguration,
      svgLoaderConfiguration,
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^@invertase\/react-native-apple-authentication$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^@react-native-async-storage\/async-storage$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /react-native-encrypted-storage/,
    }),
    new Dotenv(),
    new webpack.IgnorePlugin({
      resourceRegExp: /^expo-constants$/,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(appDirectory, 'public/favicon'),
          to: path.resolve(appDirectory, 'dist/favicon'),
        },
        {
          from: path.resolve(appDirectory, 'public/logo'),
          to: path.resolve(appDirectory, 'dist/logo'),
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: ['.web.js', '.js', '.web.ts', '.ts', '.web.tsx', '.tsx'],
  },
  devServer: {
    static: {
      directory: path.resolve(appDirectory, 'public'),
    },
    historyApiFallback: true,
    hot: true,
    host: '0.0.0.0',
    port: 8080,
    headers: {
      // 'Cross-Origin-Opener-Policy': 'same-origin',
      // 'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
};
