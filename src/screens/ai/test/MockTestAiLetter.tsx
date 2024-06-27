import React, { useState, useEffect, useRef } from 'react';
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
import Entypo from 'react-native-vector-icons/Entypo';
import Accordion from 'react-native-collapsible/Accordion';
import { IAiLetterEntry } from '@type/IAiLetterEntry';
import NotUsingDay from '@components/ai/NotUsingDay';
import AiLetterEntryHeader from '@components/ai/AiLetterEntryHeader';
import AiLetterEntryContent from '@components/ai/AiLetterEntryContent';
import { generateDateRange, fillDatesWithData } from '@utils/dateUtils';
import { getMockAiLetterEntries } from '@utils/test/MockTestAiLetter';
import AiLetterEntries from '@api/mock/AiLetterEntries';

const MockTestAiLetter: React.FC = () => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [aiLetterEntries, setAiLetterEntries] = useState<IAiLetterEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 10);
  const endDate = new Date();

  useEffect(() => {
    console.log('aiLetterEntries:', aiLetterEntries);
  }, [aiLetterEntries]);

  useEffect(() => {
    const entries = getMockAiLetterEntries(startDate, endDate);
    setAiLetterEntries(entries);
  }, []);

  const loadMoreData = () => {
    // id가 있는 첫 번째 data를 찾습니다.
    const firstEntryWithId = aiLetterEntries.find((entry) => !entry.isPlaceholder);
    const firstEntryId = firstEntryWithId?.id;

    if (firstEntryId) {
      const firstEntryIndex = AiLetterEntries.findIndex((entry) => entry.id === firstEntryId);

      if (firstEntryIndex > 0) {
        // 추가로 가져올 항목의 범위를 계산합니다.
        const start = Math.max(firstEntryIndex - 5, 0);
        const additionalEntries = AiLetterEntries.slice(start, firstEntryIndex);

        // 새로운 항목을 기존 항목 앞에 추가합니다.
        const newEntries = [...additionalEntries, ...aiLetterEntries];

        // 새로운 항목들의 날짜 범위를 계산합니다.
        const firstNewEntryDate = new Date(newEntries[0].date);
        const updatedStartDate = new Date(
          Math.min(startDate.getTime(), firstNewEntryDate.getTime()),
        );
        const updatedEndDate = new Date();

        // 날짜 범위에 맞춰서 데이터 채우기
        setAiLetterEntries(
          fillDatesWithData(generateDateRange(updatedStartDate, endDate), newEntries),
        );
      }
    }
  };

  const handleLoadMore = () => {
    if (!loading) {
      setLoading(true);
      loadMoreData();
      setLoading(false);
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

    if (consecutiveNotUsingDayCount > 1) {
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

  const onScrollToIndexFailed = (info) => {
    const wait = new Promise((resolve) => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={aiLetterEntries}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
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

export default MockTestAiLetter;
