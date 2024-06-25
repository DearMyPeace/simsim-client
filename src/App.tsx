import React from 'react';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { keepPreviousData, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GoogleOAuthProviderWrapper from '@components/login/GoogleOAuthProviderWrapper';
import MainNavigator from '@navigators/MainNavigator';

const App = () => {
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
            <SafeAreaView style={{ flex: 1, paddingTop: 0 }} edges={['bottom', 'left', 'right']}>
              <NavigationContainer>
                <MainNavigator />
              </NavigationContainer>
            </SafeAreaView>
          </SafeAreaProvider>
        </QueryClientProvider>
      </GoogleOAuthProviderWrapper>
    </RecoilRoot>
  );
};

export default App;
