// src/api/ai/get.ts
import instance from '@api/axios';
import { IAiPersonaData } from '@type/AiPersona';

export const fetchTodayAiLetters = async (total) => {
  const response = await instance.get(`/aiLetters?total=${total}`);
  return response.data;
};

export const fetchNextAiLetter = async (offset, total) => {
  const response = await instance.get(`/aiLetters?offset=${offset}&total=${total}`);
  return response.data;
};

export const fetchAiPersonaList = async (): Promise<IAiPersonaData[]> => {
  const response = await instance.get('/persona');
  return response.data;
};
