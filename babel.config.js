const isWeb = process.env.BABEL_ENV === 'web';

const moduleResolver = [
  'module-resolver',
  {
    root: ['./src'],
    extensions: [
      '.ios.ts',
      '.android.ts',
      '.web.ts',
      '.ts',
      '.ios.tsx',
      '.android.tsx',
      '.web.tsx',
      '.tsx',
      '.jsx',
      '.js',
      '.json',
    ],
    alias: {
      '@': './src',
      '@api': './src/api',
      '@assets': './src/assets',
      '@components': './src/components',
      '@hooks': './src/hooks',
      '@navigators': './src/navigators',
      '@screens': './src/screens',
      '@stores': './src/stores',
      '@types': './src/types',
      '@utils': './src/utils',
    },
  },
];

module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: isWeb
    ? [['react-native-web', { commonjs: true }], moduleResolver]
    : [['@babel/plugin-transform-private-methods', { loose: true }], moduleResolver],
};
