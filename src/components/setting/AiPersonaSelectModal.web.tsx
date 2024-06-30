import React from 'react';
import MyText from '@components/common/MyText';
import { ScrollView, StyleSheet, View } from 'react-native';
import MyModal from '@components/common/MyModal';
import { IAiPersonaData } from '@type/AiPersona';
import { RadioButton } from 'react-native-paper';
import { fontLarge } from '@utils/Sizing';
import useAiPersonaChange from '@hooks/setting/aiPatchHook';

interface IAiPersonaSelectProps {
  visible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  aiPersonaList: IAiPersonaData[];
}

const AiPersonaSelectModal = ({ visible, setIsVisible, aiPersonaList }: IAiPersonaSelectProps) => {
  const { userAiPersona, changeAiPersona } = useAiPersonaChange();

  const onSelectAi = (personaCode: string) => {
    if (personaCode === userAiPersona.personaCode) return;
    changeAiPersona.mutate(personaCode);
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
          <RadioButton.Group onValueChange={onSelectAi} value={userAiPersona.personaCode}>
            {aiPersonaList.map((persona) => (
              <View key={persona.personaId} style={styles.row}>
                <RadioButton value={persona.personaCode} />
                <MyText size={fontLarge} style={styles.padding}>
                  {persona.personaName}
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
