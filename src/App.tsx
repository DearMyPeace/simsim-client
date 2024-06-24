import React, { useState, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import TabNavigator from '@navigators/TabNavigator';
import SettingPage from '@screens/setting/SettingPage';
import LoginScreen from '@screens/login/LoginScreen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { keepPreviousData, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { saveToken, getToken, removeToken } from '@components/login/AuthService';

const App = () => {
  const Stack = createStackNavigator();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData,
      },
    },
  });
  
  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) {
        setIsLoggedIn(true);
      }
    };

    checkToken();
  }, []);

  const handleLogin = async () => {
    const token = 'dummy-auth-token'; // 실제 로그인 API 호출을 통해 얻은 토큰
    await saveToken(token);
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await removeToken();
    setIsLoggedIn(false);
  };
  
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, paddingTop: 0 }} edges={['bottom', 'left', 'right']}>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              >
                {isLoggedIn ? (
                  <>
                    <Stack.Screen
                      name="Tabs"
                      component={TabNavigator}
                      options={{ headerShown: false }}
                    />
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
                  </>
                ) : (
                  <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                  />
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
