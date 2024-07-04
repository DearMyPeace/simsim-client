// src/screens/ai/AiLetter.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useAiLetterData } from '@hooks/ai/ailetterHook';
import AiLetterCalendar from '@screens/ai/AiLetterCalendar';
import MockTestAiLetter from './test/MockTestAiLetter';
import AiLetterFlatList from '@screens/ai/AiLetterFlatList';

const AiLetter: React.FC = () => {
  const todayDateStr = new Date().toISOString().slice(0, 10);

  const {
    aiLetterEntries,
    activeSections,
    flatListRef,
    handleAccordionChange,
    isLoading,
    error,
    refetchMonthSummary,
  } = useAiLetterData(todayDateStr);

  const onScrollToIndexFailed = (info) => {
    const wait = new Promise((resolve) => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
    });
  };

  const handleMonthChange = (date) => {
    refetchMonthSummary();
  };

  useEffect(() => {
    if (error) {
      // 오류 처리 로직 추가
    }
  }, [error]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="gray" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AiLetterCalendar onMonthChange={handleMonthChange}>
        <AiLetterFlatList
          aiLetterEntries={aiLetterEntries}
          activeSections={activeSections}
          flatListRef={flatListRef}
          handleAccordionChange={handleAccordionChange}
          onScrollToIndexFailed={onScrollToIndexFailed}
        />
      </AiLetterCalendar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 36,
    paddingRight: 36,
    backgroundColor: 'transparent',
  },
});

export default AiLetter;
