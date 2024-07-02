import instance from '@api/axios';

export const deleteDiary = async (diaryId: number) => {
  const response = await instance.delete(`/diary/${diaryId}`);
  return response.data;
};
