import React, { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import MyTextInput from '@components/common/MyTextInput';
import { DateStatus } from '@type/Diary';
import MyText from '@components/common/MyText';

interface IDiaryInputProps {
  content: string;
  dateStatus: DateStatus;
  setIsEditing: (isEditing: boolean) => void;
}

const MAX_LENGTH = 200;
const DiaryInput = ({ content, dateStatus, setIsEditing }: IDiaryInputProps) => {
  const [diaryContent, setDiaryContent] = useState(content);
  const onChangeText = (text: string) => {
    if (text.length > 200) return;
    setDiaryContent(text);
  };

  const onFocus = () => {
    if (dateStatus === 'PAST') {
      console.log('과거 일기 수정 불가!');
    }
    setIsEditing(true);
    console.log('focus');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="always">
        <View style={styles.content}>
          <MyTextInput
            multiline
            inputMode="text"
            // value={diaryContent}
            onChangeText={onChangeText}
            readOnly={dateStatus !== 'TODAY'}
            autoCorrect={false}
            autoComplete="off"
            maxLength={200}
            onFocus={onFocus}
            placeholder={content}
          />
        </View>
      </ScrollView>
      <View style={{ flexDirection: 'row-reverse' }}>
        <MyText size={13} style={{ color: '#C53333' }}>
          {diaryContent.length}/{MAX_LENGTH}
        </MyText>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default DiaryInput;
