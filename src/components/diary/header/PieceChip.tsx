// PieceChip.tsx
import React from 'react';
import { Chip } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useRecoilValue } from 'recoil';
import { pieces } from '@stores/pieces';

// TODO: Logout Test Code
import { useRecoilState } from 'recoil';
import { authTokenState, userInfoState, isLoggedInState } from '@stores/login';
import { removeToken } from '@components/login/AuthService';

const PieceChip = () => {
  const count = useRecoilValue(pieces);

  const [authToken, setAuthToken] = useRecoilState(authTokenState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [, setIsLoggedIn] = useRecoilState(isLoggedInState);

  // TODO: Logout Test Code
  const handleLogout = async () => {
    setAuthToken(null);
    await removeToken();
    setUserInfo(null);
    setIsLoggedIn(false);
  };

  return (
    <Chip
      style={styles.container}
      textStyle={styles.text}
      mode="outlined"
      icon="information"
      onPress={handleLogout}
    >
      {count}
    </Chip>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DADADA',
    borderRadius: 8,
  },
  text: {
    color: '#000000',
    fontFamily: 'GowunBatang-Regular',
    fontSize: 11,
  },
});

export default PieceChip;
