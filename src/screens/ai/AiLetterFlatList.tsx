import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  ListRenderItem,
  RefreshControl,
  Platform,
} from 'react-native';
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
  onScrollToIndexFailed: (info: any) => void;
  onRefresh: () => void;
  refreshing: boolean;
}

const AiLetterFlatList: React.FC<AiLetterFlatListProps> = ({
  aiLetterEntries,
  activeSections,
  flatListRef,
  handleAccordionChange,
  onScrollToIndexFailed,
  onRefresh,
  refreshing,
}) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    setIsEmpty(aiLetterEntries.length === 0);
  }, [aiLetterEntries]);

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
      <View key={item.id ? item.id.toString() : `${item.date}-${index}`}>
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

  if (isEmpty) {
    return <AiLetterEmptyView />;
  }

  const getItemLayout = (_, index) => ({
    length: 70,
    offset: 70 * index,
    index,
  });

  return (
    <ScrollView
      ref={scrollViewRef}
      refreshControl={
        <RefreshControl
          style={styles.hideComponent}
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="transparent"
          colors={['transparent']}
        />
      }
    >
      {Platform.OS !== 'web' && <CustomRefreshControlWrapper />}
      <FlatList
        ref={flatListRef}
        data={aiLetterEntries}
        renderItem={renderItem}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : `${item.date}-${index}`)}
        onScrollToIndexFailed={onScrollToIndexFailed}
        showsVerticalScrollIndicator={false}
        getItemLayout={getItemLayout}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  notusingItem: {
    alignItems: 'center',
  },
  hideComponent: {
    display: 'none',
  },
});

export default AiLetterFlatList;
