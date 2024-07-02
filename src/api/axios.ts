import axios from 'axios';
import { getToken } from '@components/login/AuthService';

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { 'X-Custom-Header': 'foobar', 'Content-Type': 'application/json' },
  timeout: 1000,
});

instance.interceptors.request.use(
  async (config) => {
    console.log('Starting Request', JSON.stringify(config, null, 2));

    if (config.url === '/auth/google') {
      return config;
    }

    // 로그인 후 토큰 헤더에 추가
    const accessToken = await getToken();
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
    console.log('Response:', JSON.stringify(response, null, 2));
    return response;
  },
  async (error) => {
    console.log('Error Response:', JSON.stringify(error, null, 2));

    if (error.message === 'Network Error' && error.config) {
      error.config.__isRetryRequest = true;
      return axios(error.config);
    }

    if (error.response && error.response.status === 401 && error.config.url !== '/auth/google') {
      console.log('토큰 만료');
      // TODO: 토큰 재발급 로직 추가
    }
    return Promise.reject(error);
  },
);

export default instance;
