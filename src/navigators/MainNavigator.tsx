import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoggedInState, userInfoState } from '@stores/login';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import TabNavigator from '@navigators/TabNavigator';
import LoginScreen from '@screens/login/LoginScreen';
import { getToken } from '@components/login/AuthService';
import SettingScreen from '@screens/setting/SettingScreen';
import { CloseIcon } from '@components/common/TabIcons';
import { userAiPersonaStatus } from '@stores/userAiPersona';
import { useUserInfo } from '@api/user/get';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const { data } = useUserInfo(isLoggedIn);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) {
        setIsLoggedIn(true);
      }
    };
    checkToken();
  }, [setIsLoggedIn]);

  if (data) {
    // setUserAiPersona({ personaCode: data.personaCode, personaName: data.personaName });
    setUserInfo(data); // todo: 필요한 정보만 저장하기
  }

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
