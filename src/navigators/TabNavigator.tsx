import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Diary from '@navigators/DiaryStackNavigator';
import Shop from '@navigators/ShopStackNavigator';
import AiLetter from '@navigators/AiLetterStackNavigator';
import Piece from '@navigators/PieceStackNavigator';
import PieceChip from '@components/diary/header/PieceChip';
import SettingButton from '@components/diary/header/SettingButton';
import { AiLetterIcon, CalendarIcon, PieceIcon, ShopIcon } from '@components/common/TabIcons';
import { appColor3 } from '@utils/colors';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      // initialRouteName="Piece"
      screenOptions={{
        tabBarStyle: { backgroundColor: 'white', paddingBottom: 5 },
        tabBarLabelStyle: { fontFamily: 'GowunBatang-Regular' },
        tabBarActiveTintColor: appColor3,
        tabBarInactiveTintColor: 'gray',
        headerLeft: PieceChip,
        headerRight: SettingButton,
        headerShadowVisible: false,
        headerTitle: '',
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerRightContainerStyle: { paddingRight: 16 },
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
        name="AiLetter"
        component={AiLetter}
        options={{
          tabBarLabel: '편지',
          tabBarIcon: AiLetterIcon,
        }}
      />
      <Tab.Screen
        name="Piece"
        component={Piece}
        options={{
          tabBarLabel: '조각',
          tabBarIcon: PieceIcon,
        }}
      />
      <Tab.Screen
        name="Shop"
        component={Shop}
        options={{
          tabBarLabel: '조각상점',
          tabBarIcon: ShopIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
