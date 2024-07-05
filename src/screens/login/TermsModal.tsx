import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Modal, Pressable, Animated } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Markdown from 'react-native-markdown-display';
import MyText from '@components/common/MyText';
import terms from '@stores/terms';
import policy from '@stores/policy';
import { fontBasic, fontMedium } from '@utils/Sizing';

interface Props {
  isModalVisible: boolean;
  handleAgree: () => void;
  handleCancel: () => void;
  isPolicyChecked: boolean;
}

const TermsModal: React.FC<Props> = ({
  isModalVisible,
  handleAgree,
  handleCancel,
  isPolicyChecked,
}) => {
  const modalFadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (isModalVisible) {
      Animated.parallel([
        Animated.timing(modalFadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(modalFadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isModalVisible, modalFadeAnim, slideAnim]);

  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="none"
      onRequestClose={handleCancel}
    >
      <Animated.View style={[styles.modalContainer, { opacity: modalFadeAnim }]}>
        <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
          <View>
            <ScrollView style={styles.modalTerms}>
              <Markdown style={styles.markdown}>{isPolicyChecked ? terms : policy}</Markdown>
            </ScrollView>
          </View>
          <View style={styles.modalButtons}>
            <Pressable style={styles.agreeButton} onPress={handleAgree}>
              <MyText style={styles.buttonText}>동의</MyText>
            </Pressable>
            <Pressable style={styles.cancelButton} onPress={handleCancel}>
              <MyText style={styles.buttonText}>취소</MyText>
            </Pressable>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTerms: {
    maxHeight: 300,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
  },
  agreeButton: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#444',
    borderRadius: 20,
  },
  cancelButton: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ccc',
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: fontMedium,
  },
  markdown: {
    body: {
      fontSize: fontBasic,
      fontFamily: 'GowunBatang-Regular',
    },
    heading2: {
      fontSize: 24,
      fontFamily: 'GowunBatang-Bold',
      marginTop: 10,
    },
    heading3: {
      marginTop: 10,
    },
  },
});

export default TermsModal;
