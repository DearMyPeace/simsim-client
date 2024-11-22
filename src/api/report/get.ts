import instance from '@api/axios';
import { DayEmotionData, EmotionData, IReportContent, IReportData } from '@type/IReport';

export const fetchWeekReport = async (targetDate: string): Promise<EmotionData> => {
  const response = await instance.get(`/report/week?targetDate=${targetDate}`);
  return response.data;
};

export const fetchReportPNN = async (targetDate: string): Promise<DayEmotionData> => {
  const response = await instance.get(`/report/week/${targetDate}`);
  return response.data;
};

const mockReportData = [
  {
    rate: 0.3,
    keyword: '건강',
    content:
      '날씨가 추워질수록 건강에 대한 언급이 많아졌어요. 다음주부터는 더 춥다고 하니, 따뜻하게 입는다면 건강에 대한 걱정이 덜 할 것 같아요.',
  },
  {
    rate: 0.2,
    keyword: '영화',
    content: '영화를 보는 것은 영화를 보는 것이 아니라 영화를 보는 것입니다.',
  },
  {
    rate: 0.15,
    keyword: '날씨',
    content:
      '날씨가 추워질수록 건강에 대한 언급이 많아졌어요. 다음주부터는 더 춥다고 하니, 따뜻하게 입는다면 건강에 대한 걱정이 덜 할 것 같아요.',
  },
  {
    rate: 0.15,
    keyword: '요리하다',
    content: '요리하다는 것은 요리하는 것이 아니라 요리하는 것입니다.',
  },
  {
    rate: 0.1,
    keyword: '독서',
    content: '독서는 독서하는 것이 아니라 독서하는 것입니다.',
  },
];

export const fetchMockReportData = async (targetDate: string): Promise<IReportData[]> => {
  console.log(`fetchMockReportData: ${targetDate}`);
  return mockReportData;
};

export const fetchMockReportKeyword = async ({
  targetDate,
  rank,
}: {
  targetDate: string;
  rank: number;
}): Promise<IReportContent> => {
  console.log(`fetchMockReportKeyword: ${targetDate}, ${rank}`);
  return {
    keyword: mockReportData[rank - 1].keyword,
    content: mockReportData[rank - 1].content,
  };
};
