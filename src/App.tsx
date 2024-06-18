import React from 'react';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { Text, View } from 'react-native';

const App = () => {
  return (
    <RecoilRoot>
      <View>
        <Text>Hello World!</Text>
      </View>
    </RecoilRoot>
  );
};

export default App;
