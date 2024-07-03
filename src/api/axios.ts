import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { 'X-Custom-Header': 'foobar', 'Content-Type': 'application/json' },
  timeout: 1000,
});

export default instance;
