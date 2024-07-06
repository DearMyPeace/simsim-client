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
import { fontLarge } from '@utils/Sizing';
import SettingUserInfoScreen from '@screens/setting/SettingUserInfoScreen';
import SettingTermsScreen from '@screens/setting/SettingTermsScreen';

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
          <Stack.Group
            screenOptions={({ navigation }) => ({
              headerStyle: { backgroundColor: 'white' },
              headerTitleStyle: {
                fontFamily: 'GowunBatang-Regular',
                fontSize: fontLarge,
                paddingHorizontal: 10,
              },
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerTintColor: 'black',
              headerTitleAlign: 'left',
              headerLeft: () => null,
              headerRight: () => <CloseIcon onPress={navigation.goBack} />,
            })}
          >
            <Stack.Screen
              name="Settings"
              component={SettingScreen}
              options={{
                title: '설정',
              }}
            />
            <Stack.Screen
              name="SettingUserInfo"
              component={SettingUserInfoScreen}
              options={{
                title: '정보',
              }}
            />
            <Stack.Screen
              name="SettingTerms"
              component={SettingTermsScreen}
              options={{
                title: '방침',
              }}
            />
          </Stack.Group>
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
