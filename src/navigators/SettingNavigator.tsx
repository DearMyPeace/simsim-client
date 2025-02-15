import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CloseIcon } from '@components/common/TabIcons';
import { fontLarge } from '@utils/Sizing';
import SettingScreen from '@screens/setting/SettingScreen';
import SettingUserInfoScreen from '@screens/setting/SettingUserInfoScreen';
import SettingTermsScreen from '@screens/setting/SettingTermsScreen';

const Stack = createStackNavigator();

const SettingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: 'white' },
        headerTitleStyle: {
          fontFamily: 'GowunBatang-Regular',
          fontSize: fontLarge,
          paddingHorizontal: 10,
        },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTintColor: 'black',
        headerTitleAlign: 'left',
        headerLeft: () => null,
        headerRight: () => <CloseIcon onPress={navigation.goBack} />,
        title: '설정',
      })}
    >
      <Stack.Screen name="Setting" component={SettingScreen} options={{ title: '설정' }} />
      <Stack.Screen
        name="SettingUserInfo"
        component={SettingUserInfoScreen}
        options={{ title: '정보' }}
      />
      <Stack.Screen
        name="SettingTerms"
        component={SettingTermsScreen}
        options={{ title: '방침' }}
      />
    </Stack.Navigator>
  );
};

export default SettingNavigator;
