import React, { useCallback, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  Animated,
  ListRenderItem,
  ViewToken,
  Platform,
} from 'react-native';
import DiaryList from '@api/mock/DiaryList';
import DiaryCard from '@components/diary/carousel/DiaryCard';
import { IDiary } from '@type/Diary';

const { width } = Dimensions.get('screen');

const CARD_WIDTH = Platform.OS === 'web' ? 800 : width - 32;

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
    ({ item }) => <DiaryCard createdTime={item.createdTime} content={item.content} />,
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
      <View style={styles.pagination}>
        {DiaryList.map((diary, index) => {
          return (
            <View key={index} style={[styles.dot, activeIndex === index && styles.activeDot]} />
          );
        })}
      </View>
    </View>
  );
};

export default DiaryCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#828282',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#333333',
  },
});
