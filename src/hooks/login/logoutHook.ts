import { useSetRecoilState } from 'recoil';
import { authTokenState, isLoggedInState, userInfoState } from '@stores/login.ts';
import { removeToken } from '@components/login/AuthService';
import { useMutation } from '@tanstack/react-query';
import { logoutRequest, deleteAccountRequest } from '@api/auth/delete';
import { snackMessage } from '@stores/snackMessage';

const useLogout = () => {
  const setAuthToken = useSetRecoilState(authTokenState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setSnackbar = useSetRecoilState(snackMessage);

  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      console.log('Logout Success');
    },
    onError: (e) => {
      console.log(e, 'Logout Error');
    },
    onSettled: () => {
      handleLogout();
    },
  });
  const deleteAccountMutation = useMutation({
    mutationFn: deleteAccountRequest,
    onSuccess: () => {
      setSnackbar('회원 탈퇴가 완료되었습니다');
      console.log('Delete Account Success');
      handleLogout();
    },
    onError: (e) => {
      setSnackbar('회원 탈퇴 중 오류가 발생했습니다');
      console.log(e, 'Delete Account Error');
    },
  });

  const handleLogout = async () => {
    setAuthToken(null);
    await removeToken();
    setUserInfo(null);
    setIsLoggedIn(false);
  };
  return { logoutMutation, deleteAccountMutation };
};

export default useLogout;
