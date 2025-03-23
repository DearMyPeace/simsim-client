import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { authTokenState, isLoggedInState, userInfoState } from '@stores/login.ts';
import { removeToken } from '@components/login/AuthService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutRequest, deleteAccountRequest } from '@api/auth/delete';
import { snackMessage } from '@stores/snackMessage';

const useLogout = () => {
  const setAuthToken = useSetRecoilState(authTokenState);
  const resetUserInfo = useResetRecoilState(userInfoState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setSnackbar = useSetRecoilState(snackMessage);
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onSettled: () => {
      handleLogout();
    },
  });
  const deleteAccountMutation = useMutation({
    mutationFn: deleteAccountRequest,
    onSuccess: () => {
      setSnackbar('회원 탈퇴가 완료되었습니다');
      handleLogout();
    },
    onError: (e) => {
      setSnackbar('회원 탈퇴 중 오류가 발생했습니다');
    },
  });

  const handleLogout = async () => {
    queryClient.cancelQueries();
    setAuthToken(null);
    await removeToken();
    resetUserInfo();
    setIsLoggedIn(false);
  };
  return { logoutMutation, deleteAccountMutation, handleLogout };
};

export default useLogout;
