import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Diary from '@navigators/DiaryStackNavigator';
import Shop from '@navigators/ShopStackNavigator';
import AiLetter from '@navigators/AiLetterStackNavigator';
import Piece from '@navigators/PieceStackNavigator';
import PieceChip from '@components/diary/header/PieceChip';
import SettingButton from '@components/diary/header/SettingButton';
import { CalendarIcon, AiLetterIcon, PieceIcon, ShopIcon } from '@components/common/TabIcons';
import { appColor3 } from '@utils/colors';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      // initialRouteName="AiLetter"
      theme={{
        colors: {
          background: 'transparent',
        },
      }}
      screenOptions={{
        tabBarStyle: styles.tabbarStyle,
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
        name="DiaryTab"
        component={Diary}
        options={{
          tabBarLabel: '기록',
          tabBarIcon: ({ color }) => <CalendarIcon color={color} />,
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tab.Screen
        name="AiLetterTab"
        component={AiLetter}
        options={{
          tabBarLabel: '편지',
          tabBarIcon: ({ focused, color, size }) => (
            <AiLetterIcon focused={focused} color={color} size={size} />
          ),
          tabBarIconStyle: { marginTop: 5 },
        }}
      />
      <Tab.Screen
        name="PieceTab"
        component={Piece}
        options={{
          tabBarLabel: '조각',
          tabBarIcon: ({ color }) => <PieceIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="ShopTab"
        component={Shop}
        options={{
          tabBarLabel: '상점',
          tabBarIcon: ({ color }) => <ShopIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabbarStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.47)',
    paddingBottom: Platform.OS === 'web' ? 5 : 20,
    paddingTop: Platform.OS === 'web' ? 0 : 10,
    borderColor: 'transparent',
  },
});

export default TabNavigator;
