import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Diary from '@navigators/DiaryStackNavigator';
import MyPage from '@screens/mypage/MyPage';
import AiLetter from '@navigators/AiLetterStackNavigator';

const AiLetterIcon = ({ color }) => (
  <MaterialCommunityIcons name="email-outline" color={color} size={26} />
);
import PieceChip from '@components/diary/header/PieceChip';
import SettingButton from '@components/diary/header/SettingButton';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: 'white', paddingBottom: 5 },
        tabBarLabelStyle: { fontFamily: 'GowunBatang-Regular' },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerLeft: PieceChip,
        headerRight: SettingButton,
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
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="AiLetter"
        component={AiLetter}
        options={{
          headerShown: false,
          tabBarLabel: '인공지능 편지',
          tabBarIcon: AiLetterIcon,
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
  );
};

export default TabNavigator;
