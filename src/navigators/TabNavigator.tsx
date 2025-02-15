import React, { lazy } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Diary from '@navigators/DiaryStackNavigator';
import PieceChip from '@components/diary/header/PieceChip';
import SettingButton from '@components/diary/header/SettingButton';
import { CalendarIcon, AiLetterIcon, PieceIcon, ShopIcon } from '@components/common/TabIcons';
import { appColor3 } from '@utils/colors';

const AiLetter = lazy(() => import('@navigators/AiLetterStackNavigator'));
const Piece = lazy(() => import('@navigators/PieceStackNavigator'));
const Shop = lazy(() => import('@navigators/ShopStackNavigator'));

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      // initialRouteName="AiLetter"
      screenOptions={{
        tabBarStyle: styles.tabbarStyle,
        tabBarLabelStyle: { fontFamily: 'GowunBatang-Regular' },
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: appColor3,
        tabBarInactiveTintColor: 'gray',
        headerLeft: () => <PieceChip />,
        headerRight: () => <SettingButton />,
        headerShadowVisible: false,
        headerTitle: '',
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerRightContainerStyle: { paddingRight: 16 },
        title: '심심조각',
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
    borderColor: 'transparent',
    ...Platform.select({
      web: {
        paddingBottom: 5,
        paddingTop: 0,
      },
      ios: {
        paddingBottom: 20,
        paddingTop: 10,
      },
      android: {
        paddingBottom: 5,
        elevation: 0,
      },
    }),
  },
});

export default TabNavigator;
