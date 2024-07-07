import React from 'react';
import { ScrollView, View, StyleSheet, Pressable, Image } from 'react-native';
import MyText from '@components/common/MyText';
import { useRecoilState } from 'recoil';
import { pieces } from '@stores/pieces';
import p500 from '@assets/images/p500.png';
import p200 from '@assets/images/p200.png';
import p100 from '@assets/images/p100.png';
import p5 from '@assets/images/p5.png';
import { fontBasic, fontLarge } from '@utils/Sizing';

const PieceShop: React.FC = () => {
  const [, setPieceCount] = useRecoilState(pieces);

  const handleAdReward = () => {
    setPieceCount((prevCount) => prevCount + 5);
  };

  const handlePurchase = (amount: number) => {
    setPieceCount((prevCount) => prevCount + amount);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>
        <MyText style={styles.header}>조각 무료로 받기</MyText>
        <MyText style={styles.subHeader}>광고는 하루에 두 번까지 시청할 수 있어요</MyText>

        <View style={styles.itemContainer}>
          <View style={styles.pieceContainer}>
            <Image source={p5} style={styles.image} />
            <MyText style={styles.pieceText}>5개</MyText>
          </View>
          <Pressable style={styles.button} onPress={handleAdReward}>
            <MyText style={styles.buttonText}>광고 보기</MyText>
          </Pressable>
        </View>

        <MyText style={styles.header}>구매하기</MyText>

        <View style={styles.itemContainer}>
          <View style={styles.pieceContainer}>
            <Image source={p100} style={styles.image} />
            <MyText style={styles.pieceText}>100개</MyText>
          </View>
          <Pressable style={styles.button} onPress={() => handlePurchase(100)}>
            <MyText style={styles.buttonText}>1,000 원</MyText>
          </Pressable>
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.pieceContainer}>
            <Image source={p200} style={styles.image} />
            <MyText style={styles.pieceText}>200개</MyText>
          </View>
          <Pressable style={styles.button} onPress={() => handlePurchase(220)}>
            <MyText style={styles.buttonText}>2,000 원</MyText>
          </Pressable>
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.pieceContainer}>
            <Image source={p500} style={styles.image} />
            <MyText style={styles.pieceText}>월간 구독</MyText>
          </View>
          <Pressable style={styles.button} onPress={() => handlePurchase(500)}>
            <MyText style={styles.buttonText}>4,900 원</MyText>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'transparent',
  },
  header: {
    fontSize: fontLarge,
    fontFamily: 'GowunBatang-Bold',
    marginTop: 10,
    marginBottom: 5,
  },
  subHeader: {
    fontSize: fontBasic,
    color: '#555',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 21,
    backgroundColor: '#F1E0CC',
    marginVertical: 5,
    borderRadius: 20,
  },
  pieceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pieceText: {
    fontSize: 18,
    marginLeft: 20,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#EED8B7',
    borderColor: '#C48E24',
  },
  buttonText: {
    fontSize: fontBasic,
    color: '#000',
  },
  scrollView: {
    flexGrow: 1,
  },
  image: {
    width: 38,
    height: 38,
  },
});

export default PieceShop;
