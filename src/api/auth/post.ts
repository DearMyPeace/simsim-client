import axios from 'axios';

export const reissueToken = async () => {
  const response = await axios.post(`${process.env.BASE_URL}/auth/reissue`, null, {
    headers: { 'X-Custom-Header': 'foobar', 'Content-Type': 'application/json' },
    withCredentials: true,
  });
  return response.data;
};
