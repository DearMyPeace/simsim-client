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
    onScrollToIndexFailed,
    isLoading,
    error,
    refetchMonthSummary,
    refreshing,
  } = useAiLetterData(todayDateStr);

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
            onRefresh={() => refetchMonthSummary()}
            refreshing={refreshing}
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
    paddingBottom: 20,
  },
});

export default AiLetter;
