import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Shop from '@screens/shop/Shop';
import useUserSetup from '@hooks/user/useUserSetup';

const Stack = createStackNavigator();

const ShopStackNavigator = () => {
  useUserSetup();
  return (
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
          title: '조각상점',
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
        name="Shop"
        component={Shop}
      />
    </Stack.Navigator>
  );
};

export default ShopStackNavigator;
