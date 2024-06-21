import React from 'react';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import TabNavigator from '@navigators/TabNavigator';
import SettingPage from '@screens/setting/SettingPage';

const App = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen
            name="Settings"
            component={SettingPage}
            options={{
              title: '설정',
              headerStyle: { backgroundColor: 'white' },
              headerTitleStyle: { fontFamily: 'GowunBatang-Regular' },
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerTintColor: 'black',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
