import React from 'react';
import { View, StyleProp, TextStyle } from 'react-native';
import { Picker, PickerItemProps, PickerProps } from '@react-native-picker/picker';
import { fontLarge, fontMedium } from '@utils/Sizing';

interface IPickerItemProps extends PickerItemProps {
  id: string;
}

interface IBasicPickerProps extends PickerProps {
  selectedValue: PickerProps['selectedValue'];
  onValueChange: PickerProps['onValueChange'];
  items: IPickerItemProps[];
  itemStyle?: StyleProp<TextStyle>;
}

const BasicPicker = ({
  selectedValue,
  onValueChange,
  itemStyle,
  items,
  ...rest
}: IBasicPickerProps) => {
  return (
    <View style={{ paddingBottom: 10 }}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        itemStyle={[
          { fontSize: fontLarge, fontFamily: 'GowunBatang-Regular', color: 'black' },
          itemStyle,
        ]}
        {...rest}
      >
        {items.map((item) => (
          <Picker.Item
            key={item.id}
            label={item.label}
            value={item.value}
            fontFamily="GowunBatang-Regular"
            style={{ fontSize: fontMedium, fontFamily: 'GowunBatang-Regular' }}
          />
        ))}
      </Picker>
    </View>
  );
};

export default BasicPicker;
