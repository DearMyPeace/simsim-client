import React from 'react';
import { Chip } from 'react-native-paper';
import { StyleSheet, Image } from 'react-native';
import { useRecoilValue } from 'recoil';
import { pieces } from '@stores/pieces';
import pieceImage from '@assets/images/pieceChip.png';

const PieceChip = () => {
  const count = useRecoilValue(pieces);

  return (
    <Chip style={styles.container} textStyle={styles.text} mode="outlined" onPress={() => {}}>
      <Image source={pieceImage} style={styles.icon} />
      {count}
    </Chip>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DADADA',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
    fontFamily: 'GowunBatang-Regular',
    fontSize: 11,
  },
  icon: {
    width: 14,
    height: 14,
    marginRight: 4,
  },
});

export default PieceChip;
