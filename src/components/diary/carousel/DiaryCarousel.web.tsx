import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DiaryCard from '@components/diary/carousel/DiaryCard';
import DiaryArrowIcons from '@components/diary/carousel/DiaryArrowIcons';
import { NEW_DIARY } from '@type/Diary';
import useDiaryHook from '@hooks/diary/diaryHook';
import { useRecoilValue } from 'recoil';
import { selectedDateStatus } from '@stores/tense';

const DiaryCarousel = () => {
  const selectedDate = useRecoilValue(selectedDateStatus);
  const [activeIndex, setActiveIndex] = useState(0);
  const { data, isSuccess, sendStatus } = useDiaryHook(selectedDate);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
    setIsEditing(false);
  }, [selectedDate]);

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
        {isSuccess && !isEditing && activeIndex > 0 && (
          <DiaryArrowIcons direction="left" onPress={onLeftPress} />
        )}
        {isSuccess && !isEditing && activeIndex < data.length - 1 && (
          <DiaryArrowIcons direction="right" onPress={onRightPress} />
        )}
        <DiaryCard
          id={data[activeIndex]?.id || NEW_DIARY}
          content={data[activeIndex]?.content || ''}
          createdDate={data[activeIndex]?.createdDate}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          isLetterSent={sendStatus}
          isSuccess={isSuccess}
        />
      </View>
    </View>
  );
};

export default DiaryCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    minHeight: 200,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
});
