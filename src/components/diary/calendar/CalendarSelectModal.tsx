import React, { useRef, useEffect } from 'react';
import MyText from '@components/common/MyText';
import { appColor3 } from '@utils/colors';
import { kMonth } from '@utils/localeConfig';
import { fontLarge } from '@utils/Sizing';
import {
  View,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
} from 'react-native';

interface IMonthItem {
  month: string;
  index: number;
}

interface ICalendarSelectModalProps {
  isModalVisible: boolean;
  handleModalDismiss: () => void;
  selectedMonth: number;
  selectedYear: number;
  setSelectedMonth: (month: number) => void;
  setSelectedYear: (year: number) => void;
}

const CalendarSelectModal = ({
  isModalVisible,
  handleModalDismiss,
  selectedMonth,
  selectedYear,
  setSelectedMonth,
  setSelectedYear,
}: ICalendarSelectModalProps) => {
  const monthScrollRef = useRef<ScrollView>(null);
  const yearScrollRef = useRef<ScrollView>(null);

  const monthItemHeight = 49;
  const yearItemHeight = 49;

  const renderMonthItem = ({ month, index }: IMonthItem) => (
    <Pressable key={index} style={styles.modalItem} onPress={() => setSelectedMonth(index + 1)}>
      <View style={selectedMonth === index + 1 ? styles.selectedStyle : null}>
        <MyText style={selectedMonth === index + 1 ? styles.selectedText : styles.modalText}>
          {month}
        </MyText>
      </View>
    </Pressable>
  );

  const renderYearItem = (year: number) => (
    <Pressable key={year} style={styles.modalItem} onPress={() => setSelectedYear(year)}>
      <View style={selectedYear === year ? styles.selectedStyle : null}>
        <MyText style={selectedYear === year ? styles.selectedText : styles.modalText}>
          {year}
        </MyText>
      </View>
    </Pressable>
  );

  useEffect(() => {
    if (isModalVisible) {
      const monthOffset = (selectedMonth - 1) * monthItemHeight - 120;
      const yearOffset = (selectedYear - 2000) * yearItemHeight - 120;
      monthScrollRef.current?.scrollTo({ y: monthOffset, animated: true });
      yearScrollRef.current?.scrollTo({ y: yearOffset, animated: true });
    }
  }, [isModalVisible, selectedMonth, selectedYear]);

  return (
    <Modal visible={isModalVisible} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={handleModalDismiss}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalListContainer}>
              <ScrollView
                ref={monthScrollRef}
                style={styles.modalMonth}
                showsVerticalScrollIndicator={false}
              >
                {kMonth.map((month, index) => renderMonthItem({ month, index }))}
              </ScrollView>
              <ScrollView
                ref={yearScrollRef}
                style={styles.modalYear}
                showsVerticalScrollIndicator={false}
              >
                {Array.from({ length: 50 }, (_, i) => 2000 + i).map((year) => renderYearItem(year))}
              </ScrollView>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CalendarSelectModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    maxHeight: 300,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
  },
  modalListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalMonth: {
    width: '50%',
  },
  modalYear: {
    width: '50%',
  },
  modalItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalText: {
    fontSize: fontLarge,
    textAlign: 'center',
  },
  selectedText: {
    fontSize: fontLarge,
    textAlign: 'center',
    color: appColor3,
  },
  selectedStyle: {
    borderColor: appColor3,
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 19,
  },
});
