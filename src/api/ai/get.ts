// src/api/ai/get.ts
import instance from '@api/axios';
import { IAiPersonaData } from '@type/AiPersona';
import { IDate } from '@type/Diary';
import { IDay } from '@type/Diary';
import { IID } from '@type/IAiLetterEntry';

interface IAiLettersContent {
  id: number;
  date: string;
  content: string;
}

export const fetchAiLettersViaID = async ({ id }: IID): Promise<IAiLettersContent[]> => {
  const response = await instance.get(`/aiLetters?id=${id}`);
  return response.data;
};

export const fetchAiLettersViaDate = async ({ date }: IDay): Promise<IAiLettersContent[]> => {
  const response = await instance.get(`/aiLetters/${date.year}/${date.month}/${date.day}`);
  return response.data;
};

interface IAiLettersMonthSummary {
  id: number;
  date: string;
  summary: string;
}

export const fetchAiLettersMonthSummary = async ({
  year,
  month,
}: IDate): Promise<IAiLettersMonthSummary[]> => {
  const response = await instance.get(`/aiLetters/${year}/${month}`);
  return response.data;
};

export const fetchAiPersonaList = async (): Promise<IAiPersonaData[]> => {
  const response = await instance.get('/persona');
  return response.data;
};
