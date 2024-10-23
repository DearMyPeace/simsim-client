import React from 'react';
import instance from '@api/axios';
import { IDate, IDiaryCount, IDiaryListResponse, newDiary } from '@type/Diary';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const fetchDiaryList = async (targetDate: string): Promise<IDiaryListResponse> => {
  const response = await instance.get(`/diary/${targetDate}`);
  return response.data;
};

export const useDiaryList = (targetDate: string, isMarked: boolean) => {
  return useQuery({
    queryKey: ['diary', 'list', targetDate],
    queryFn: () => fetchDiaryList(targetDate),
    enabled: !!targetDate,
    initialData: !isMarked ? { diaries: [], sendStatus: false } : undefined,
    staleTime: Infinity,
    select: (data) => {
      const diaryList = data.diaries.map((item) => ({
        id: item.diaryId,
        content: item.content,
        createdDate: item.createdDate,
        modifiedDate: item.modifiedDate,
      }));
      diaryList.length < 3 && diaryList.push(newDiary);
      return { sendStatus: data.sendStatus, diaryList };
    },
  });
};

export const fetchDiaryCounts = async ({ year, month }: IDate): Promise<IDiaryCount[]> => {
  const response = await instance.get(`/diary/${year}/${month}`);
  return response.data;
};

export const useDiaryCounts = ({ year, month }: IDate): UseQueryResult<IDiaryCount[]> => {
  return useQuery({
    queryKey: ['diary', 'counts', year, month],
    queryFn: () => fetchDiaryCounts({ year, month }),
    enabled: !!year && !!month,
    staleTime: Infinity,
  });
};
