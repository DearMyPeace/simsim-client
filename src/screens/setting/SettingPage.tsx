import React from 'react';
import { Text, View } from 'react-native';

const SettingPage = () => {
  // 상단 바 없애고 x 버튼 추가, x 버튼 누르면 뒤로가기
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>This is the Setting screen.</Text>
    </View>
  );
};

export default SettingPage;
