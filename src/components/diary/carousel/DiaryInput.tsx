import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import MyTextInput from '@components/common/MyTextInput';
import LengthCheckView from '@components/common/LengthCheckView';
import { useRecoilValue } from 'recoil';
import { selectedDateStatus } from '@stores/tense';

interface IDiaryInputProps {
  id: number;
  isNew: boolean;
  diaryInput: string;
  setDiaryInput: (diaryInput: string) => void;
  timeStartWriting: string;
  setTimeStartWriting: (timeStartWriting: string) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  placeholder: string;
}

const MAX_LENGTH = 200;

const DiaryInput = ({
  isNew,
  diaryInput,
  setDiaryInput,
  timeStartWriting,
  setTimeStartWriting,
  isEditing,
  setIsEditing,
  placeholder,
}: IDiaryInputProps) => {
  const targetDate = useRecoilValue(selectedDateStatus);

  const onChangeText = (text: string) => {
    if (text.length > MAX_LENGTH) return;
    if (!timeStartWriting) {
      const now = new Date();
      const [year, month, date] = targetDate.split('-').map(Number);
      now.setFullYear(year, month - 1, date);
      setTimeStartWriting(now.toISOString());
    }
    if (text.length === 0) {
      setTimeStartWriting('');
    }
    console.log('timeStartWriting', timeStartWriting);
    setDiaryInput(text);
  };

  const onFocus = () => {
    setIsEditing(true);
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
            value={diaryInput}
            onChangeText={onChangeText}
            autoCorrect={false}
            autoComplete="off"
            maxLength={MAX_LENGTH}
            onFocus={onFocus}
            placeholder={placeholder}
          />
        </View>
      </ScrollView>
      {isEditing && <LengthCheckView data={diaryInput} maxLength={MAX_LENGTH} />}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 10,
  },
});

export default DiaryInput;
