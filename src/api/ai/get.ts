// src/api/ai/get.ts
import instance from '@api/axios';
import { IAiPersonaData } from '@type/AiPersona';

export const fetchAiLetters = async (total) => {
  const response = await instance.get(`/aiLetters`, {
    params: {
      total,
    },
  });
  return response.data;
};

export const fetchTodayAiLetters = async (count) => {
  const response = await instance.get(`/aiLetters?total=${count}`, {
    params: {
      count,
    },
  });
  return response.data;
};

export const fetchNextAiLetter = async (offset, count) => {
  const response = await instance.get(`/aiLetters?offset=${offset}&total=${count}`, {
    params: { offset, count },
  });
  return response.data;
};

export const fetchAiPersonaList = async (): Promise<IAiPersonaData[]> => {
  const response = await instance.get('/persona');
  return response.data;
};
