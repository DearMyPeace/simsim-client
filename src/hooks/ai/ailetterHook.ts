import { useState, useRef, useCallback, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IAiLetterEntry, IID } from '@type/IAiLetterEntry';
import { fetchAiLettersMonthSummary, fetchAiLettersViaID } from '@api/ai/get';

export const useAiLetterData = (initialDateStr: string) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [aiLetterEntries, setAiLetterEntries] = useState<IAiLetterEntry[]>([]);
  const [currentDateStr, setCurrentDateStr] = useState(initialDateStr);
  const flatListRef = useRef<FlatList>(null);

  const queryClient = useQueryClient();

  const fetchMonthSummary = (year: string, month: string): Promise<IAiLetterEntry[]> => {
    return fetchAiLettersMonthSummary({ year: parseInt(year), month: parseInt(month) });
  };

  const isCurrentMonth = (dateStr: string): boolean => {
    const [year, month] = dateStr.split('-');
    const now = new Date();
    return now.getFullYear() === parseInt(year) && now.getMonth() + 1 === parseInt(month);
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
    staleTime: isCurrentMonth(currentDateStr) ? 0 : Infinity,
    gcTime: isCurrentMonth(currentDateStr) ? 0 : Infinity,
  });

  const fetchContentForID = async (id: IID) => {
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
            entry.id === id ? { ...entry, content: response.content } : entry,
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
  };

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

        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({ index, animated: true });
        }
      }
    },
    [aiLetterEntries, fetchContentForID, queryClient],
  );

  const onScrollToIndexFailed = (info) => {
    if (info.index < 0 || info.index >= aiLetterEntries.length) {
      console.warn(`Invalid index: ${info.index}`);
      return;
    }
    const wait = new Promise((resolve) => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
    });
  };

  useEffect(() => {
    const updateActiveSections = async () => {
      if (monthSummaryData) {
        setAiLetterEntries(monthSummaryData);
        console.log('monthSummaryData: ', monthSummaryData);

        const todayStr = new Date().toISOString().slice(0, 10);
        const todayIndex = monthSummaryData.findIndex((entry) => entry.date === todayStr);
        if (todayIndex !== -1) {
          const section = monthSummaryData[todayIndex];
          if (!section.content) {
            await fetchContentForID(section.id);
          }
          setActiveSections([todayIndex]);
          if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index: todayIndex, animated: true });
          }
        }
      }
    };

    updateActiveSections();
  }, [monthSummaryData]);

  const refetchMonthData = useCallback(
    (newDateStr: string) => {
      setCurrentDateStr(newDateStr);
      refetchMonthSummary();
      setActiveSections([]);
    },
    [refetchMonthSummary],
  );

  return {
    aiLetterEntries,
    activeSections,
    setActiveSections,
    flatListRef,
    handleAccordionChange,
    onScrollToIndexFailed,
    isLoading: monthSummaryLoading,
    error: monthSummaryError,
    refetchMonthSummary: refetchMonthData,
  };
};
