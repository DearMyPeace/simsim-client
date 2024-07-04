import { AiLetterEntries } from '@api/mock/AiLetterEntries';
// src/hooks/ai/useAiLetterData.ts
import { useState, useRef, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IAiLetterEntry, IID } from '@type/IAiLetterEntry';
import {
  fetchAiLettersMonthSummary,
  fetchAiLettersViaDate,
  fetchAiLettersViaID,
} from '@api/ai/get';

export const useAiLetterData = (initialDateStr: string) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [aiLetterEntries, setAiLetterEntries] = useState<IAiLetterEntry[]>([]);
  const [currentDateStr, setCurrentDateStr] = useState(initialDateStr);
  const flatListRef = useRef<FlatList>(null);

  const queryClient = useQueryClient();

  const fetchMonthSummary = (year: string, month: string) => {
    return fetchAiLettersMonthSummary({ year: parseInt(year), month: parseInt(month) });
  };

  const {
    data: monthSummaryData,
    error: monthSummaryError,
    isLoading: monthSummaryLoading,
    refetch: refetchMonthSummary,
  } = useQuery({
    queryKey: ['fetchAiLettersMonthSummary', currentDateStr],
    queryFn: async () => {
      const [year, month] = currentDateStr.split('-');
      const result = await fetchMonthSummary(year, month);
      console.log('fetchMonthSummary result: ', result);
      return result;
    },
    staleTime: 1000 * 60 * 5,
    onSuccess: (monthSummaryData) => {
      setAiLetterEntries(monthSummaryData);
      console.log('monthSummaryData: ', monthSummaryData);
      console.log('activeSections: ', activeSections);
    },
  });

  const fetchContentForDate = async (date: string) => {
    const [year, month, day] = date.split('-');
    const response = await fetchAiLettersViaDate({
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
    });
    if (response.length > 0) {
      setAiLetterEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry.date === date ? { ...entry, content: response[0].content } : entry,
        ),
      );
    }
  };

  const fetchContentForID = async (id: string) => {
    const response = await fetchAiLettersViaID({ id });
    if (response.length > 0) {
      setAiLetterEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry.id === id ? { ...entry, content: response[0].content } : entry,
        ),
      );
    }
  };

  const handleAccordionChange = useCallback(
    async (section: IAiLetterEntry) => {
      const index = aiLetterEntries.findIndex((entry) => entry.date === section.date);
      setActiveSections((prevSections) => (prevSections.includes(index) ? [] : [index]));

      if (!section.content) {
        await fetchContentForID(section.id);
      }

      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index, animated: true });
      }
    },
    [aiLetterEntries],
  );

  const refetchMonthData = useCallback(
    (newDateStr: string) => {
      setCurrentDateStr(newDateStr);
      refetchMonthSummary();
    },
    [refetchMonthSummary],
  );

  return {
    aiLetterEntries,
    activeSections,
    setActiveSections,
    flatListRef,
    handleAccordionChange,
    isLoading: monthSummaryLoading,
    error: monthSummaryError,
    refetchMonthSummary: refetchMonthData,
  };
};
