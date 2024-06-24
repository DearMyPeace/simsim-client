import instance from '@api/axios';

export const deleteDiary = async (id: number) => {
  const response = await instance.delete(`/diary/${id}`);
  return response.data;
};
