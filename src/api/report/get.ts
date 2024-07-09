import instance from '@api/axios';
import { DayEmotionData, EmotionData } from '@type/IReport';

export const fetchWeekReport = async (targetDate: string): Promise<EmotionData> => {
  const response = await instance.get(`/report/week?targetDate=${targetDate}`);
  return response.data;
};

export const fetchReportPNN = async (targetDate: string): Promise<DayEmotionData> => {
  const response = await instance.get(`/report/week/${targetDate}`);
  return response.data;
};
