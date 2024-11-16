import instance from '@api/axios';

export const fetchExportDiary = async () => {
  const response = await instance.get('/export/diary');
  return response.data;
};

export const fetchExportReport = async () => {
  const response = await instance.get('/export/report');
  return response.data;
};
