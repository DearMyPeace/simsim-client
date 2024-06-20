import React from 'react';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const SettingButton = () => {
  const navigation = useNavigation();

  const onPress = () => {
    // naviagte to setting page
    navigation.navigate('Settings');
  };

  return <IconButton icon="dots-horizontal" iconColor="black" size={24} onPress={onPress} />;
};

export default SettingButton;
