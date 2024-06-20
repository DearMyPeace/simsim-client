import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import AiLetter from '@screens/ai/AiLetter';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const AiLetterStackNavigator = () => (
  <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Details"
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}
      >
        <Stack.Screen
          options={{
            transitionSpec: {
              open: {
                animation: 'spring',
                config: {
                  stiffness: 2000,
                  damping: 1000,
                },
              },
              close: {
                animation: 'spring',
                config: {
                  stiffness: 1000,
                  damping: 500,
                },
              },
            },
          }}
          name="Details"
          component={AiLetter}
        />
      </Stack.Navigator>
    </SafeAreaView>
  </SafeAreaProvider>
);

export default AiLetterStackNavigator;
