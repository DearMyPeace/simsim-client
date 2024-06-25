import React, { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import BasicBottomSheet from '@components/common/BasicBottomSheet';

import BasicPicker from '@components/common/BasicPicker';
import { IPickerItemProps } from '@type/Setting';

interface IBottomSheetPicker {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  selectedValue: string | number;
  onValueChange: (value: string | number) => void;
  items: IPickerItemProps[];
}

const BottomSheetPicker = ({
  visible,
  setVisible,
  selectedValue,
  onValueChange,
  items,
}: IBottomSheetPicker) => {
  return (
    <BasicBottomSheet visible={visible} setVisible={setVisible}>
      <View style={{ paddingBottom: 10 }}>
        <BasicPicker selectedValue={selectedValue} onValueChange={onValueChange} items={items} />
      </View>
    </BasicBottomSheet>
  );
};

export default BottomSheetPicker;
