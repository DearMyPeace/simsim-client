import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, StyleSheet, ListRenderItem, LayoutChangeEvent } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { IAiLetterEntry } from '@type/IAiLetterEntry';
import NotUsingDay from '@components/ai/NotUsingDay';
import AiLetterEntryHeader from '@components/ai/AiLetterEntryHeader';
import AiLetterEntryContent from '@components/ai/AiLetterEntryContent';
import AiLetterEmptyView from '@screens/ai/AiLetterEmptyView';

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
  const [itemHeights, setItemHeights] = useState<{ [key: number]: number }>({});
  const scrollOffset = 40;
  const defaultItemHeight = 57;

  useEffect(() => {
    setIsEmpty(aiLetterEntries.length === 0);
  }, [aiLetterEntries]);

  useEffect(() => {
    if (flatListRef.current && activeSections.length > 0) {
      const index = activeSections[0];
      let offset = 0;

      for (let i = 0; i < index; i++) {
        const itemHeight = itemHeights[i] || defaultItemHeight;

        if (aiLetterEntries[i].isPlaceholder) {
          continue;
        } else {
          offset += itemHeight;
        }
      }

      flatListRef.current.scrollToOffset({
        offset: offset - scrollOffset,
        animated: true,
      });
    }
  }, [activeSections, flatListRef, itemHeights, aiLetterEntries]);

  const onItemLayout = (index: number) => (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setItemHeights((prevHeights) => ({
      ...prevHeights,
      [index]: height,
    }));
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
        onLayout={onItemLayout(index)}
      >
        {item.isPlaceholder ? (
          <View style={styles.notusingItem} onLayout={onItemLayout(index)}>
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

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={aiLetterEntries}
        renderItem={renderItem}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : `${item.date}-${index}`)}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 120 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  notusingItem: {
    alignItems: 'center',
  },
});

export default AiLetterFlatList;
