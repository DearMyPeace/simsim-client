import axios from 'axios';
import { getToken } from '@components/login/AuthService';

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { 'X-Custom-Header': 'foobar', 'Content-Type': 'application/json' },
  timeout: 10000,
});

instance.interceptors.request.use(
  async (config) => {
    console.log('Starting Request', JSON.stringify(config, null, 2));
    if (config.url !== '/auth/google') {
      const accessToken = await getToken();
      if (accessToken) {
        config.headers.Authorization = accessToken;
        config.withCredentials = true;
      }
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
  (error) => {
    console.log('Error Response:', JSON.stringify(error, null, 2));
    if (error.message === 'Network Error' && error.config) {
      error.config.__isRetryRequest = true;
      return axios(error.config);
    }
    return Promise.reject(error);
  },
);

export default instance;
