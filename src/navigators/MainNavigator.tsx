import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoggedInState } from '@stores/login';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import TabNavigator from '@navigators/TabNavigator';
import LoginScreen from '@screens/login/LoginScreen';
import { getToken } from '@components/login/AuthService';
import SettingScreen from "@screens/setting/SettingScreen.tsx";
import { fontLarge } from "@utils/Sizing.ts";
import { BackIcon } from "@components/common/TabIcons.tsx";

const Stack = createStackNavigator();

const MainNavigator = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const isLoggedIn = useRecoilValue(isLoggedInState);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) {
        setIsLoggedIn(true);
      }
    };

    checkToken();
  }, [setIsLoggedIn]);

  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen
            name="Settings"
            component={SettingScreen}
            options={{
              title: '설정',
              headerStyle: { backgroundColor: 'white' },
              headerTitleStyle: {
                fontFamily: 'GowunBatang-Regular',
                fontSize: fontLarge,
              },
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerTintColor: 'black',
              headerTitleAlign: 'left',
              headerBackImage: BackIcon,
            }}
          />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
