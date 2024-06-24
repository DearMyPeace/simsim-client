import React, { RefObject } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import MyTextInput from '@components/common/MyTextInput';
import LengthCheckView from '@components/common/LengthCheckView';

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
  const onChangeText = (text: string) => {
    if (text.length > 200) return;
    if (text.length === 1 && !timeStartWriting) {
      setTimeStartWriting(new Date().toISOString());
    }
    if (text.length === 0 && timeStartWriting) {
      setTimeStartWriting('');
    }
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
            maxLength={200}
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