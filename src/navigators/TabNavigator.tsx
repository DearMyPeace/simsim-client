import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Diary from '@navigators/DiaryStackNavigator';
import MyPage from '@screens/mypage/MyPage';
import AiLetter from '@navigators/AiLetterStackNavigator';
import PieceChip from '@components/diary/header/PieceChip';
import SettingButton from '@components/diary/header/SettingButton';
import { AiLetterIcon, CalendarIcon, PieceIcon, ShopIcon } from '@components/common/TabIcons';

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
      }}
    >
      <Tab.Screen
        name="Diary"
        component={Diary}
        options={{
          tabBarLabel: '달력',
          tabBarIcon: CalendarIcon,
        }}
      />
      <Tab.Screen
        name="Peace"
        component={Diary}
        options={{
          tabBarLabel: '조각',
          tabBarIcon: PieceIcon,
        }}
      />
      <Tab.Screen
        name="AiLetter"
        component={AiLetter}
        options={{
          headerShown: false,
          tabBarLabel: '편지',
          tabBarIcon: AiLetterIcon,
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarLabel: '조각상점',
          tabBarIcon: ShopIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
