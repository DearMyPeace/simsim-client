import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import DiaryScreen from '@screens/diary/DiaryScreen';
import useUserSetup from '@hooks/user/useUserSetup';

const Stack = createStackNavigator();

const DiaryStackNavigator = () => {
  useUserSetup();
  return (
    <Stack.Navigator
      initialRouteName="Diary"
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
          title: '심심기록',
        }}
        name="Diary"
        component={DiaryScreen}
      />
    </Stack.Navigator>
  );
};

export default DiaryStackNavigator;
