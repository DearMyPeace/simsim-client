import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const SettingButton = () => {
  const navigation = useNavigation();

  const onPress = () => {
    // naviagte to setting page
    navigation.navigate('Settings');
  };

  return <Ionicons name="ellipsis-horizontal-outline" color="#555" size={24} onPress={onPress} />;
};

export default SettingButton;
