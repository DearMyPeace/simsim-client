import React, { useState } from 'react';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import TabNavigator from '@navigators/TabNavigator';
import SettingPage from '@screens/setting/SettingPage';
import LoginScreen from '@screens/login/LoginScreen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App = () => {
  const Stack = createStackNavigator();
  const queryClient = new QueryClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
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
