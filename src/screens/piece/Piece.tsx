import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { fontBasic } from '@utils/Sizing';
import Report from '@screens/report/ReportView';

const Piece = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <Report />
        {/* <View style={styles.reportContainer}>
          <MyText style={styles.reportHeader}>리포트</MyText>
          <MyText style={styles.reportText}>2주의 기록이 쌓이면 리포트가 제공됩니다. </MyText>
        </View> */}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  reportHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  reportText: {
    fontSize: fontBasic,
    color: '#555',
  },
});

export default Piece;
