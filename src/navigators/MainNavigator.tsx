import React from 'react';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from '@stores/login';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import TabNavigator from '@navigators/TabNavigator';
import LoginScreen from '@screens/login/LoginScreen';
import SettingScreen from '@screens/setting/SettingScreen';
import { CloseIcon } from '@components/common/TabIcons';
import useAxiosInterceptors from '@hooks/useAxiosInterceptors';
import useUserSetup from '@hooks/user/useUserSetup';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  useUserSetup();
  useAxiosInterceptors();

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
            component={SettingScreen}
            options={({ navigation }) => ({
              title: '',
              headerStyle: { backgroundColor: 'white' },
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerTintColor: 'black',
              headerTitleAlign: 'left',
              headerLeft: () => null,
              headerRight: () => <CloseIcon onPress={navigation.goBack} />,
            })}
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
