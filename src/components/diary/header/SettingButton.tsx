import React, { memo, useCallback } from 'react';
import MyIconButton from '@components/common/MyIconButton';
import { useNavigation } from '@react-navigation/native';

const SettingButton = memo(() => {
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    // navigate to setting page
    navigation.navigate('Settings');
  }, [navigation]);

  return <MyIconButton name="setting" onPress={onPress} />;
});

export default SettingButton;
