import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { keepPreviousData, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GoogleOAuthProviderWrapper from '@components/login/GoogleOAuthProviderWrapper';
import MainNavigator from '@navigators/MainNavigator';
import SplashScreen from '@screens/common/SplashScreen';

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

  return (
    <RecoilRoot>
      <GoogleOAuthProviderWrapper>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
              {isLoading ? (
                <SplashScreen onFinish={() => setIsLoading(false)} />
              ) : (
                <NavigationContainer
                  theme={{
                    colors: {
                      background: 'transparent',
                    },
                  }}
                >
                  <MainNavigator />
                </NavigationContainer>
              )}
            </SafeAreaView>
          </SafeAreaProvider>
        </QueryClientProvider>
      </GoogleOAuthProviderWrapper>
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
