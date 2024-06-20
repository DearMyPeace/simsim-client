import React, { useState } from 'react';
import MyText from '@components/common/MyText';
import {
  View,
  FlatList,
  Button,
  Modal,
  StyleSheet,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import MyCalendar from '@components/diary/calendar/MyCalendar';
import DiaryCarousel from '@components/diary/carousel/DiaryCarousel';

const DiaryPage = () => {
  const [diaryList, setDiaryList] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  // 새 다이어리 항목을 추가하는 함수
  const addDiary = () => {
    if (!newTitle || !newContent) {
      alert('Please fill out all fields.');
      return;
    }
    const newDiary = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      mood: 'Happy',
      date: new Date().toLocaleDateString(),
    };
    setDiaryList([...diaryList, newDiary]);
    setIsVisible(false);
    setNewTitle('');
    setNewContent('');
  };

  // 다이어리 항목을 렌더링하는 함수
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <MyText style={styles.title}>{item.title}</MyText>
      <MyText style={styles.date}>{item.date}</MyText>
      <MyText style={styles.content}>{item.content}</MyText>
    </View>
  );

  // 모달 바깥 영역을 터치할 때 키보드 숨기기
  const dismissKeyboard = () => {
    if (Platform.OS !== 'web') {
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <MyCalendar />
      <DiaryCarousel />
      {/* <FlatList data={diaryList} renderItem={renderItem} keyExtractor={(item) => item.id} /> */}
      {/* <Button title="Add Diary" onPress={() => setIsVisible(true)} /> */}
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.input}
                placeholder="Title"
                value={newTitle}
                onChangeText={setNewTitle}
              />
              <TextInput
                style={styles.input}
                placeholder="Content"
                value={newContent}
                onChangeText={setNewContent}
                multiline
              />
              <Button title="Submit Diary" onPress={addDiary} />
              <Button title="Cancel" onPress={() => setIsVisible(false)} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
  },
  date: {
    fontSize: 14,
    color: 'grey',
  },
  content: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    maxWidth: 400,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%',
  },
});

export default DiaryPage;
