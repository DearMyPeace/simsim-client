import React from 'react';
import MyText from '@components/common/MyText';
import { ScrollView, StyleSheet, View } from 'react-native';
import MyModal from '@components/common/MyModal';
import { IAiPersonaData } from '@type/AiPersona';
import { RadioButton } from 'react-native-paper';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userAiPersonaStatus } from '@stores/userAiPersona';
import { fontLarge } from '@utils/Sizing';

interface IAiPersonaSelectProps {
  visible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  aiPersonaList: IAiPersonaData[];
}

const AiPersonaSelectModal = ({ visible, setIsVisible, aiPersonaList }: IAiPersonaSelectProps) => {
  const [userAiPersona, setUserAiPersona] = useRecoilState(userAiPersonaStatus);

  // todo: api 요청
  const onSelectAi = (aiPersona: string) => {
    setUserAiPersona(aiPersona);
    setIsVisible(false);
  };

  return (
    <MyModal
      visible={visible}
      containerStyle={styles.container}
      setIsVisible={setIsVisible}
      transparent={true}
      animationType="fade"
    >
      <ScrollView>
        <View style={styles.modalContent}>
          <RadioButton.Group onValueChange={onSelectAi} value={userAiPersona}>
            {aiPersonaList.map((persona) => (
              <View style={styles.row}>
                <RadioButton value={persona.value} />
                <MyText size={fontLarge} style={styles.padding}>
                  {persona.value}
                </MyText>
              </View>
            ))}
          </RadioButton.Group>
        </View>
      </ScrollView>
    </MyModal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
  },
  modalContent: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    width: '75%',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  padding: {
    paddingHorizontal: 10,
  },
});

export default AiPersonaSelectModal;
