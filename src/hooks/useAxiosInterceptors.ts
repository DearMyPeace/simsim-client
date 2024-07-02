import { useEffect } from 'react';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import instance from '@api/axios';
import useLogout from '@hooks/login/logoutHook';
import { getToken, saveToken } from '@components/login/AuthService';

const useAxiosInterceptors = () => {
  const { handleLogout } = useLogout();

  const reqConfig = async (config: InternalAxiosRequestConfig) => {
    if (config.url === '/auth/google') {
      return config;
    }
    // 로그인 후 토큰 헤더에 추가
    const accessToken = await getToken();
    if (accessToken) {
      config.headers.Authorization = accessToken;
      config.withCredentials = true; // todo: 배포 시 삭제
    }
    return config;
  };

  const reqErrorConfig = (error: any) => {
    return Promise.reject(error);
  };

  const resConfig = (response: AxiosResponse) => {
    return response;
  };

  const resErrorConfig = async (error: any) => {
    // auth/google 제외한 요청 401 에러 시 토큰 재발급
    if (error.response.status === 401 && error.config.url !== '/auth/google') {
      console.log('토큰 만료');
      axios
        .post(`${process.env.BASE_URL}/auth/reissue`)
        .then(async (res) => {
          await saveToken(res.data.accessToken);
          error.config.headers.Authorization = res.data.accessToken;
          return instance.request(error.config);
        })
        .catch((err) => {
          console.log('토큰 재발급 실패', err);
          // 토큰 재발급 실패 시 로그아웃
          handleLogout();
        });
    }
    return Promise.reject(error);
  };

  useEffect(() => {
    const reqInterceptor = instance.interceptors.request.use(reqConfig, reqErrorConfig);
    const resInterceptor = instance.interceptors.response.use(resConfig, resErrorConfig);
    return () => {
      instance.interceptors.request.eject(reqInterceptor);
      instance.interceptors.response.eject(resInterceptor);
    };
  }, []);
};

export default useAxiosInterceptors;
