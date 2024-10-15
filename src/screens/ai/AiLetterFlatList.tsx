import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, StyleSheet, ListRenderItem, RefreshControl, Platform } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { IAiLetterEntry } from '@type/IAiLetterEntry';
import NotUsingDay from '@components/ai/NotUsingDay';
import AiLetterEntryHeader from '@components/ai/AiLetterEntryHeader';
import AiLetterEntryContent from '@components/ai/AiLetterEntryContent';
import AiLetterEmptyView from '@screens/ai/AiLetterEmptyView';
import CustomRefreshControlWrapper from '@screens/common/CustomRefreshControlWrapper';

interface AiLetterFlatListProps {
  aiLetterEntries: IAiLetterEntry[];
  activeSections: number[];
  flatListRef: React.RefObject<FlatList>;
  handleAccordionChange: (section: IAiLetterEntry) => void;
  onRefresh: () => void;
  refreshing: boolean;
}

const AiLetterFlatList: React.FC<AiLetterFlatListProps> = ({
  aiLetterEntries,
  activeSections,
  flatListRef,
  handleAccordionChange,
  onRefresh,
  refreshing,
}) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [itemHeight, setItemHeight] = useState<number>(0);
  const defaultItemHeight = 40;

  useEffect(() => {
    setIsEmpty(aiLetterEntries.length === 0);
  }, [aiLetterEntries]);

  useEffect(() => {
    if (flatListRef.current && activeSections.length > 0) {
      flatListRef.current.scrollToIndex({ index: activeSections[0], animated: true });
    }
  }, [activeSections, flatListRef]);

  // 아이템의 높이를 측정하는 함수
  const onItemLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setItemHeight(height); // 첫 번째 아이템의 높이를 저장
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
      <View
        key={item.id ? item.id.toString() : `${item.date}-${index}`}
        onLayout={index === 0 ? onItemLayout : undefined}
      >
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
                handleAccordionChange={() => handleAccordionChange(section)}
              />
            )}
            renderContent={(section) => <AiLetterEntryContent section={section} />}
            onChange={() => handleAccordionChange(item)}
          />
        )}
      </View>
    );
  };

  if (isEmpty) {
    return <AiLetterEmptyView />;
  }

  const getItemLayout = (_, index) => ({
    length: defaultItemHeight,
    offset: defaultItemHeight * index,
    index,
  });

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={aiLetterEntries}
        renderItem={renderItem}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : `${item.date}-${index}`)}
        showsVerticalScrollIndicator={false}
        getItemLayout={getItemLayout}
        ListFooterComponent={<View style={{ height: itemHeight * 3 || defaultItemHeight * 3 }} />}
      />
      {/* <CustomRefreshControlWrapper /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  notusingItem: {
    alignItems: 'center',
  },
});

export default AiLetterFlatList;
