import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, StyleSheet, ListRenderItem, Dimensions } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { IAiLetterEntry } from '@type/IAiLetterEntry';
import NotUsingDay from '@components/ai/NotUsingDay';
import AiLetterEntryHeader from '@components/ai/AiLetterEntryHeader';
import AiLetterEntryContent from '@components/ai/AiLetterEntryContent';
import { generateDateRange, fillDatesWithData } from '@utils/dateUtils';
import { getMockAiLetterEntries } from '@utils/test/MockTestAiLetter';

const MockTestAiLetter: React.FC = () => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [aiLetterEntries, setAiLetterEntries] = useState<IAiLetterEntry[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    const startDate = new Date('2024-07-01'); // 2024년 7월의 시작 날짜
    const endDate = new Date('2024-07-31'); // 2024년 7월의 끝 날짜
    const entries = getMockAiLetterEntries(startDate, endDate);
    setAiLetterEntries(entries);

    // 오늘 날짜에 해당하는 인덱스를 찾습니다.
    const todayDateStr = new Date().toISOString().slice(0, 10);
    const todayIndex = entries.findIndex((entry) => entry.date === todayDateStr);
    console.log(todayIndex);
    if (todayIndex !== -1) {
      setActiveSections([todayIndex]);

      setTimeout(() => {
        if (flatListRef.current) {
          const viewHeight = 50;
          const offset = viewHeight * todayIndex - screenHeight / 2;
          flatListRef.current.scrollToOffset({ offset, animated: true });
        }
      }, 0);
    }
  }, []);

  const handleAccordionChange = (section: IAiLetterEntry) => {
    const index = aiLetterEntries.findIndex((entry) => entry.date === section.date);
    setActiveSections((prevSections) => (prevSections.includes(index) ? [] : [index]));
  };

  const renderItem: ListRenderItem<IAiLetterEntry> = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
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
        ListFooterComponent={<View style={{ height: screenHeight / 2 }} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 36,
    paddingRight: 36,
    backgroundColor: 'transparent',
  },
  itemContainer: {
    backgroundColor: 'transparent',
  },
  notusingItem: {
    alignItems: 'center',
  },
});

export default MockTestAiLetter;
