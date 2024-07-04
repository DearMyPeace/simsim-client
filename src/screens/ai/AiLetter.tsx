// src/screens/ai/AiLetter.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAiLetterData } from '@hooks/ai/ailetterHook';
import AiLetterCalendar from '@screens/ai/AiLetterCalendar';
import AiLetterFlatList from '@screens/ai/AiLetterFlatList';
import AiLetterLoadingView from '@screens/ai/AiLetterLoadingView';
import AiLetterErrorView from '@screens/ai/AiLetterErrorView';

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

  console.log('AiLetter entries: ', aiLetterEntries);

  const onScrollToIndexFailed = (info) => {
    const wait = new Promise((resolve) => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
    });
  };

  const handleMonthChange = (newDateStr: string) => {
    refetchMonthSummary(newDateStr);
  };

  return (
    <View style={styles.container}>
      <AiLetterCalendar onMonthChange={handleMonthChange}>
        {isLoading ? (
          <AiLetterLoadingView />
        ) : error ? (
          <AiLetterErrorView />
        ) : (
          <AiLetterFlatList
            aiLetterEntries={aiLetterEntries}
            activeSections={activeSections}
            flatListRef={flatListRef}
            handleAccordionChange={handleAccordionChange}
            onScrollToIndexFailed={onScrollToIndexFailed}
          />
        )}
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
