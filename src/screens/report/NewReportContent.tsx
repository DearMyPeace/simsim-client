import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import MyText from '@components/common/MyText';
import { fontMedium } from '@utils/Sizing';
import { appColor1 } from '@utils/colors';

const NewReportContent = ({ keyword, content }) => {
  return (
    <View style={styles.container}>
      <MyText size={fontMedium} bold>
        {keyword}
      </MyText>
      <ScrollView contentContainerStyle={{ maxHeight: 300 }} style={{ marginTop: 5 }}>
        <MyText>{content}</MyText>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColor1,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: 16,
    width: '100%',
    flexGrow: 1,
  },
});

export default NewReportContent;
