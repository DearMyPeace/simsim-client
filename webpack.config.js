const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
  'react-native-chart-kit',
  'react-native-gesture-handler',
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
      plugins: ['react-native-web'],
    },
  },
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg|ttf)$/,
  include: [
    path.resolve(appDirectory, 'src/assets'),
    ...uncompiled.map((name) => path.resolve(appDirectory, `node_modules/${name}`)),
  ],
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
    },
  },
};

module.exports = {
  entry: [path.resolve(appDirectory, 'index.web.js')],
  output: {
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, 'dist'),
  },
  module: {
    rules: [babelLoaderConfiguration, imageLoaderConfiguration],
  },

  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    }),
  ],
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: ['.web.js', '.js', '.web.ts', '.ts', '.web.tsx', '.tsx'],
  },
};
