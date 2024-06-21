// src/api/ai/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.19.201.166:8080/api/v1',
});

export const fetchAiLetters = async (userId, total) => {
  const response = await api.get(`/aiLetters`, {
    params: {
      userId,
      total,
    },
  });
  return response.data;
};

export default api;
