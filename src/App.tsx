import React, { useState, Suspense, lazy } from 'react';
import { StyleSheet } from 'react-native';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { keepPreviousData, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import GoogleOAuthProviderWrapper from '@components/login/GoogleOAuthProviderWrapper';
import SplashScreen from '@screens/common/SplashScreen';
import { lightTheme } from '@utils/lightTheme';
import BackgroundProvider from '@screens/common/BackgroundProvider';
import CustomRefreshControl from '@screens/common/CustomRefreshControl';

const MainNavigator = lazy(() => import('@navigators/MainNavigator'));

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData,
      },
      mutations: {
        retry: 1,
      },
    },
  });

  const theme = {
    ...DefaultTheme,
    colors: lightTheme.colors,
  };

  return (
    <RecoilRoot>
      <BackgroundProvider>
        <GoogleOAuthProviderWrapper>
          <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
              <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
                {isLoading ? (
                  <SplashScreen onFinish={() => setIsLoading(false)} />
                ) : (
                  <PaperProvider theme={theme}>
                    <NavigationContainer
                      theme={{
                        colors: {
                          background: 'transparent',
                        },
                      }}
                    >
                      <Suspense fallback={<CustomRefreshControl centered />}>
                        <MainNavigator />
                      </Suspense>
                    </NavigationContainer>
                  </PaperProvider>
                )}
              </SafeAreaView>
            </SafeAreaProvider>
          </QueryClientProvider>
        </GoogleOAuthProviderWrapper>
      </BackgroundProvider>
    </RecoilRoot>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: 'transparent',
  },
});

export default App;
