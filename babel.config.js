module.exports = {
  presets: ['module:@react-native/babel-preset', '@babel/preset-react', '@babel/preset-typescript'],
  plugins: [['react-native-web', { commonjs: true }]],
};
