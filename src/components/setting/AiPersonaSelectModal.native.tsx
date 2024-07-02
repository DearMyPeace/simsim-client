import React, { useEffect, useState } from 'react';
import { IAiPersonaData } from '@type/AiPersona';
import BasicBottomSheet from '@components/common/BasicBottomSheet';
import BasicPicker from '@components/common/BasicPicker';
import { ItemValue } from '@react-native-picker/picker/typings/Picker';
import useAiPersonaChange from '@hooks/setting/aiPatchHook';
import { IPickerItemProps } from '@type/Setting';

interface IAiPersonaSelectProps {
  visible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  aiPersonaList: IAiPersonaData[];
}

const AiPersonaSelectModal = ({ visible, setIsVisible, aiPersonaList }: IAiPersonaSelectProps) => {
  const { changeAiPersona, selectedPersonaCode, setSelectedPersonaCode } = useAiPersonaChange();
  const [aiPickerItems, setAiPickerItems] = useState<IPickerItemProps[]>([]);

  useEffect(() => {
    setAiPickerItems(
      aiPersonaList.map((persona) => ({
        id: persona.personaId,
        label: persona.personaName,
        value: persona.personaCode,
      })),
    );
  }, [aiPersonaList]);

  const onClose = () => {
    changeAiPersona.mutate(selectedPersonaCode);
    setIsVisible(false);
  };

  const onValueChange = (personaCode: ItemValue) => {
    setSelectedPersonaCode(personaCode as string);
  };

  return (
    <BasicBottomSheet visible={visible} setVisible={setIsVisible} onClose={onClose}>
      <BasicPicker
        selectedValue={selectedPersonaCode}
        onValueChange={onValueChange}
        items={aiPickerItems}
      />
    </BasicBottomSheet>
  );
};

export default AiPersonaSelectModal;
