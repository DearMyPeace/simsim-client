import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DiaryCard from '@components/diary/carousel/DiaryCard';
import DiaryPagination from '@components/diary/carousel/DiaryPagination';
import DiaryArrowIcons from '@components/diary/carousel/DiaryArrowIcons';
import { IDiaryCarouselProps } from '@type/Diary';
import useDiaryHook from '@hooks/diary/diaryHook';
import MyText from '@components/common/MyText';

const DiaryCarousel = ({ selectedDate, dateStatus }: IDiaryCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data, isPending, isError } = useDiaryHook(selectedDate);

  useEffect(() => {
    setActiveIndex(0);
    console.log('diary list!!!', data);
  }, [data]);

  if (isPending) {
    return <MyText>일기를 불러오고 있습니다.</MyText>;
  }

  if (isError) {
    return <MyText>에러가 발생했습니다.</MyText>;
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
