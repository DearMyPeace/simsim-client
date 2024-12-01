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
import { ICalendarModalDate } from '@type/Diary';

interface IMonthItem {
  displayedMonth: string;
  month: number;
}

interface ICalendarSelectModalProps {
  isModalVisible: boolean;
  handleModalDismiss: () => void;
  selectedModalDate: ICalendarModalDate;
  setSelectedModalDate: (date: ICalendarModalDate) => void;
}

const CalendarSelectModal = ({
  isModalVisible,
  handleModalDismiss,
  selectedModalDate,
  setSelectedModalDate,
}: ICalendarSelectModalProps) => {
  const monthScrollRef = useRef<ScrollView>(null);
  const yearScrollRef = useRef<ScrollView>(null);

  const monthItemHeight = 49;
  const yearItemHeight = 49;

  const renderMonthItem = ({ displayedMonth, month }: IMonthItem) => (
    <Pressable
      key={displayedMonth}
      style={styles.modalItem}
      onPress={() => setSelectedModalDate({ ...selectedModalDate, month })}
    >
      <View style={selectedModalDate.month === month ? styles.selectedStyle : null}>
        <MyText style={selectedModalDate.month === month ? styles.selectedText : styles.modalText}>
          {displayedMonth}
        </MyText>
      </View>
    </Pressable>
  );

  const renderYearItem = (year: number) => (
    <Pressable
      key={year}
      style={styles.modalItem}
      onPress={() =>
        setSelectedModalDate({
          ...selectedModalDate,
          year,
        })
      }
    >
      <View style={selectedModalDate.year === year ? styles.selectedStyle : null}>
        <MyText style={selectedModalDate.year === year ? styles.selectedText : styles.modalText}>
          {year}
        </MyText>
      </View>
    </Pressable>
  );

  useEffect(() => {
    if (isModalVisible) {
      const monthOffset = (selectedModalDate.month - 1) * monthItemHeight - 120;
      const yearOffset = (selectedModalDate.year - 2000) * yearItemHeight - 120;
      monthScrollRef.current?.scrollTo({ y: monthOffset, animated: true });
      yearScrollRef.current?.scrollTo({ y: yearOffset, animated: true });
    }
  }, [isModalVisible, selectedModalDate]);

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
                {kMonth.map((displayedMonth, index) =>
                  renderMonthItem({ displayedMonth, month: index + 1 }),
                )}
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
