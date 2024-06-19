import React from 'react';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import Diary from '@navigators/DiaryStackNavigator';
import MyPage from '@screens/mypage/MyPage';
import PieceChip from '@components/diary/PieceChip';
import SettingButton from '@components/diary/SettingButton';

const App = () => {
  const Tab = createBottomTabNavigator();

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { backgroundColor: 'white' },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen
            name="Diary"
            component={Diary}
            options={{
              headerLeft: () => <PieceChip />,
              headerRight: () => <SettingButton />,
              headerShadowVisible: false,
              headerTitle: '',
              headerLeftContainerStyle: { paddingLeft: 16 },
              tabBarLabel: 'Diary',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="book" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Peace"
            component={Diary}
            options={{
              headerShown: false,
              tabBarLabel: 'Peace',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="3"
            component={Diary}
            options={{
              headerShown: false,
              tabBarLabel: '3',
              tabBarIcon: ({ color }) => <Entypo name="colours" color={color} size={26} />,
            }}
          />
          <Tab.Screen
            name="MyPage"
            component={MyPage}
            options={{
              headerShown: false,
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
