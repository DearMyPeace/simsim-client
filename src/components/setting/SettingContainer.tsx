import React from 'react';
import MyText from '@components/common/MyText';
import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { snackMessage } from '@stores/snackMessage';
import MySnackbar from '@components/common/MySnackbar';

interface ISettingContainerProps {
  children: React.ReactNode;
  alarmSection?: React.ReactNode;
  modals?: React.ReactNode;
}

const SettingContainer = ({
  children,
  alarmSection = null,
  modals = null,
}: ISettingContainerProps) => {
  const snackbarText = useRecoilValue(snackMessage);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {alarmSection}
        <View style={styles.basicPadding}>{children}</View>
      </ScrollView>
      {modals}
      <View style={styles.footer}>
        <MyText size={11}>심심조각 초판</MyText>
      </View>
      <MySnackbar visible={snackbarText !== ''} style={styles.snackbar} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    width: '100%',
    paddingTop: 50,
    paddingBottom: 10,
  },
  basicPadding: {
    paddingHorizontal: 24,
  },
  footer: {
    paddingVertical: 7,
    marginBottom: 15,
  },
  snackbar: {
    marginBottom: 45,
    flex: 1,
  },
});

export default SettingContainer;
