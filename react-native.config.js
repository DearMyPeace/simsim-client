module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts'], // 폰트 파일 경로
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null, // iOS에서 벡터 아이콘 복사를 비활성화합니다.
      },
    },
  },
};
