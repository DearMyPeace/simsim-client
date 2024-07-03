import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ListRenderItem,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  RefreshControl,
  Modal,
  Text,
  Button,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Accordion from 'react-native-collapsible/Accordion';
import { IAiLetterEntry } from '@type/IAiLetterEntry';
import NotUsingDay from '@components/ai/NotUsingDay';
import AiLetterEntryHeader from '@components/ai/AiLetterEntryHeader';
import AiLetterEntryContent from '@components/ai/AiLetterEntryContent';
import { useAiLetterData } from '@hooks/ai/ailetterHook';

const AiLetter: React.FC = () => {
  const todayDateStr = new Date().toISOString().slice(0, 10);

  const {
    aiLetterEntries,
    activeSections,
    setActiveSections,
    loading,
    flatListRef,
    handleLoadMore,
    handleAccordionChange,
    isLoading,
    error,
  } = useAiLetterData(todayDateStr);

  const [isModalVisible, setModalVisible] = useState(false);

  const renderItem: ListRenderItem<IAiLetterEntry> = ({ item, index }) => {
    let consecutiveNotUsingDayCount = 0;

    for (let i = index; i < aiLetterEntries.length; i++) {
      if (aiLetterEntries[i].isPlaceholder) {
        consecutiveNotUsingDayCount++;
      } else {
        break;
      }
    }

    if (consecutiveNotUsingDayCount > 1) {
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
            renderHeader={(section, _, isActive) => (
              <AiLetterEntryHeader
                section={section}
                isActive={isActive}
                handleAccordionChange={handleAccordionChange}
              />
            )}
            renderContent={(section) => <AiLetterEntryContent section={section} />}
            onChange={() => handleAccordionChange(item)}
          />
        )}
      </View>
    );
  };

  const onScrollToIndexFailed = (info) => {
    const wait = new Promise((resolve) => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
    });
  };

  useEffect(() => {
    if (error) {
    }
  }, [error]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="gray" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={aiLetterEntries}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onScrollToIndexFailed={onScrollToIndexFailed}
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
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 36,
    paddingRight: 36,
    backgroundColor: 'transparent',
  },
  loadMoreButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  notusingItem: {
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AiLetter;
