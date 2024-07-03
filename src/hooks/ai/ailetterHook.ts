import { useState, useRef, useEffect, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IAiLetterEntry } from '@type/IAiLetterEntry';
import { generateDateRange, fillDatesWithData } from '@utils/dateUtils';
import { fetchNextAiLetter, fetchTodayAiLetters } from '@api/ai/get';
import { postAiLetters } from '@api/ai/post';

export const useAiLetterData = (todayDateStr: string) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [aiLetterEntries, setAiLetterEntries] = useState<IAiLetterEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const startDate = useRef(new Date());
  const endDate = useRef(new Date());

  const queryClient = useQueryClient();

  const {
    data: initialData,
    error: initialError,
    isLoading: initialLoading,
  } = useQuery({
    queryKey: ['fetchTodayAiLetters', todayDateStr],
    queryFn: () => fetchTodayAiLetters(5),
    onSuccess: (data) => {
      if (data.length > 0) {
        startDate.current = new Date(data[0].date);
        endDate.current = new Date(data[data.length - 1].date);
      }

      const initialEntries = fillDatesWithData(
        generateDateRange(startDate.current, endDate.current),
        data,
      );

      setAiLetterEntries(initialEntries);

      const todayIndex = initialEntries.findIndex((entry) => entry.date === todayDateStr);
      if (todayIndex !== -1) {
        setActiveSections([todayIndex]);
        setTimeout(() => {
          if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index: todayIndex, animated: true });
          }
        }, 0);
      }

      // fetch postAiLetters only after fetchTodayAiLetters is successful
      queryClient.prefetchQuery({
        queryKey: ['postAiLetters', todayDateStr],
        queryFn: () => postAiLetters({ targetDate: todayDateStr }),
      });
    },
  });

  const {
    data: postData,
    error: postError,
    isLoading: postLoading,
  } = useQuery({
    queryKey: ['postAiLetters', todayDateStr],
    queryFn: () => postAiLetters({ targetDate: todayDateStr }),
    enabled: !!initialData,
    onSuccess: (data) => {
      if (data && data.length > 0) {
        const newEntries = fillDatesWithData(
          generateDateRange(startDate.current, endDate.current),
          data,
        );
        setAiLetterEntries((prevEntries) => [
          ...prevEntries,
          ...newEntries.filter(
            (newEntry) => !prevEntries.some((entry) => entry.date === newEntry.date),
          ),
        ]);
      }
    },
  });

  useEffect(() => {
    if (initialData) {
      queryClient.invalidateQueries(['postAiLetters', todayDateStr]);
    }
  }, [initialData, todayDateStr, queryClient]);

  const loadMoreData = useCallback(async () => {
    try {
      const firstEntryWithId = aiLetterEntries.find((entry) => !entry.isPlaceholder);
      const firstEntryId = firstEntryWithId?.id;

      if (firstEntryId) {
        const additionalEntries = await fetchNextAiLetter(firstEntryId, 5);
        const newEntries = [...additionalEntries, ...aiLetterEntries];

        const firstNewEntryDate = new Date(newEntries[0].date);
        const updatedStartDate = new Date(
          Math.min(startDate.current.getTime(), firstNewEntryDate.getTime()),
        );
        const updatedEndDate = new Date();
        setAiLetterEntries(
          fillDatesWithData(generateDateRange(updatedStartDate, updatedEndDate), newEntries),
        );
      }
    } catch (error) {
      console.error('Error loading more data:', error);
    } finally {
      setLoading(false);
    }
  }, [aiLetterEntries]);

  const handleLoadMore = useCallback(() => {
    if (!loading) {
      setLoading(true);
      loadMoreData();
    }
  }, [loading, loadMoreData]);

  const handleAccordionChange = useCallback(
    (section: IAiLetterEntry) => {
      const index = aiLetterEntries.findIndex((entry) => entry.date === section.date);
      setActiveSections((prevSections) => (prevSections.includes(index) ? [] : [index]));
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
    loading,
    flatListRef,
    handleLoadMore,
    handleAccordionChange,
    isLoading: initialLoading || postLoading,
    error: initialError || postError,
  };
};
