import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import CalendarArrow from '@components/diary/calendar/CalendarArrow';
import { IDay } from '@type/Diary';
import MyText from '@components/common/MyText';
import { appColor3 } from '@utils/colors';
import { fontLarge } from '@utils/Sizing';
import TodayButton from '@components/common/TodayButton';

interface AiLetterCalendarHeaderProps {
  selectedDate: IDay;
  onLeftPress: () => void;
  onRightPress: () => void;
  onMonthYearSelect: (month: number, year: number) => void;
  onPressToday: () => void;
  isToday: boolean;
}

const AiLetterCalendarHeader = ({
  selectedDate,
  onLeftPress,
  onRightPress,
  onMonthYearSelect,
  isToday,
  onPressToday,
}: AiLetterCalendarHeaderProps) => {
  const kMonth = [
    '일 월',
    '이 월',
    '삼 월',
    '사 월',
    '오 월',
    '유 월',
    '칠 월',
    '팔 월',
    '구 월',
    '시 월',
    '십일 월',
    '십이 월',
  ];
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(parseInt(selectedDate.month, 10));
  const [selectedYear, setSelectedYear] = useState(parseInt(selectedDate.year, 10));

  const monthItemHeight = 49;
  const yearItemHeight = 49;

  const monthScrollRef = useRef<ScrollView>(null);
  const yearScrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    setSelectedMonth(parseInt(selectedDate.month, 10));
    setSelectedYear(parseInt(selectedDate.year, 10));
  }, [selectedDate]);

  useEffect(() => {
    if (isModalVisible) {
      const monthOffset = (selectedMonth - 1) * monthItemHeight - 120;
      const yearOffset = (selectedYear - 2000) * yearItemHeight - 120;
      monthScrollRef.current?.scrollTo({ y: monthOffset, animated: true });
      yearScrollRef.current?.scrollTo({ y: yearOffset, animated: true });
    }
  }, [isModalVisible, selectedMonth, selectedYear]);

  const handleModalDismiss = () => {
    onMonthYearSelect(selectedMonth, selectedYear);
    setModalVisible(false);
  };

  const renderMonthItem = (month, index) => (
    <Pressable key={index} style={styles.modalItem} onPress={() => setSelectedMonth(index + 1)}>
      <View style={selectedMonth === index + 1 ? styles.selectedStyle : null}>
        <MyText style={selectedMonth === index + 1 ? styles.selectedText : styles.modalText}>
          {month}
        </MyText>
      </View>
    </Pressable>
  );

  const renderYearItem = (year) => (
    <Pressable key={year} style={styles.modalItem} onPress={() => setSelectedYear(year)}>
      <View style={selectedYear === year ? styles.selectedStyle : null}>
        <MyText style={selectedYear === year ? styles.selectedText : styles.modalText}>
          {year}
        </MyText>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.headerContainer}>
      <View style={styles.MYContainer}>
        <Pressable onPress={() => setModalVisible(true)}>
          <MyText style={styles.headerText}>{`${
            kMonth[selectedMonth - 1]
          } ${selectedYear}`}</MyText>
        </Pressable>
        {!isToday && <TodayButton onPress={onPressToday} />}
      </View>
      <View style={styles.arrowContainer}>
        <Pressable onPress={onLeftPress}>
          <CalendarArrow direction="left" />
        </Pressable>
        <Pressable onPress={onRightPress}>
          <CalendarArrow direction="right" />
        </Pressable>
      </View>

      {/* Month and Year Modal */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={handleModalDismiss}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalListContainer}>
                <ScrollView ref={monthScrollRef} style={styles.modalMonth}>
                  {kMonth.map((month, index) => renderMonthItem(month, index))}
                </ScrollView>
                <ScrollView ref={yearScrollRef} style={styles.modalYear}>
                  {Array.from({ length: 50 }, (_, i) => 2000 + i).map((year) =>
                    renderYearItem(year),
                  )}
                </ScrollView>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default AiLetterCalendarHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  MYContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#333333',
  },
  arrowContainer: {
    flexDirection: 'row',
    gap: 10,
  },
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
