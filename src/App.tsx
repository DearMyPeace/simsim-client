import React from 'react';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import Diary from '@navigators/DiaryStackNavigator';
import MyPage from '@screens/mypage/MyPage';
import PieceChip from '@components/diary/header/PieceChip';
import SettingButton from '@components/diary/header/SettingButton';

const App = () => {
  const Tab = createBottomTabNavigator();

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { backgroundColor: 'white', paddingBottom: 5 },
            tabBarLabelStyle: { fontFamily: 'GowunBatang-Regular' },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerLeft: () => <PieceChip />,
            headerRight: () => <SettingButton />,
            headerShadowVisible: false,
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerLeftContainerStyle: { paddingLeft: 16 },
            tabBarLabel: '달력',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="calendar-edit" color={color} size={26} />
            ),
          }}
        >
          <Tab.Screen
            name="Diary"
            component={Diary}
            options={{
              tabBarLabel: '달력',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="calendar-edit" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Peace"
            component={Diary}
            options={{
              tabBarLabel: '조각',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="3"
            component={Diary}
            options={{
              tabBarLabel: '인공지능 편지',
              tabBarIcon: ({ color }) => <Entypo name="colours" color={color} size={26} />,
            }}
          />
          <Tab.Screen
            name="MyPage"
            component={MyPage}
            options={{
              tabBarLabel: '조각상점',
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
