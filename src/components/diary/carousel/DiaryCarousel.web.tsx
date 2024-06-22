import React, { act, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DiaryCard from '@components/diary/carousel/DiaryCard';
import DiaryPagination from '@components/diary/carousel/DiaryPagination';
import DiaryArrowIcons from '@components/diary/carousel/DiaryArrowIcons';
import { IDiaryCarouselProps } from '@type/Diary';
import useDiaryHook from '@hooks/diary/diaryHook';
import CenterViewText from '@components/common/CenterViewText';

const DiaryCarousel = ({ selectedDate, dateStatus }: IDiaryCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data, isPending, isError } = useDiaryHook(selectedDate);

  useEffect(() => {
    setActiveIndex(0);
  }, [data]);

  if (isPending) {
    return <CenterViewText text="심심 기록을 가져오는 중입니다." />;
  }

  if (isError) {
    return <CenterViewText text="에러가 발생했습니다" />;
  }

  const onLeftPress = () => {
    if (activeIndex === 0) return;
    setActiveIndex(activeIndex - 1);
  };

  const onRightPress = () => {
    if (activeIndex === data.length - 1) return;
    setActiveIndex(activeIndex + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {activeIndex > 0 && <DiaryArrowIcons direction="left" onPress={onLeftPress} />}
        {activeIndex < data.length - 1 && (
          <DiaryArrowIcons direction="right" onPress={onRightPress} />
        )}
        <DiaryCard
          createdTime={data[activeIndex]?.createdTime || ''}
          content={data[activeIndex]?.content || ''}
          dateStatus={dateStatus}
        />
      </View>
      <DiaryPagination activeIndex={activeIndex} diaryList={data} />
    </View>
  );
};

export default DiaryCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '90%',
    position: 'relative',
  },
});
