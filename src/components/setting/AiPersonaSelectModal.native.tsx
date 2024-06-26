import React from 'react';
import { IAiPersonaData } from '@type/AiPersona';
import BasicBottomSheet from '@components/common/BasicBottomSheet';
import BasicPicker from '@components/common/BasicPicker';
import { ItemValue } from '@react-native-picker/picker/typings/Picker';
import useAiPersonaChange from '@hooks/setting/aiPatchHook';

interface IAiPersonaSelectProps {
  visible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  aiPersonaList: IAiPersonaData[];
}

const AiPersonaSelectModal = ({ visible, setIsVisible, aiPersonaList }: IAiPersonaSelectProps) => {
  const { changeAiPersona, selectedValue, setSelectedValue } = useAiPersonaChange();

  const onClose = () => {
    changeAiPersona.mutate(selectedValue);
    setIsVisible(false);
  };

  const onValueChange = (item: ItemValue) => {
    setSelectedValue(item as string);
  };

  return (
    <BasicBottomSheet visible={visible} setVisible={setIsVisible} onClose={onClose}>
      <BasicPicker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        items={aiPersonaList}
      />
    </BasicBottomSheet>
  );
};

export default AiPersonaSelectModal;
