import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import AiLetter from '@screens/ai/AiLetter';

const Stack = createStackNavigator();

const AiLetterStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Details"
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS,
      headerShown: false,
      cardStyleInterpolator: ({ current }) => ({
        cardStyle: {
          opacity: current.progress,
          backgroundColor: 'transparent',
        },
      }),
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
        title: '조각편지',
      }}
      name="Details"
      component={AiLetter}
    />
  </Stack.Navigator>
);

export default AiLetterStackNavigator;
