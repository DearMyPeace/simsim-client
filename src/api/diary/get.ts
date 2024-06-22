import React from 'react';
import instance from '@api/axios';
import { IDiaryListResponse } from '@type/Diary';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { format, isToday } from 'date-fns';

export const fetchDiaryList = async (targetDate: string): Promise<IDiaryListResponse[]> => {
  const response = await instance.get(`/diary/${targetDate}`);
  return response.data;
};

export const useDiaryList = (targetDate: string) => {
  return useQuery({
    queryKey: ['diaryList', targetDate],
    queryFn: () => fetchDiaryList(targetDate),
    select: (data) => {
      const diaryList = data.map((item) => ({
        id: item.diaryId.toString(),
        content: item.content,
        createdTime: format(new Date(item.createdDate), 'HH:mm a'),
      }));
      const content = isToday(new Date(targetDate))
        ? '오늘의 마음 조각을 남겨보세요'
        : '작성된 마음 조각이 없습니다';
      diaryList.length < 3 && diaryList.push({ id: 'newDiary', content, createdTime: '' });
      return diaryList;
    },
    placeholderData: keepPreviousData,
    retry: 1,
  });
};
