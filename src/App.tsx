import React, { useState, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { keepPreviousData, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import GoogleOAuthProviderWrapper from '@components/login/GoogleOAuthProviderWrapper';
import MainNavigator from '@navigators/MainNavigator';
import SplashScreen from '@screens/common/SplashScreen';
import { lightTheme } from '@utils/lightTheme';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData,
      },
    },
  });

  const theme = {
    ...DefaultTheme,
    colors: lightTheme.colors,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <RecoilRoot>
      <GoogleOAuthProviderWrapper>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, paddingTop: 0 }} edges={['bottom', 'left', 'right']}>
              {isLoading ? (
                <SplashScreen onFinish={() => setIsLoading(false)} />
              ) : (
                <PaperProvider theme={theme}>
                  <NavigationContainer>
                    <MainNavigator />
                  </NavigationContainer>
                </PaperProvider>
              )}
            </SafeAreaView>
          </SafeAreaProvider>
        </QueryClientProvider>
      </GoogleOAuthProviderWrapper>
    </RecoilRoot>
  );
};

export default App;
