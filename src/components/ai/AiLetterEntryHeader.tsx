import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Animated } from 'react-native';
import { IAiLetterEntry } from '@type/IAiLetterEntry';
import MyText from '@components/common/MyText';
import Entypo from 'react-native-vector-icons/Entypo';
import { fontBasic, fontMedium } from '@utils/Sizing';

interface AiLetterEntryHeaderProps {
  section: IAiLetterEntry;
  isActive: boolean;
  handleAccordionChange: (section: IAiLetterEntry) => void;
}

const AiLetterEntryHeader: React.FC<AiLetterEntryHeaderProps> = ({
  section,
  isActive,
  handleAccordionChange,
}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isActive ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isActive, rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={() => handleAccordionChange(section)}
      style={({ pressed }) => [{ backgroundColor: pressed ? 'transparent' : 'transparent' }]}
    >
      <View style={styles.incoming}>
        <View style={styles.dateWrapper}>
          <MyText style={styles.date}>
            {new Date(section.date).toLocaleDateString('ko-KR', {
              month: 'long',
              day: '2-digit',
            })}
          </MyText>
          {section.replyStatus === 'N' && <View style={styles.badge} />}
        </View>
        <MyText
          style={[styles.summary, isPressed && styles.summaryPressed]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {section.summary}
        </MyText>

        <Animated.View style={{ transform: [{ rotate }] }}>
          <Entypo name="chevron-small-right" size={24} color="gray" />
        </Animated.View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  incoming: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
    borderBottomColor: '#ccc',
    backgroundColor: 'transparent',
  },
  dateWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: fontMedium,
    fontFamily: 'GowunBatang-Bold',
    color: 'black',
    backgroundColor: 'transparent',
  },
  summary: {
    fontSize: fontBasic,
    color: 'gray',
    flex: 1,
    marginLeft: 20,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  summaryPressed: {
    color: 'lightgray',
  },
  badge: {
    position: 'absolute',
    top: 1,
    right: -4,
    backgroundColor: '#EB6D52',
    borderRadius: 4,
    width: 4,
    height: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AiLetterEntryHeader;
