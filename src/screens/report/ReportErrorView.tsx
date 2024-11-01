import React from 'react';
import { StyleSheet, View } from 'react-native';

import MyText from '@components/common/MyText';
import ErrorCircle from '@assets/svg/icons/ant-design--exclamation-circle-outlined.svg';
import { fontMedium } from '@utils/Sizing';

const ReportErrorView = () => {
  return (
    <View style={styles.container}>
      <View style={styles.emptyContainer}>
        <ErrorCircle width={120} height={120} />
        <MyText style={styles.emptyText}>조각을 표시할 수 없어요.</MyText>
      </View>
    </View>
  );
};

export default ReportErrorView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 10,
    fontSize: fontMedium,
    color: 'gray',
  },
});
