import React from 'react';
import instance from '@api/axios';
import { DateStatus, IDate, IDiaryCount, IDiaryListResponse, NEW_DIARY } from '@type/Diary';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { isToday } from 'date-fns';

export const fetchDiaryList = async (targetDate: string): Promise<IDiaryListResponse[]> => {
  const response = await instance.get(`/diary/${targetDate}`);
  return response.data;
};

export const useDiaryList = (targetDate: string, dateStatus: DateStatus | null) => {
  console.log('useDiaryList', targetDate, dateStatus);
  return useQuery({
    queryKey: ['diaryList', targetDate],
    queryFn: () => fetchDiaryList(targetDate),
    enabled: !!dateStatus,
    staleTime: Infinity,
    select: (data) => {
      const diaryList = data.map((item) => ({
        id: item.diaryId,
        content: item.content,
        createdTime: item.createdDate,
      }));
      const today = isToday(new Date(targetDate));
      today &&
        diaryList.length < 3 &&
        diaryList.push({
          id: NEW_DIARY,
          content: '오늘의 심심기록을 남겨보세요',
          createdTime: '',
        });
      return diaryList;
    },
  });
};

export const fetchDiaryCounts = async ({ year, month }: IDate): Promise<IDiaryCount[]> => {
  console.log('fetchDiaryCounts', year, month);
  const response = await instance.get(`/diary/${year}/${month}`);
  return response.data;
};

export const useDiaryCounts = ({ year, month }: IDate): UseQueryResult<IDiaryCount[]> => {
  return useQuery({
    queryKey: ['diaryCounts', year, month],
    queryFn: () => fetchDiaryCounts({ year, month }),
    enabled: !!year && !!month,
    staleTime: Infinity,
  });
};
