import React from 'react';
import { Chip } from 'react-native-paper';
import { View, StyleSheet, Image } from 'react-native';
import { useRecoilValue } from 'recoil';
import { pieces } from '@stores/pieces';
import pieceImage from '@assets/images/tab_piece_4.png';

const PieceChip = () => {
  const count = useRecoilValue(pieces);

  return (
    <Chip
      style={styles.container}
      textStyle={styles.text}
      mode="outlined"
      icon={() => <Image source={pieceImage} style={styles.icon} />}
      selectedColor="white"
      onPress={() => {}}
    >
      {/* <Image source={pieceImage} style={styles.icon} /> */}
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
    justifyContent: 'center',
    // width: 70,
    height: 30,
  },
  text: {
    color: '#000000',
    fontFamily: 'GowunBatang-Regular',
    fontSize: 11,
  },
  icon: {
    width: 28,
    height: 28,
    // marginBottom: 20,
    // paddingTop: 30,
    // marginTop: 10,
  },
});

export default PieceChip;
