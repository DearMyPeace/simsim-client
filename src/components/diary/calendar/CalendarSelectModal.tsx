import MyText from '@components/common/MyText';
import { appColor3 } from '@utils/colors';
import { kMonth } from '@utils/localeConfig';
import { fontLarge } from '@utils/Sizing';
import React from 'react';
import {
  View,
  Modal,
  FlatList,
  Pressable,
  TouchableWithoutFeedback,
  StyleSheet,
  ListRenderItem,
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
  const renderMonthItem: ListRenderItem<IMonthItem> = ({ item }) => (
    <Pressable style={styles.modalItem} onPress={() => setSelectedMonth(item.index + 1)}>
      <View style={selectedMonth === item.index + 1 && styles.selectedStyle}>
        <MyText style={selectedMonth === item.index + 1 ? styles.selectedText : styles.modalText}>
          {item.month}
        </MyText>
      </View>
    </Pressable>
  );

  const renderYearItem: ListRenderItem<number> = ({ item }) => (
    <Pressable style={styles.modalItem} onPress={() => setSelectedYear(item)}>
      <View style={selectedYear === item && styles.selectedStyle}>
        <MyText style={selectedYear === item ? styles.selectedText : styles.modalText}>
          {item}
        </MyText>
      </View>
    </Pressable>
  );
  return (
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
