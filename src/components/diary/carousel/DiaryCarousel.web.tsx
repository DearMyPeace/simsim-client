import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DiaryList from '@api/mock/DiaryList';
import DiaryCard from '@components/diary/carousel/DiaryCard';
import { format } from 'date-fns';
import DiaryPagination from './DiaryPagination';
import DiaryArrowIcons from './DiaryArrowIcons';
import { IDiary } from '@type/Diary';

const DiaryCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [diary, setDiary] = useState<IDiary>(DiaryList[activeIndex]);

  useEffect(() => {
    setDiary((prevDiary) => ({
      ...prevDiary,
      createdTime: format(DiaryList[activeIndex].createdTime, 'hh:mm a'),
    }));
  }, [activeIndex]);

  const onLeftPress = () => {
    if (activeIndex === 0) return;
    setActiveIndex(activeIndex - 1);
  };

  const onRightPress = () => {
    if (activeIndex === DiaryList.length - 1) return;
    setActiveIndex(activeIndex + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {activeIndex > 0 && <DiaryArrowIcons direction="left" onPress={onLeftPress} />}
        <DiaryCard createdTime={diary.createdTime} content={diary.content} />
        {activeIndex < 2 && <DiaryArrowIcons direction="right" onPress={onRightPress} />}
      </View>
      <DiaryPagination activeIndex={activeIndex} />
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
