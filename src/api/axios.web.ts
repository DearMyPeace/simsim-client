import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { 'X-Custom-Header': 'foobar', 'Content-Type': 'application/json' },
  timeout: 1000,
});

instance.interceptors.request.use(
  (config) => {
    if (config.url === '/auth/google') {
      return config;
    }
    // 로그인 후 토큰 헤더에 추가
    const accessToken = localStorage.getItem('authToken');
    if (accessToken) {
      config.headers.Authorization = accessToken;
      config.withCredentials = true; // todo: 배포 시 삭제
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // auth/google 제외한 요청 401 에러 시 토큰 재발급
    // TODO: access token 만료 시 토큰 재발급 로직 추가
    if (error.response.status === 401 && error.config.url !== '/auth/google') {
      console.log('토큰 만료');
    }
    return Promise.reject(error);
  },
);

export default instance;
