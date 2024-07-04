// src/components/ai/AiLetterFlatList.tsx
import React from 'react';
import { View, FlatList, StyleSheet, ListRenderItem, RefreshControl } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { IAiLetterEntry } from '@type/IAiLetterEntry';
import NotUsingDay from '@components/ai/NotUsingDay';
import AiLetterEntryHeader from '@components/ai/AiLetterEntryHeader';
import AiLetterEntryContent from '@components/ai/AiLetterEntryContent';

interface AiLetterFlatListProps {
  aiLetterEntries: IAiLetterEntry[];
  activeSections: number[];
  loading: boolean;
  flatListRef: React.RefObject<FlatList>;
  handleAccordionChange: (section: IAiLetterEntry) => void;
  onScrollToIndexFailed: (info: any) => void;
}

const AiLetterFlatList: React.FC<AiLetterFlatListProps> = ({
  aiLetterEntries,
  activeSections,
  loading,
  flatListRef,
  handleAccordionChange,
  onScrollToIndexFailed,
}) => {
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

  return (
    <FlatList
      ref={flatListRef}
      data={aiLetterEntries}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      onScrollToIndexFailed={onScrollToIndexFailed}
    />
  );
};

const styles = StyleSheet.create({
  notusingItem: {
    alignItems: 'center',
  },
});

export default AiLetterFlatList;