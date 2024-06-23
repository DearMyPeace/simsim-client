import instance from '@api/axios';
import { IDiaryPatchRequest } from '@type/Diary';

export const patchDiary = async ({ id, data }: IDiaryPatchRequest) => {
  const response = await instance.patch(`/diary/${id}`, data);
  return response.data;
};
