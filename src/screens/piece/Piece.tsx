import React, { useRef, useState } from 'react';
import { View, StyleSheet, Animated, Image, TouchableWithoutFeedback } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import stainedglassHalf from '@assets/images/stainedglass_half.png';
import stainedglassFrame from '@assets/images/stainedglass_frame.png';
import { fontBasic } from '@utils/Sizing';
import Report from '@screens/report/ReportView';

const Piece = () => {
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [flipped, setFlipped] = useState(false);

  const handleImagePress = () => {
    if (flipped) {
      Animated.spring(flipAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start(() => setFlipped(false));
    } else {
      Animated.spring(flipAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start(() => setFlipped(true));
    }
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <TouchableWithoutFeedback onPress={handleImagePress}>
            <Animated.View style={[styles.imageContainer, frontAnimatedStyle]}>
              <Image source={stainedglassFrame} style={styles.image} resizeMode="contain" />
              <View style={styles.overlay}>
                <Report />
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handleImagePress}>
            <Animated.View
              style={[styles.imageContainer, styles.backImageContainer, backAnimatedStyle]}
            >
              <Image source={stainedglassHalf} style={styles.image} resizeMode="contain" />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
        {/* <View style={styles.reportContainer}>
          <MyText style={styles.reportHeader}>리포트</MyText>
          <MyText style={styles.reportText}>2주의 기록이 쌓이면 리포트가 제공됩니다. </MyText>
        </View> */}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingBottom: 20,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    position: 'relative',
    backgroundColor: 'transparent',
  },
  backImageContainer: {
    paddingTop: 10,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: '100%',
    aspectRatio: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
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
