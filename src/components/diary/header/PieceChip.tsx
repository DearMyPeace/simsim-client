// PieceChip.tsx
import React from 'react';
import { Chip } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useRecoilValue } from 'recoil';
import { pieces } from '@stores/pieces';

const PieceChip = () => {
  const count = useRecoilValue(pieces);

  return (
    <Chip
      style={styles.container}
      textStyle={styles.text}
      mode="outlined"
      icon="information"
      onPress={() => {}}
    >
      {count}
    </Chip>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DADADA',
    borderRadius: 8,
  },
  text: {
    color: '#000000',
    fontFamily: 'GowunBatang-Regular',
    fontSize: 11,
  },
});

export default PieceChip;
