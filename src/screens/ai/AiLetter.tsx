import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ListRenderItem,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  RefreshControl,
} from 'react-native';
import AiLetterEntries from '@api/mock/AiLetterEntries';
import Entypo from 'react-native-vector-icons/Entypo';
import Accordion from 'react-native-collapsible/Accordion';
import { IAiLetterEntry } from '@type/IAiLetterEntry';

const generateDateRange = (startDate: Date, endDate: Date): Date[] => {
  let dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

const fillDatesWithData = (dates: Date[], entries: IAiLetterEntry[]): IAiLetterEntry[] => {
  const entriesByDate = entries.reduce<Record<string, IAiLetterEntry>>((acc, entry) => {
    acc[new Date(entry.date).toISOString().slice(0, 10)] = entry;
    return acc;
  }, {});

  return dates.map((date) => {
    const dateStr = date.toISOString().slice(0, 10);
    return entriesByDate[dateStr] || { date: dateStr, isPlaceholder: true };
  });
};

const NotUsingDay: React.FC<{ date: string }> = ({ date }) => {
  const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
  const color = dayOfWeek === 'Sunday' ? '#FF1F00' : 'gray';
  return <Entypo name="dot-single" color={color} size={26} />;
};

const AiLetter: React.FC = () => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [aiLetterEntries, setAiLetterEntries] = useState<IAiLetterEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 5);
  const endDate = new Date();

  useEffect(() => {
    setAiLetterEntries(fillDatesWithData(generateDateRange(startDate, endDate), AiLetterEntries));
  }, []);

  const _renderHeader = (section: IAiLetterEntry, _: any, isActive: boolean) => (
    <TouchableHighlight underlayColor="lightgray" onPress={() => handleAccordionChange(section)}>
      <View style={[styles.incoming, isActive && styles.activeHeader]}>
        <Text style={styles.date}>
          {new Date(section.date).toLocaleDateString('ko-KR', {
            month: 'long',
            day: '2-digit',
          })}
        </Text>
        <Text style={styles.summary} numberOfLines={1} ellipsizeMode="tail">
          {section.summary}
        </Text>
      </View>
    </TouchableHighlight>
  );

  const _renderContent = (section: IAiLetterEntry) => (
    <View style={styles.content}>
      <Text style={styles.contentText}>{section.content}</Text>
    </View>
  );

  const handleAccordionChange = (section: IAiLetterEntry) => {
    const index = aiLetterEntries.findIndex((entry) => entry.date === section.date);
    setActiveSections((prevSections) => (prevSections.includes(index) ? [] : [index]));
  };

  const loadMoreData = () => {
    const firstEntryId = aiLetterEntries[0].id;
    const firstEntryIndex = AiLetterEntries.findIndex((entry) => entry.id === firstEntryId);

    if (firstEntryIndex > 0) {
      const additionalEntries = AiLetterEntries.slice(
        Math.max(firstEntryIndex - 5, 0),
        firstEntryIndex,
      );
      const newEntries = [...additionalEntries, ...aiLetterEntries];

      const firstNewEntryDate = new Date(newEntries[0].date);
      startDate.setTime(firstNewEntryDate.getTime());
      setAiLetterEntries(fillDatesWithData(generateDateRange(startDate, endDate), newEntries));
    }
  };

  const handleLoadMore = () => {
    if (!loading) {
      setLoading(true);
      loadMoreData();
      setLoading(false);
    }
  };

  const renderItem: ListRenderItem<IAiLetterEntry> = ({ item, index }) => {
    let consecutiveNotUsingDayCount = 0;

    for (let i = index; i < aiLetterEntries.length; i++) {
      if (aiLetterEntries[i].isPlaceholder) {
        consecutiveNotUsingDayCount++;
      } else {
        break;
      }
    }

    if (consecutiveNotUsingDayCount > 3) {
      return null;
    }

    return (
      <View>
        {item.isPlaceholder ? (
          <View style={styles.notusingItem}>
            <NotUsingDay date={item.date} />
          </View>
        ) : (
          <Accordion
            sections={[item]}
            activeSections={activeSections.includes(index) ? [0] : []}
            renderHeader={(section, _, isActive) => _renderHeader(section, _, isActive)}
            renderContent={_renderContent}
            onChange={() => handleAccordionChange(item)}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={aiLetterEntries}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          Platform.OS === 'web' ? null : (
            <RefreshControl
              refreshing={loading}
              onRefresh={handleLoadMore}
              tintColor="gray"
              colors={['gray']}
            />
          )
        }
        ListHeaderComponent={
          Platform.OS === 'web' && (
            <TouchableOpacity
              style={styles.loadMoreButton}
              onPress={handleLoadMore}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="gray" />
              ) : (
                <Entypo name="chevron-small-up" color="gray" size={26} />
              )}
            </TouchableOpacity>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  incoming: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
    borderBottomColor: '#ccc',
  },
  activeHeader: {
    // backgroundColor: 'lightgray',
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  summary: {
    fontSize: 14,
    color: 'gray',
    flex: 1,
    marginLeft: 20,
    overflow: 'hidden',
  },
  content: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#F1E2CC',
  },
  contentText: {
    color: 'black',
  },
  notusingItem: {
    alignItems: 'center',
  },
  placeholderItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadMoreButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loadMoreText: {
    fontSize: 16,
    color: 'gray',
    marginLeft: 5,
  },
});

export default AiLetter;
