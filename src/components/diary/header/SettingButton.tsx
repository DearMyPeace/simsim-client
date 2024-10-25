import React from 'react';
import MyIconButton from '@components/common/MyIconButton';
import { useNavigation } from '@react-navigation/native';

const SettingButton = () => {
  const navigation = useNavigation();

  const onPress = () => {
    // naviagte to setting page
    navigation.navigate('Settings');
  };

  return <MyIconButton name="setting" onPress={onPress} />;
};

export default SettingButton;
