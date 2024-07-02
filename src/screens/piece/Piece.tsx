import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, PanResponder, Image } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MyText from '@components/common/MyText';
import PieceEntries from '@api/mock/PieceEntries';
import { appColor1, appColor2, appColor3, appColor4, appColor5 } from '@utils/colors';
import stainedglass from '@assets/images/piece_peace_4.png';
import { fontBasic } from '@utils/Sizing';

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const Piece = () => {
  const [chartData, setChartData] = useState([]);
  const [layoutWidth, setLayoutWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const pan = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const coloredEntries = PieceEntries.map((entry) => {
      let color = '';
      switch (entry.name) {
        case '행복':
          color = appColor5;
          break;
        case '슬픔':
          color = appColor4;
          break;
        case '화':
          color = appColor3;
          break;
        case '힘듦':
          color = appColor2;
          break;
        case '무난함':
          color = appColor1;
          break;
        default:
          color = entry.color;
      }
      return { ...entry, color };
    });
    setChartData(coloredEntries);
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan }], { useNativeDriver: false }),
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx > layoutWidth / 4) {
          // 오른쪽으로 일정 거리 이상 스와이프하면 이미지로 전환
          Animated.spring(pan, {
            toValue: layoutWidth,
            useNativeDriver: true,
          }).start(() => {
            setCurrentIndex(1);
            pan.setValue(0);
          });
        } else if (gestureState.dx < -layoutWidth / 4) {
          // 왼쪽으로 일정 거리 이상 스와이프하면 차트로 전환
          Animated.spring(pan, {
            toValue: -layoutWidth,
            useNativeDriver: true,
          }).start(() => {
            setCurrentIndex(0);
            pan.setValue(0);
          });
        } else {
          // 원래 위치로 복귀
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={styles.container}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setLayoutWidth(width);
        }}
      >
        <View
          style={{
            width: layoutWidth,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}
        >
          <Image source={stainedglass} style={styles.image} />
        </View>
        <View style={styles.reportContainer}>
          <MyText style={styles.reportHeader}>리포트</MyText>
          <MyText style={styles.reportText}>여기에 해당 페이지의 리포트가 표시됩니다.</MyText>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  swipeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '70%',
    height: '100%',
  },
  reportContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  reportHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  reportText: {
    fontSize: fontBasic,
    color: '#555',
  },
});

export default Piece;
