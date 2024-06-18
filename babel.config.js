const isWeb = process.env.BABEL_ENV === 'web';

module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: isWeb
    ? [['react-native-web', { commonjs: true }]]
    : [['@babel/plugin-transform-private-methods', { loose: true }]],
};
