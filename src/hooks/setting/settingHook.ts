import React, { useState } from 'react';
import useLogout from '@hooks/login/logoutHook';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '@stores/login';

const useSetting = () => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const { logoutMutation, deleteAccountMutation } = useLogout();
  const userInfo = useRecoilValue(userInfoState);

  const onDeleteAccount = () => {
    setDeleteModalVisible(true);
  };

  const onConfirmDeleteAccount = () => {
    deleteAccountMutation.mutate();
    setDeleteModalVisible(false);
  };

  const onLogout = () => {
    logoutMutation.mutate();
  };

  return {
    deleteModalVisible,
    onConfirmDeleteAccount,
    setDeleteModalVisible,
    onLogout,
    onDeleteAccount,
    userEmail: userInfo.email,
    userProvider: userInfo.providerName === 'APPLE' ? 'Apple' : 'Google',
  };
};

export default useSetting;
