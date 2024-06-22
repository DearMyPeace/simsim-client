import React from 'react';
import instance from '@api/axios';
import { IDiaryListResponse } from '@type/Diary';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { format, isFuture, isToday } from 'date-fns';

export const fetchDiaryList = async (targetDate: string): Promise<IDiaryListResponse[]> => {
  console.log('fetchDiaryList', targetDate);
  const response = await instance.get(`/diary/${targetDate}`);
  return response.data;
};

export const useDiaryList = (targetDate: string) => {
  return useQuery({
    queryKey: ['diaryList', targetDate],
    queryFn: () => fetchDiaryList(targetDate),
    enabled: !isFuture(new Date(targetDate)),
    select: (data) => {
      const diaryList = data.map((item) => ({
        id: item.diaryId.toString(),
        content: item.content,
        createdTime: format(new Date(item.createdDate), 'HH:mm a'),
      }));
      const today = isToday(new Date(targetDate));
      !today &&
        diaryList.length === 0 &&
        diaryList.push({ id: 'newDiary', content: '작성된 심심 기록이 없습니다', createdTime: '' });
      today &&
        diaryList.length < 3 &&
        diaryList.push({
          id: 'newDiary',
          content: '오늘의 심심 기록을 남겨보세요',
          createdTime: '',
        });
      return diaryList;
    },
    placeholderData: keepPreviousData,
    retry: 1,
  });
};
