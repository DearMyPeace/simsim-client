import React from 'react';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import TabNavigator from '@navigators/TabNavigator';
import SettingPage from '@screens/setting/SettingPage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { keepPreviousData, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData,
      },
    },
  });

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
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
