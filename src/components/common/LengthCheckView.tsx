import React from 'react';
import { View } from 'react-native';
import MyText from '@components/common/MyText';

const LengthCheckView = ({ data, maxLength }: { data: string; maxLength: number }) => {
  return (
    <View style={{ flexDirection: 'row-reverse' }}>
      <MyText size={13} style={{ color: '#C53333' }}>
        {data.length}/{maxLength}
      </MyText>
    </View>
  );
};

export default LengthCheckView;
