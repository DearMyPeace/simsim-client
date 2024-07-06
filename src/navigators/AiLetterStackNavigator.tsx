import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import AiLetter from '@screens/ai/AiLetter';
import useUserSetup from '@hooks/user/useUserSetup';

const Stack = createStackNavigator();

const AiLetterStackNavigator = () => {
  useUserSetup();
  return (
    <Stack.Navigator
      initialRouteName="AiLetter"
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
        name="AiLetter"
        component={AiLetter}
      />
    </Stack.Navigator>
  );
};

export default AiLetterStackNavigator;
