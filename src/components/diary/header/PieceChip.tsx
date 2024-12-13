import React, { memo } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useRecoilValue } from 'recoil';
import { pieces } from '@stores/pieces';
import pieceImage from '@assets/images/tab_piece_4.png';
import MyText from '@components/common/MyText';

const PieceChip = memo(() => {
  const count = useRecoilValue(pieces);

  return (
    <View style={styles.container}>
      <Image source={pieceImage} style={styles.icon} />
      <MyText size={11} style={styles.text}>
        {count}
      </MyText>
    </View>
  );
});

export default PieceChip;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DADADA',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    paddingHorizontal: 8,
  },
  text: {
    marginLeft: 5,
    marginRight: 7.5,
  },
  icon: {
    width: 28,
    height: 28,
  },
});
