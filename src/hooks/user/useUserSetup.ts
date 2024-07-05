// src/hooks/useUserSetup.ts
import { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { isLoggedInState, userInfoState } from '@stores/login';
import { getToken } from '@components/login/AuthService';
import { useUserInfo } from '@api/user/get';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const useUserSetup = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const { data, refetch } = useUserInfo(isLoggedIn);

  useFocusEffect(
    useCallback(() => {
      const checkToken = async () => {
        const token = await getToken();
        if (token) {
          setIsLoggedIn(true);
        }
      };
      checkToken();
      refetch();
    }, [setIsLoggedIn, refetch]),
  );

  useEffect(() => {
    if (data) {
      setUserInfo(data);
    }
  }, [data, setUserInfo]);
};

export default useUserSetup;
