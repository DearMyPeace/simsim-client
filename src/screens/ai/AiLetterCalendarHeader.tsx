import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import CalendarArrow from '@components/diary/calendar/CalendarArrow';
import { IDay } from '@type/Diary';
import MyText from '@components/common/MyText';
import { appColor3 } from '@utils/colors';
import { fontLarge } from '@utils/Sizing';

interface AiLetterCalendarHeaderProps {
  selectedDate: IDay;
  onLeftPress: () => void;
  onRightPress: () => void;
  onMonthYearSelect: (month: number, year: number) => void;
}

const AiLetterCalendarHeader = ({
  selectedDate,
  onLeftPress,
  onRightPress,
  onMonthYearSelect,
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

  useEffect(() => {
    setSelectedMonth(parseInt(selectedDate.month, 10));
    setSelectedYear(parseInt(selectedDate.year, 10));
  }, [selectedDate]);

  const handleModalDismiss = () => {
    onMonthYearSelect(selectedMonth, selectedYear);
    setModalVisible(false);
  };

  const renderMonthItem = ({ item }) => (
    <Pressable style={styles.modalItem} onPress={() => setSelectedMonth(item.index + 1)}>
      <View style={selectedMonth === item.index + 1 && styles.selectedStyle}>
        <MyText style={selectedMonth === item.index + 1 ? styles.selectedText : styles.modalText}>
          {item.month}
        </MyText>
      </View>
    </Pressable>
  );

  const renderYearItem = ({ item }) => (
    <Pressable style={styles.modalItem} onPress={() => setSelectedYear(item)}>
      <View style={selectedYear === item && styles.selectedStyle}>
        <MyText style={selectedYear === item ? styles.selectedText : styles.modalText}>
          {item}
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
                <View style={styles.modalMonth}>
                  <FlatList
                    data={kMonth.map((month, index) => ({ month, index }))}
                    renderItem={renderMonthItem}
                    keyExtractor={(item) => item.index.toString()}
                    initialScrollIndex={Math.max(0, selectedMonth - 1)}
                    getItemLayout={(data, index) => ({ length: 50, offset: 50 * index, index })}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
                <View style={styles.modalYear}>
                  <FlatList
                    data={Array.from({ length: 50 }, (_, i) => 2000 + i)}
                    renderItem={renderYearItem}
                    keyExtractor={(item) => item.toString()}
                    initialScrollIndex={Math.max(0, selectedYear - 2000)}
                    getItemLayout={(data, index) => ({ length: 50, offset: 50 * index, index })}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
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
    fontSize: 26,
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
