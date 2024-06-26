import React, { useState } from 'react';
import useLogout from '@hooks/login/logoutHook';
import { Alert, Linking } from 'react-native';

const useSetting = () => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const { handleLogout } = useLogout();

  const onFeedback = async () => {
    const url = 'https://forms.gle/nUCrj6JLNCnU8Dez6'; // env에 추가하기
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`해당 링크로 이동할 수 없습니다 (${url})`);
    }
  };

  const onDeleteAccount = () => {
    setDeleteModalVisible(true);
  };

  return {
    deleteModalVisible,
    setDeleteModalVisible,
    onFeedback,
    onDeleteAccount,
    handleLogout,
  };
};

export default useSetting;
