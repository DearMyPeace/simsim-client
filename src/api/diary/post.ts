import instance from '@api/axios';
import { useMutation } from '@tanstack/react-query';
import { IDiaryPostRequest } from '@type/Diary';

export const postDiary = async (data: IDiaryPostRequest) => {
  const response = await instance.post('/diary/save', data);
  return response.data;
};
