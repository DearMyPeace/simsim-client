import instance from '@api/axios';
import { IDiaryPatchRequest } from '@type/Diary';

export const patchDiary = async ({ diaryId, data }: IDiaryPatchRequest) => {
  const response = await instance.patch(`/diary/${diaryId}`, data);
  return response.data;
};
