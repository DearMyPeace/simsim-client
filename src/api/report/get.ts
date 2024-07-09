import instance from '@api/axios';

export const fetchWeekReport = async (targetDate: string) => {
  const response = await instance.get(`/api/v1/report/week?${targetDate}`);
  return response.data;
};

export const fetchReportPNN = async (targetDate: string) => {
  const response = await instance.get(`/api/v1/report/week/${targetDate}`);
  return response.data;
};
