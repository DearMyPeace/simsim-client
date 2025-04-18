import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ErrorCircle from '@assets/svg/icons/ant-design--exclamation-circle-outlined.svg';
import { Dropdown } from 'react-native-element-dropdown';
import PurchaseHistoryEntries from '@api/mock/PurchaseHistoryEntries';
import MyText from '@components/common/MyText';
import RightSVG from '@assets/svg/icons/entypo--chevron-small-right.svg';
import { fontBasic, fontMedium } from '@utils/Sizing';

const formatNumber = (number) => {
  return new Intl.NumberFormat('ko-KR').format(number);
};

export default function PurchaseHistory() {
  const [filter, setFilter] = useState('전체보기');
  const [sortOrder, setSortOrder] = useState('최신순');

  const filterOptions = [
    { label: '전체보기', value: '전체보기' },
    { label: '조각사용', value: '조각사용' },
    { label: '조각충전', value: '조각충전' },
    { label: '마음휴식', value: '마음휴식' },
    { label: '작품구매', value: '작품구매' },
  ];

  const sortOrderOptions = [
    { label: '최신순', value: '최신순' },
    { label: '오래된순', value: '오래된순' },
  ];

  const filteredEntries = PurchaseHistoryEntries.filter(
    (entry) => filter === '전체보기' || entry.category === filter,
  );

  const sortedEntries = [...filteredEntries].sort((a, b) => {
    if (sortOrder === '최신순') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  });

  const renderEntry = ({ item }) => (
    <View style={styles.entryContainer}>
      <View style={styles.dateContainer}>
        <MyText style={styles.dateText}>
          {new Date(item.date).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
        </MyText>
      </View>
      <View style={styles.contentView}>
        <MyText style={styles.summaryText}>{item.summary}</MyText>
        <MyText style={styles.useText}>
          {formatNumber(item.use)}
          {item.category.includes('조각') ? '개' : '원'}
        </MyText>
        <View style={styles.flexRow}>
          <MyText style={styles.timeText}>
            {new Date(item.date).toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}
            <MyText style={styles.contentText}> | </MyText>
            <MyText style={styles.contentText}>{item.content}</MyText>
          </MyText>
        </View>
      </View>
    </View>
  );

  const renderDropdownItem = (item) => <MyText style={styles.dropdownText}>{item.label}</MyText>;

  return (
    <View style={styles.outer}>
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <Dropdown
            style={styles.dropdown}
            data={filterOptions}
            fontFamily="GowunBatang-Regular"
            labelField="label"
            valueField="value"
            placeholder="전체보기"
            value={filter}
            onChange={(item) => setFilter(item.value)}
            selectedTextStyle={styles.selectedText}
            renderItem={renderDropdownItem}
            mode="auto"
          />
          <Dropdown
            style={styles.dropdown}
            data={sortOrderOptions}
            fontFamily="GowunBatang-Regular"
            labelField="label"
            valueField="value"
            placeholder="정렬순서"
            value={sortOrder}
            onChange={(item) => setSortOrder(item.value)}
            selectedTextStyle={styles.selectedText}
            renderItem={renderDropdownItem}
            mode="auto"
          />
        </View>

        {sortedEntries.length !== 0 ? (
          <View style={styles.emptyContainer}>
            <ErrorCircle width={120} height={120} fill="#D9D9D9" />
            <MyText style={styles.emptyText}>구매 항목이 없습니다.</MyText>
          </View>
        ) : (
          <FlatList
            data={sortedEntries}
            renderItem={renderEntry}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />
        )}
      </View>
      <View style={styles.outerView}>
        <View style={styles.outerRow}>
          <MyText style={styles.outerText}>더보기</MyText>
          <RightSVG width={20} height={20} fill="gray" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  outerView: {
    paddingTop: 5,
    alignItems: 'center',
  },
  outerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.47)',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderColor: '#cccccc',
  },
  dropdown: {
    height: 24,
    width: '30%',
    borderColor: '#aaa',
    padding: 8,
    flexDirection: 'row-reverse',
  },
  dropdownText: {
    fontSize: fontBasic,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#cccccc',
  },
  selectedText: {
    fontSize: fontBasic,
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
  list: {
    flex: 1,
  },
  entryContainer: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
  },
  dateContainer: {
    width: '35%',
    alignItems: 'center',
  },
  contentView: {
    width: '60%',
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: fontMedium,
    fontFamily: 'GowunBatang-bold',
    marginBottom: 5,
  },
  summaryText: {
    fontSize: fontMedium,
    fontFamily: 'GowunBatang-Regular',
    marginBottom: 5,
  },
  useText: {
    fontSize: fontMedium,
    fontFamily: 'GowunBatang-bold',
    color: 'black',
    marginBottom: 5,
  },
  contentText: {
    fontSize: fontBasic,
    color: '#555',
    marginBottom: 5,
  },
  timeText: {
    fontSize: fontBasic,
    color: '#888',
  },
  outerText: {
    fontSize: fontBasic,
    color: '#555',
  },
});
