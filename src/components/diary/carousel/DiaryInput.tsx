import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import MyTextInput from '@components/common/MyTextInput';
import { DateStatus } from '@type/Diary';
import LengthCheckView from '@components/common/LengthCheckView';

interface IDiaryInputProps {
  isNew: boolean;
  content: string;
  dateStatus: DateStatus;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

// TODO: content랑 diaryContent 구분
const MAX_LENGTH = 200;
const DiaryInput = ({ isNew, content, dateStatus, isEditing, setIsEditing }: IDiaryInputProps) => {
  const [diaryContent, setDiaryContent] = useState(isNew ? '' : content);

  const onChangeText = (text: string) => {
    if (text.length > 200) return;
    setDiaryContent(text);
  };

  const onFocus = () => {
    setIsEditing(true);
    console.log('focus');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="always">
        <View style={[styles.content, isNew && { width: '100%', height: '100%' }]}>
          <MyTextInput
            multiline
            inputMode="text"
            value={diaryContent}
            onChangeText={onChangeText}
            autoCorrect={false}
            autoComplete="off"
            maxLength={200}
            onFocus={onFocus}
            placeholder={content}
            style={[isNew && styles.empty]}
          />
        </View>
      </ScrollView>
      {isEditing && <LengthCheckView data={content} maxLength={MAX_LENGTH} />}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  empty: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DiaryInput;
