import { useEffect } from 'react';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import instance from '@api/axios';
import useLogout from '@hooks/login/logoutHook';
import { getToken, saveToken } from '@components/login/AuthService';

const useAxiosInterceptors = () => {
  const { handleLogout } = useLogout();

  const reqConfig = async (config: InternalAxiosRequestConfig) => {
    console.log('Starting Request', JSON.stringify(config, null, 2));

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
    console.log('Error Response:', JSON.stringify(error, null, 2));

    return Promise.reject(error);
  };

  const resConfig = (response: AxiosResponse) => {
    console.log('Response:', JSON.stringify(response, null, 2));
    return response;
  };

  const resErrorConfig = async (error: any) => {
    console.log('Error Response:', JSON.stringify(error, null, 2));
    if (error.config.url === '/auth/google') return Promise.reject(error);
    const originalRequest = error.config;
    // auth/google 제외한 요청 401(토큰 만료) 에러 시 토큰 재발급, 403(권한 없음) 에러 시 로그아웃
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log('토큰 만료');
      axios
        .post(`${process.env.BASE_URL}/auth/reissue`, null, originalRequest.headers)
        .then(async (res) => {
          await saveToken(res.data.accessToken);
          originalRequest.headers.Authorization = res.data.accessToken;
          return instance.request(originalRequest);
        })
        .catch((err) => {
          console.log('토큰 재발급 실패', err);
          handleLogout();
        });
    } else if (error.response.status === 403) {
      console.log('권한 없음');
      handleLogout();
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
