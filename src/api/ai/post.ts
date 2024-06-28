import instance from '@api/axios';
import { IAiLetterRequest } from '@type/IAiLetterRequest';

export const postAiLetters = async (data: IAiLetterRequest) => {
  const response = await instance.post(`/aiLetters/save`, data);
  return response.data;
};
