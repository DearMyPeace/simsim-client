// src/api/ai/api.ts
import instance from '@api/axios';

export const fetchAiLetters = async (userId, total) => {
  const response = await instance.get(`/aiLetters`, {
    params: {
      userId,
      total,
    },
  });
  return response.data;
};

export const fetchTodayAiLetters = async (count) => {
  const response = await instance.get(`aiLetters?total=${count}`, {
    params: {
      count,
    },
  });
  return response.data;
};

export const fetchNextAiLetter = async (offset, count) => {
  const response = await instance.get(`aiLetters?userId=1&offset=${offset}&total=${count}`, {
    params: { offset, count },
  });
  return response.data;
};
