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
  '@invertase/react-native-apple-authentication',
  'react-native-encrypted-storage',
  'react-native-chart-kit',
  'react-native-gesture-handler',
  'react-native-reanimated',
  'react-native-date-picker',
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
  test: /\.(gif|jpe?g|png|svg|ttf)$/,
  include: [
    path.resolve(appDirectory, 'src/assets'),
    ...uncompiled.map((name) => path.resolve(appDirectory, `node_modules/${name}`)),
  ],
  use: {
    loader: 'url-loader',
    options: {
      name: 'assets/[name].[hash].[ext]',
      esModule: false,
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
  },
  module: {
    rules: [babelLoaderConfiguration, imageLoaderConfiguration, cssLoaderConfiguration],
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
      resourceRegExp: /react-native-reanimated/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^expo-constants$/,
    }),
  ],
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: ['.web.js', '.js', '.web.ts', '.ts', '.web.tsx', '.tsx'],
  },
};
