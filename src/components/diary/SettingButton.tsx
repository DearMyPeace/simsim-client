import React from 'react';
import { IconButton } from 'react-native-paper';

const SettingButton = () => (
  <IconButton
    icon="dots-horizontal"
    iconColor="black"
    size={24}
    onPress={() => console.log('Pressed')}
  />
);

export default SettingButton;
