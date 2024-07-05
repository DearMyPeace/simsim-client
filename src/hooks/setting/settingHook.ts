import React, { useState } from 'react';
import useLogout from '@hooks/login/logoutHook';

const useSetting = () => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const { logoutMutation, deleteAccountMutation } = useLogout();

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
  };
};

export default useSetting;
