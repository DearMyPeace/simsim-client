import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, View, FlatList, Animated, ListRenderItem, ViewToken } from 'react-native';
import DiaryList from '@api/mock/DiaryList';
import DiaryCard from '@components/diary/carousel/DiaryCard';
import { IDiary } from '@type/Diary';
import { CARD_WIDTH } from '@utils/Sizing';
import { format } from 'date-fns';
import DiaryPagination from './DiaryPagination';

const DiaryCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
    useNativeDriver: false,
  });

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }).current;

  const renderItem: ListRenderItem<IDiary> = useCallback(
    ({ item }) => (
      <DiaryCard createdTime={format(item.createdTime, 'hh:mm a')} content={item.content} />
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        pagingEnabled
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        getItemLayout={(data, index) => ({
          length: CARD_WIDTH,
          offset: CARD_WIDTH * index,
          index,
        })}
        snapToInterval={CARD_WIDTH}
        decelerationRate="normal"
        snapToEnd={false}
        data={DiaryList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        onViewableItemsChanged={onViewableItemsChanged}
      />
      <DiaryPagination activeIndex={activeIndex} />
    </View>
  );
};

export default DiaryCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
