import React, { useState } from 'react';
import SettingSection from '@components/setting/SettingSection';
import SettingContainer from '@components/setting/SettingContainer';
import MyModal from '@components/common/MyModal';
import terms from '@stores/terms';
import MarkDownView from '@components/common/MarkDownView';
import policy from '@stores/policy';
import openSourceInfo from '@stores/openSourceInfo';

type SettingModalType = 'terms' | 'policy' | 'openSource';

const modalContents: Record<SettingModalType, string> = {
  terms: terms,
  policy: policy,
  openSource: openSourceInfo,
};

const SettingTermsScreen = () => {
  const [modalName, setModalName] = useState<SettingModalType | ''>('');

  const setIsVisible = (visible: boolean) => {
    if (!visible) {
      setModalName('');
    }
  };

  const modals = (
    <MyModal
      visible={modalName !== ''}
      setIsVisible={setIsVisible}
      presentationStyle="overFullScreen"
      transparent={true}
      containerStyle={{ width: '80%', flex: 1, maxHeight: 500 }}
    >
      {modalName !== '' && (
        <MarkDownView containerStyle={{ flex: 1, paddingHorizontal: 10, width: '100%' }}>
          {modalContents[modalName]}
        </MarkDownView>
      )}
    </MyModal>
  );

  return (
    <SettingContainer modals={modals} footerText="SimSim.Co">
      <SettingSection label="개인정보 처리방침" onPress={() => setModalName('policy')} />
      <SettingSection label="이용약관" onPress={() => setModalName('terms')} />
      <SettingSection label="오픈 소스 라이브러리" onPress={() => setModalName('openSource')} />
      {/* <SettingSection label="사업자 정보" onPress={() => setModalName('business')} /> */}
    </SettingContainer>
  );
};

export default SettingTermsScreen;
