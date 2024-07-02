import React from 'react';
import MyText from '@components/common/MyText';
import TextButton from '@components/common/TextButton';
import { StyleSheet, View } from 'react-native';
import MyModal from '@components/common/MyModal';
import useLogout from '@hooks/login/logoutHook';
import { IBasicModalProps } from '@type/Modal';

const DeleteAccountModal = ({ visible, setIsVisible }: IBasicModalProps) => {
  const { deleteAccountMutation } = useLogout();

  const onDeleteAccount = () => {
    deleteAccountMutation.mutate();
    setIsVisible(false);
  };

  const onCancel = () => {
    setIsVisible(false);
  };

  return (
    <MyModal visible={visible} setIsVisible={setIsVisible} transparent={true} animationType="fade">
      <View style={styles.modalContent}>
        <MyText>정말로 탈퇴하시겠습니까?</MyText>
        <MyText>작성한 모든 심심기록이 지워집니다.</MyText>
      </View>
      <View style={styles.modalButtons}>
        <TextButton onPress={onCancel}>취소</TextButton>
        <TextButton onPress={onDeleteAccount}>확인</TextButton>
      </View>
    </MyModal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    padding: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    width: '75%',
  },
});

export default DeleteAccountModal;
