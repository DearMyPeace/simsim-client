import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://10.19.201.166:8080/api/v1',
  headers: { 'X-Custom-Header': 'foobar', 'Content-Type': 'application/json' },
  timeout: 1000,
});

export default instance;
