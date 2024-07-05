import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Modal, FlatList } from 'react-native';
import CalendarArrow from '@components/diary/calendar/CalendarArrow';
import { IDay } from '@type/Diary';
import MyText from '@components/common/MyText';

interface AiLetterCalendarHeaderProps {
  selectedDate: IDay;
  onLeftPress: () => void;
  onRightPress: () => void;
  onMonthSelect: (month: number) => void;
  onYearSelect: (year: number) => void;
}

const AiLetterCalendarHeader = ({
  selectedDate,
  onLeftPress,
  onRightPress,
  onMonthSelect,
  onYearSelect,
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

  const [isMonthModalVisible, setMonthModalVisible] = useState(false);
  const [isYearModalVisible, setYearModalVisible] = useState(false);

  const renderMonthItem = ({ item }) => (
    <Pressable
      style={styles.modalItem}
      onPress={() => {
        setMonthModalVisible(false);
        onMonthSelect(item.index + 1);
      }}
    >
      <MyText style={styles.modalText}>{item.month}</MyText>
    </Pressable>
  );

  const renderYearItem = ({ item }) => (
    <Pressable
      style={styles.modalItem}
      onPress={() => {
        setYearModalVisible(false);
        onYearSelect(item);
      }}
    >
      <MyText style={styles.modalText}>{item}</MyText>
    </Pressable>
  );

  return (
    <View style={styles.headerContainer}>
      <View style={styles.MYContainer}>
        <Pressable onPress={() => setMonthModalVisible(true)}>
          <MyText style={styles.headerText}>{`${kMonth[selectedDate.month - 1]}`}</MyText>
        </Pressable>
        <Pressable onPress={() => setYearModalVisible(true)}>
          <MyText style={styles.headerText}>{` ${selectedDate.year}`}</MyText>
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

      {/* Month Modal */}
      <Modal visible={isMonthModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={kMonth.map((month, index) => ({ month, index }))}
              renderItem={renderMonthItem}
              keyExtractor={(item) => item.index.toString()}
            />
          </View>
        </View>
      </Modal>

      {/* Year Modal */}
      <Modal visible={isYearModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={Array.from({ length: 10 }, (_, i) => 2024 + i)}
              renderItem={renderYearItem}
              keyExtractor={(item) => item.toString()}
            />
          </View>
        </View>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 200,
    maxHeight: 300,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
  },
  modalItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  modalText: {
    fontSize: 20,
    textAlign: 'center',
  },
});
