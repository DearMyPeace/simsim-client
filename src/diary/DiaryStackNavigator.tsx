import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DiaryPage from './DiaryPage';

const Stack = createStackNavigator();
const DiaryStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="DiaryPage" component={DiaryPage} />
  </Stack.Navigator>
);

export default DiaryStackNavigator;
