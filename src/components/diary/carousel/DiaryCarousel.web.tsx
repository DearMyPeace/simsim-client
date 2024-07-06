import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DiaryCard from '@components/diary/carousel/DiaryCard';
import DiaryArrowIcons from '@components/diary/carousel/DiaryArrowIcons';
import { NEW_DIARY } from '@type/Diary';
import useDiaryHook from '@hooks/diary/diaryHook';
import CenterViewText from '@components/common/CenterViewText';
import { useRecoilValue } from 'recoil';
import { selectedDateStatus } from '@stores/tense';

const DiaryCarousel = () => {
  const selectedDate = useRecoilValue(selectedDateStatus);
  const [activeIndex, setActiveIndex] = useState(0);
  const { data, isPending, isError, isSuccess, sendStatus } = useDiaryHook(selectedDate);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
    setIsEditing(false);
  }, [selectedDate]);

  if (isPending) {
    return <CenterViewText text="심심기록을 가져오는 중입니다." />;
  }

  if (isError) {
    return <CenterViewText text="심심기록을 가져올 수 없습니다" />;
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
        {isSuccess && !isEditing && activeIndex > 0 && (
          <DiaryArrowIcons direction="left" onPress={onLeftPress} />
        )}
        {isSuccess && !isEditing && activeIndex < data.length - 1 && (
          <DiaryArrowIcons direction="right" onPress={onRightPress} />
        )}
        <DiaryCard
          id={data[activeIndex]?.id || NEW_DIARY}
          createdTime={data[activeIndex]?.createdTime || ''}
          content={data[activeIndex]?.content || ''}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          isLetterSent={sendStatus}
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
