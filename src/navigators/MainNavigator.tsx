import React, { lazy } from 'react';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from '@stores/login';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import TabNavigator from '@navigators/TabNavigator';
import LoginScreen from '@screens/login/LoginScreen';
import useAxiosInterceptors from '@hooks/useAxiosInterceptors';
import useUserSetup from '@hooks/user/useUserSetup';

const SettingNavigator = lazy(() => import('./SettingNavigator'));

const Stack = createStackNavigator();

const MainNavigator = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  useAxiosInterceptors();
  useUserSetup();

  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        cardStyle: { backgroundColor: 'transparent' },
        cardStyleInterpolator: ({ current }) => ({
          cardStyle: {
            opacity: current.progress,
            backgroundColor: 'transparent',
          },
        }),
        animationEnabled: true,
      }}
    >
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Tabs"
            component={TabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingNavigator}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
