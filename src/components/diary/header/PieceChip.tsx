import * as React from 'react';
import { Chip } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const PieceChip = () => (
  <Chip
    style={styles.container}
    textStyle={styles.text}
    mode="outlined"
    icon="information"
    onPress={() => console.log('Pressed')}
  >
    9999
  </Chip>
);

export default PieceChip;

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
