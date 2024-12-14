import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import MyModal from '@components/common/MyModal';
import { IAiPersonaData } from '@type/AiPersona';
import useAiPersonaChange from '@hooks/setting/aiPatchHook';
import MyRadioButton from '@components/common/MyRadioButton';

interface IAiPersonaSelectProps {
  visible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  aiPersonaList: IAiPersonaData[];
}

const AiPersonaSelectModal = ({ visible, setIsVisible, aiPersonaList }: IAiPersonaSelectProps) => {
  const { userInfo, changeAiPersona } = useAiPersonaChange();

  const onSelectAi = (personaCode: string) => {
    if (personaCode === userInfo.personaCode) return;
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
      <ScrollView style={{ flexGrow: 1 }}>
        <View style={styles.modalContent}>
          {aiPersonaList.map((persona) => (
            <MyRadioButton
              key={persona.personaId}
              label={persona.personaName}
              value={persona.personaCode}
              selected={userInfo.personaCode === persona.personaCode}
              onPress={onSelectAi}
            />
          ))}
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
    flex: 1,
    paddingVertical: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default AiPersonaSelectModal;
