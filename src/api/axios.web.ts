import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { 'X-Custom-Header': 'foobar', 'Content-Type': 'application/json' },
  timeout: 1000,
});

instance.interceptors.request.use(
  (config) => {
    if (config.url !== '/auth/google') {
      return config;
    }
    // 로그인 후 토큰 헤더에 추가
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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
    // TODO: access token 만료 시 토큰 재발급 로직 추가
    return Promise.reject(error);
  },
);

export default instance;
