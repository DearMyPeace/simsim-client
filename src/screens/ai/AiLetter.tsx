import React, { useState, useRef } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ListRenderItem,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  RefreshControl,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import Entypo from 'react-native-vector-icons/Entypo';
import Accordion from 'react-native-collapsible/Accordion';
import { IAiLetterEntry } from '@type/IAiLetterEntry';
import NotUsingDay from '@components/ai/NotUsingDay';
import AiLetterEntryHeader from '@components/ai/AiLetterEntryHeader';
import AiLetterEntryContent from '@components/ai/AiLetterEntryContent';
import { generateDateRange, fillDatesWithData } from '@utils/dateUtils';
import { fetchAiLetters, fetchNextAiLetter } from '@api/ai/api';
import MockTestAiLetter from '@screens/ai/test/MockTestAiLetter';

const AiLetter: React.FC = () => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [aiLetterEntries, setAiLetterEntries] = useState<IAiLetterEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  let startDate = new Date();
  let endDate = new Date();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['aiLetters', 1, 3],
    queryFn: () => fetchAiLetters(1, 3),
    onSuccess: (data) => {
      if (data.length > 0) {
        startDate = new Date(data[0].date);
        endDate = new Date(data[data.length - 1].date);
      }

      const initialEntries = fillDatesWithData(generateDateRange(startDate, endDate), data);

      setAiLetterEntries(initialEntries);

      const todayDateStr = new Date().toISOString().slice(0, 10);
      const todayIndex = initialEntries.findIndex((entry) => entry.date === todayDateStr);
      if (todayIndex !== -1) {
        setActiveSections([todayIndex]);
        setTimeout(() => {
          if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index: todayIndex, animated: true });
          }
        }, 0);
      }
    },
  });

  const loadMoreData = async () => {
    try {
      const firstEntryId = aiLetterEntries[0]?.id;
      const firstEntryIndex = data?.findIndex((entry) => entry.id === firstEntryId);

      if (firstEntryIndex > 0) {
        const additionalEntries = await fetchNextAiLetter(firstEntryIndex - 5, 5);
        const newEntries = [...additionalEntries, ...aiLetterEntries];

        const firstNewEntryDate = new Date(newEntries[0].date);
        const updatedStartDate = new Date(
          Math.min(startDate.getTime(), firstNewEntryDate.getTime()),
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
  };

  const handleLoadMore = () => {
    if (!loading) {
      setLoading(true);
      loadMoreData();
    }
  };

  const handleAccordionChange = (section: IAiLetterEntry) => {
    const index = aiLetterEntries.findIndex((entry) => entry.date === section.date);
    setActiveSections((prevSections) => (prevSections.includes(index) ? [] : [index]));
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
    }
  };

  const renderItem: ListRenderItem<IAiLetterEntry> = ({ item, index }) => {
    let consecutiveNotUsingDayCount = 0;

    for (let i = index; i < aiLetterEntries.length; i++) {
      if (aiLetterEntries[i].isPlaceholder) {
        consecutiveNotUsingDayCount++;
      } else {
        break;
      }
    }

    if (consecutiveNotUsingDayCount > 3) {
      return null;
    }

    return (
      <View>
        {item.isPlaceholder ? (
          <View style={styles.notusingItem}>
            <NotUsingDay date={item.date} />
          </View>
        ) : (
          <Accordion
            sections={[item]}
            activeSections={activeSections.includes(index) ? [0] : []}
            renderHeader={(section, _, isActive) => (
              <AiLetterEntryHeader
                section={section}
                isActive={isActive}
                handleAccordionChange={handleAccordionChange}
              />
            )}
            renderContent={(section) => <AiLetterEntryContent section={section} />}
            onChange={() => handleAccordionChange(item)}
          />
        )}
      </View>
    );
  };

  const getItemLayout = (data, index) => ({
    length: 50, // 항목의 고정된 높이 (필요에 따라 조정)
    offset: 50 * index,
    index,
  });

  const onScrollToIndexFailed = (info) => {
    const wait = new Promise((resolve) => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
    });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  if (error) {
    return <MockTestAiLetter />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={aiLetterEntries}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        getItemLayout={getItemLayout}
        onScrollToIndexFailed={onScrollToIndexFailed}
        refreshControl={
          Platform.OS === 'web' ? null : (
            <RefreshControl
              refreshing={loading}
              onRefresh={handleLoadMore}
              tintColor="gray"
              colors={['gray']}
            />
          )
        }
        ListHeaderComponent={
          Platform.OS === 'web' && (
            <TouchableOpacity
              style={styles.loadMoreButton}
              onPress={handleLoadMore}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="gray" />
              ) : (
                <Entypo name="chevron-small-up" color="gray" size={26} />
              )}
            </TouchableOpacity>
          )
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  loadMoreButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  notusingItem: {
    alignItems: 'center',
  },
});

export default AiLetter;
