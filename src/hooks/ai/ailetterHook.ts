// src/hooks/ai/useAiLetterData.ts
import { useState, useRef, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IAiLetterEntry } from '@type/IAiLetterEntry';
import { fetchAiLettersMonthSummary, fetchAiLettersViaDate } from '@api/ai/get';

export const useAiLetterData = (initialDateStr: string) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [aiLetterEntries, setAiLetterEntries] = useState<IAiLetterEntry[]>([]);
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
    queryKey: ['fetchAiLettersMonthSummary', initialDateStr],
    queryFn: () => {
      const [year, month] = initialDateStr.split('-');
      return fetchMonthSummary(year, month);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    onSuccess: (monthSummaryData) => {
      setAiLetterEntries(monthSummaryData);
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

  const handleAccordionChange = useCallback(
    async (section: IAiLetterEntry) => {
      const index = aiLetterEntries.findIndex((entry) => entry.date === section.date);
      setActiveSections((prevSections) => (prevSections.includes(index) ? [] : [index]));

      if (!section.content) {
        await fetchContentForDate(section.date);
      }

      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index, animated: true });
      }
    },
    [aiLetterEntries],
  );

  return {
    aiLetterEntries,
    activeSections,
    setActiveSections,
    flatListRef,
    handleAccordionChange,
    isLoading: monthSummaryLoading,
    error: monthSummaryError,
    refetchMonthSummary,
  };
};
