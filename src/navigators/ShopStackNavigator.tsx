import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Shop from '@screens/shop/Shop';

const Stack = createStackNavigator();

const ShopStackNavigator = () => (
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
      component={Shop}
    />
  </Stack.Navigator>
);

export default ShopStackNavigator;
