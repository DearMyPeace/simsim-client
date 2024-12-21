import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Piece from '@screens/piece/Piece';
import useUserSetup from '@hooks/user/useUserSetup';
import NewReportView from '@screens/report/NewReportView';
const Stack = createStackNavigator();

const PieceStackNavigator = () => {
  useUserSetup();
  return (
    <Stack.Navigator
      initialRouteName="Piece"
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
          title: '마음조각',
        }}
        name="Piece"
        component={Piece}
        // component={NewReportView}
      />
    </Stack.Navigator>
  );
};

export default PieceStackNavigator;
