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

export const fetchTodayAiLetters = async (count) => {
  const response = await api.get(`aiLetters?total=${count}`, {
    params: {
      count,
    },
  });
  return response.data;
};

export const fetchNextAiLetter = async (offset, count) => {
  const response = await api.get(`aiLetters?offset=${offset}&total=${count}`, {
    params: { offset, count },
  });
  return response.data;
};

export default api;
