import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAiLetterData } from '@hooks/ai/ailetterHook';
import AiLetterCalendar from '@screens/ai/AiLetterCalendar';
import AiLetterFlatList from '@screens/ai/AiLetterFlatList';
import AiLetterLoadingView from '@screens/ai/AiLetterLoadingView';
import AiLetterErrorView from '@screens/ai/AiLetterErrorView';
import { useSelectedDate } from '@hooks/common/useSelectedDate';

const AiLetter: React.FC = () => {
  const { tense } = useSelectedDate();
  const targetDateStr = new Date(tense).toISOString().slice(0, 10);
  console.log('target Date Str', targetDateStr);

  const {
    aiLetterEntries,
    activeSections,
    flatListRef,
    handleAccordionChange,
    isLoading,
    error,
    refetchMonthSummary,
    refreshing,
  } = useAiLetterData(targetDateStr);

  const handleMonthChange = (newDateStr: string) => {
    refetchMonthSummary(newDateStr);
  };

  return (
    <View style={styles.container}>
      <AiLetterCalendar targetDateStr={targetDateStr} onMonthChange={handleMonthChange}>
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
