import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, FlatList, ListRenderItem, ViewToken } from 'react-native';
import DiaryCard from '@components/diary/carousel/DiaryCard';
import DiaryPagination from '@components/diary/carousel/DiaryPagination';
import { IDiary, NEW_DIARY } from '@type/Diary';
import { CARD_WIDTH } from '@utils/Sizing';
import useDiaryHook from '@hooks/diary/diaryHook';
import CenterViewText from '@components/common/CenterViewText';
import { useRecoilValue } from 'recoil';
import { selectedDateStatus } from '@stores/tense';

const DiaryCarousel = () => {
  const selectedDate = useRecoilValue(selectedDateStatus);
  const { data, isPending, isError, sendStatus } = useDiaryHook(selectedDate);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const flatListRef = useRef<FlatList<IDiary>>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }).current;

  const renderDiaries: ListRenderItem<IDiary> = useCallback(
    ({ item }) => (
      <DiaryCard
        id={item.id}
        createdTime={item.createdTime}
        content={item.content}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        isLetterSent={sendStatus}
      />
    ),
    [data],
  );

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: 0, animated: true });
      setActiveIndex(0);
    }
  }, [selectedDate]);

  if (isPending) {
    return <CenterViewText text="심심기록을 가져오는 중입니다" />;
  }

  if (isError) {
    return (
      <CenterViewText text="심심기록을 가져올 수 없습니다" textStyle={{ textAlign: 'center' }} />
    );
  }

  if (data.length === 0) {
    return (
      <View style={[styles.container, { marginBottom: 28 }]}>
        <DiaryCard
          id={NEW_DIARY}
          createdTime=""
          content=""
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          isLetterSent={sendStatus}
        />
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
        keyExtractor={(item) => item.id.toString()}
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
    minHeight: 200,
  },
});
