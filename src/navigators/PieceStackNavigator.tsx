import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Piece from '@screens/piece/Piece';

const Stack = createStackNavigator();

const PieceStackNavigator = () => (
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
      }}
      name="Details"
      component={Piece}
    />
  </Stack.Navigator>
);

export default PieceStackNavigator;
