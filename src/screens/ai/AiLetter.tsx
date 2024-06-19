import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AiLetterEntries from '@api/mock/AiLetterEntries';
import Entypo from 'react-native-vector-icons/Entypo';
import Collapsible from 'react-native-collapsible';

const generateDateRange = (startDate, endDate) => {
  let dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

const fillDatesWithData = (dates, entries) => {
  const entriesByDate = entries.reduce((acc, entry) => {
    acc[new Date(entry.date).toISOString().slice(0, 10)] = entry;
    return acc;
  }, {});

  return dates.map((date) => {
    const dateStr = date.toISOString().slice(0, 10);
    return entriesByDate[dateStr] || { date: dateStr, isPlaceholder: true };
  });
};

const NotUsingDay = ({ date }) => {
  const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
  const color = dayOfWeek === 'Sunday' ? 'red' : 'gray';
  return <Entypo name="dot-single" color={color} size={26} />;
};

const AiLetter = () => {
  const [activeIndex, setActiveIndex] = useState(null); // State to track active item

  const toggleExpand = (index) => {
    setActiveIndex(index === activeIndex ? null : index); // Toggle active index
  };

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 13); // 2 weeks ago
  const endDate = new Date();

  const aiLetterEntries = fillDatesWithData(generateDateRange(startDate, endDate), AiLetterEntries);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      {item.isPlaceholder ? (
        <View style={styles.notusingItem}>
          <NotUsingDay date={item.date} />
        </View>
      ) : (
        <View style={styles.incoming}>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.summary}>{item.summary}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={aiLetterEntries}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  incoming: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summary: {
    fontSize: 14,
    color: 'gray',
  },
  notusingItem: {
    alignItems: 'center',
  },
  placeholderItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AiLetter;
