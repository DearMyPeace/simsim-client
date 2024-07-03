const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  // 사용자 정의 설정
  const customConfig = {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
    },
  };

  // 기본 설정과 사용자 정의 설정 병합
  return mergeConfig(defaultConfig, customConfig);
})();
