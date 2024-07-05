import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Shop from '@screens/shop/Shop';

const Stack = createStackNavigator();

const ShopStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Shop"
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
        title: '조각상점',
      }}
      name="Shop"
      component={Shop}
    />
  </Stack.Navigator>
);

export default ShopStackNavigator;
