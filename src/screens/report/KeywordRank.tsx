import React from 'react';
import { StyleSheet, View } from 'react-native';
import MyText from '@components/common/MyText';
import MyPressable from '@components/common/MyPressable';
import { fontMedium } from '@utils/Sizing';

interface IKeywordRankProps {
  keywords: string[];
  onKeywordPress: (rank: number) => void;
}

function KeywordRank({ keywords, onKeywordPress }: IKeywordRankProps) {
  return (
    <View style={styles.container}>
      {keywords.map((keyword, index) => (
        <MyPressable
          key={keyword}
          onPress={() => onKeywordPress(index + 1)}
          containerStyle={styles.item}
        >
          <MyText bold size={fontMedium}>{`${index + 1}. ${keyword}`}</MyText>
        </MyPressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexGrow: 1,
    paddingHorizontal: 16,
    width: '100%',
  },
  item: {
    padding: 8,
    width: '100%',
  },
});

export default KeywordRank;
