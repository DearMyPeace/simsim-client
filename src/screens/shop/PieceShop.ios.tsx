import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Pressable } from 'react-native';
import MyText from '@components/common/MyText';
import { useRecoilState } from 'recoil';
import { pieces } from '@stores/pieces';
import P1 from '@assets/svg/logo_shop_1.svg';
import P2 from '@assets/svg/logo_shop_2.svg';
import P3 from '@assets/svg/logo_shop_3.svg';
import P4 from '@assets/svg/logo_shop_4.svg';

import { fontBasic, fontLarge } from '@utils/Sizing';

import * as RNIap from 'react-native-iap';

const productIds = [
  'com.dearmy.piece1',
  'com.dearmy.piece5',
  'com.dearmy.piece11',
  'com.dearmy.subscription',
];

const subscriptionIds = ['writer'];

const PieceShop: React.FC = () => {
  const [, setPieceCount] = useRecoilState(pieces);
  const [products, setProducts] = useState<RNIap.Product[]>([]);
  const [subscriptions, setSubscriptions] = useState<RNIap.Subscription[]>([]);

  useEffect(() => {
    const fetchProductsAndSubscriptions = async () => {
      try {
        const availableProducts = await RNIap.getProducts(productIds);
        setProducts(availableProducts);

        const availableSubscriptions = await RNIap.getSubscriptions(subscriptionIds);
        setSubscriptions(availableSubscriptions);
      } catch (err) {
        console.error('Failed to fetch products or subscriptions:', err);
        Alert.alert('상품 정보를 불러오지 못했습니다.');
      }
    };

    fetchProductsAndSubscriptions();

    const purchaseUpdateSubscription = RNIap.purchaseUpdatedListener((purchase) => {
      const receipt = purchase.transactionReceipt;
      if (receipt) {
        if (subscriptionIds.includes(purchase.productId)) {
          Alert.alert('구독 성공', 'WriterPlus 구독이 활성화되었습니다.');
        } else {
          handlePurchase(purchase.productId);
        }
        RNIap.finishTransaction(purchase).catch((err) =>
          console.error('Failed to finish transaction:', err),
        );
      }
    });

    const purchaseErrorSubscription = RNIap.purchaseErrorListener((error) => {
      console.error('Purchase Error:', error);
      Alert.alert('구매 실패', error.message);
    });

    return () => {
      purchaseUpdateSubscription.remove();
      purchaseErrorSubscription.remove();
    };
  }, []);

  const handlePurchase = (productId: string) => {
    switch (productId) {
      case 'com.dearmy.piece1':
        setPieceCount((prevCount) => prevCount + 1);
        break;
      case 'com.dearmy.piece5':
        setPieceCount((prevCount) => prevCount + 5);
        break;
      case 'com.dearmy.piece11':
        setPieceCount((prevCount) => prevCount + 11);
        break;
      default:
        console.warn('Unknown product ID:', productId);
    }
  };

  const requestPurchase = async (productId: string) => {
    try {
      await RNIap.requestPurchase(productId);
    } catch (err) {
      console.error('Purchase request error:', err);
      Alert.alert('구매 실패', '다시 시도해주세요.');
    }
  };

  const requestSubscription = async (subscriptionId: string) => {
    try {
      await RNIap.requestSubscription(subscriptionId);
    } catch (err) {
      console.error('Subscription request error:', err);
      Alert.alert('구독 실패', '다시 시도해주세요.');
    }
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
            <P1 style={styles.image} />
            <MyText style={styles.pieceText}>1개</MyText>
          </View>
          <Pressable
            style={styles.button}
            onPress={() => setPieceCount((prevCount) => prevCount + 1)}
          >
            <MyText style={styles.buttonText}>광고 보기</MyText>
          </Pressable>
        </View>

        <MyText style={styles.header}>구매하기</MyText>

        {products.map((product) => (
          <View style={styles.itemContainer} key={product.productId}>
            <View style={styles.pieceContainer}>
              {/* 제품에 따라 이미지를 매핑합니다 */}
              <MyText style={styles.pieceText}>{product.title}</MyText>
            </View>
            <Pressable style={styles.button} onPress={() => requestPurchase(product.productId)}>
              <MyText style={styles.buttonText}>{product.localizedPrice}</MyText>
            </Pressable>
          </View>
        ))}

        <MyText style={styles.header}>구독하기</MyText>

        {subscriptions.map((subscription) => (
          <View style={styles.itemContainer} key={subscription.productId}>
            <View style={styles.pieceContainer}>
              <P4 style={styles.image} />
              <MyText style={styles.pieceText}>{subscription.title}</MyText>
            </View>
            <Pressable
              style={styles.button}
              onPress={() => requestSubscription(subscription.productId)}
            >
              <MyText style={styles.buttonText}>{subscription.localizedPrice}</MyText>
            </Pressable>
          </View>
        ))}
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
