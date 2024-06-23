import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, FlatList, ListRenderItem, ViewToken } from 'react-native';
import DiaryCard from '@components/diary/carousel/DiaryCard';
import DiaryPagination from '@components/diary/carousel/DiaryPagination';
import { IDiary, IDiaryCarouselProps } from '@type/Diary';
import { CARD_WIDTH } from '@utils/Sizing';
import useDiaryHook from '@hooks/diary/diaryHook';
import CenterViewText from '@components/common/CenterViewText';

const DiaryCarousel = ({ selectedDate, dateStatus }: IDiaryCarouselProps) => {
  const { data, isPending, isError } = useDiaryHook(selectedDate);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<IDiary>>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }).current;

  const renderDiaries: ListRenderItem<IDiary> = useCallback(
    ({ item }) => (
      <DiaryCard createdTime={item.createdTime} content={item.content} dateStatus={dateStatus} />
    ),
    [data],
  );

  useEffect(() => {
    console.log('selectedDate changed:', selectedDate);
    console.log('flatListRef.current:', flatListRef.current);
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: 0, animated: true });
      setActiveIndex(0);
    }
  }, [selectedDate]);

  if (isPending) {
    return <CenterViewText text="심심 기록을 가져오는 중입니다." />;
  }

  if (isError) {
    return <CenterViewText text="에러가 발생했습니다" />;
  }

  if (data.length === 0) {
    return (
      <View style={[styles.container, { marginBottom: 28 }]}>
        <DiaryCard createdTime="" content="" dateStatus={dateStatus} />
        <DiaryPagination activeIndex={0} diaryList={data} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
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
        decelerationRate="fast"
        data={data}
        renderItem={renderDiaries}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        keyboardShouldPersistTaps="always"
      />
      <DiaryPagination activeIndex={activeIndex} diaryList={data} />
    </View>
  );
};

export default DiaryCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});