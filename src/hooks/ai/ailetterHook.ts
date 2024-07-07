import React, { useState, useRef, useCallback, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IAiLetterEntry, IID } from '@type/IAiLetterEntry';
import { fetchAiLettersMonthSummary, fetchAiLettersViaID } from '@api/ai/get';
import { generateDateRangeEntry } from '@utils/dateUtils';
import { useFocusEffect } from '@react-navigation/native';

export const useAiLetterData = (initialDateStr: string) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [aiLetterEntries, setAiLetterEntries] = useState<IAiLetterEntry[]>([]);
  const [currentDateStr, setCurrentDateStr] = useState(initialDateStr);
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    setCurrentDateStr(initialDateStr);
    console.log('initialDateStr');
  }, [initialDateStr]);

  const fetchMonthSummary = async (dateStr: string): Promise<IAiLetterEntry[]> => {
    const [year, month] = dateStr.split('-');
    return fetchAiLettersMonthSummary({ year: parseInt(year), month: parseInt(month) });
  };

  const fetchContentForID = useCallback(
    async (id: IID) => {
      console.log('fetchContentForID called with id: ', id);

      const cachedData = queryClient.getQueryData(['fetchAiLetterByID', id]);
      if (cachedData && cachedData.content) {
        console.log('Using cached data for ID: ', id);
        setAiLetterEntries((prevEntries) => {
          const updatedEntries = prevEntries.map((entry) =>
            entry.id === id ? { ...entry, content: cachedData.content } : entry,
          );
          console.log('Updated aiLetterEntries from cache: ', updatedEntries);
          return updatedEntries;
        });
        return;
      }

      try {
        const response = await fetchAiLettersViaID({ id });
        console.log('fetchAiLettersViaID response: ', response);
        if (response && response.content) {
          setAiLetterEntries((prevEntries) => {
            const updatedEntries = prevEntries.map((entry) =>
              entry.id === id ? { ...entry, content: response.content, replyStatus: 'Y' } : entry,
            );
            console.log('Updated aiLetterEntries after fetchContentForID: ', updatedEntries);
            queryClient.setQueryData(['fetchAiLetterByID', id], response);
            return updatedEntries;
          });
        } else {
          console.log('No content found for the given ID');
        }
      } catch (error) {
        console.error('Error fetching content for ID: ', error);
      }
    },
    [queryClient],
  );

  const handleAccordionChange = useCallback(
    async (section: IAiLetterEntry) => {
      const index = aiLetterEntries.findIndex((entry) => entry.date === section.date);
      if (index !== -1) {
        if (!section.content) {
          await fetchContentForID(section.id);
        }

        setActiveSections((prevSections) => {
          if (prevSections.includes(index)) {
            return prevSections.filter((i) => i !== index);
          } else {
            return [index];
          }
        });

        if (
          flatListRef.current &&
          aiLetterEntries.length > 0 &&
          index >= 0 &&
          index < aiLetterEntries.length
        ) {
          flatListRef.current.scrollToIndex({ index, animated: true });
        }
      }
    },
    [aiLetterEntries, fetchContentForID, flatListRef],
  );

  const {
    data: monthSummaryData,
    error: monthSummaryError,
    isLoading: monthSummaryLoading,
    refetch: refetchMonthSummary,
  } = useQuery({
    queryKey: ['fetchAiLettersMonthSummary', currentDateStr],
    queryFn: () => fetchMonthSummary(currentDateStr),
    enabled: !!currentDateStr,
  });

  useFocusEffect(
    useCallback(() => {
      if (monthSummaryData && monthSummaryData.length > 0) {
        const filledData = generateDateRangeEntry(monthSummaryData);
        setAiLetterEntries(filledData);

        const todayStr = new Date().toISOString().slice(0, 10);
        const todayIndex = filledData.findIndex((entry) => entry.date === todayStr);
        const currentDayIndex = filledData.findIndex((entry) => entry.date === currentDateStr);

        if (currentDayIndex !== -1) {
          const section = filledData[currentDayIndex];
          if (!section.content) {
            fetchContentForID(section.id);
          }
          setActiveSections([currentDayIndex]);
        } else if (todayIndex !== -1) {
          const section = filledData[todayIndex];
          if (!section.content) {
            fetchContentForID(section.id);
          }
          setActiveSections([todayIndex]);
        } else {
          setActiveSections([]);
        }
      } else {
        setAiLetterEntries([]);
        setActiveSections([]);
      }
    }, [monthSummaryData, fetchContentForID, currentDateStr]),
  );

  const refetchMonthData = useCallback(
    async (newDateStr?: string) => {
      setRefreshing(true);
      if (newDateStr) {
        setCurrentDateStr(newDateStr);
      } else {
        await refetchMonthSummary();
      }
      setRefreshing(false);
      setActiveSections([]);
    },
    [refetchMonthSummary],
  );

  useEffect(() => {
    if (currentDateStr) {
      refetchMonthData(currentDateStr);
    }
  }, [currentDateStr, refetchMonthData]);

  return {
    aiLetterEntries,
    activeSections,
    setActiveSections,
    flatListRef,
    handleAccordionChange,
    isLoading: monthSummaryLoading,
    error: monthSummaryError,
    refetchMonthSummary: refetchMonthData,
    refreshing,
  };
};
