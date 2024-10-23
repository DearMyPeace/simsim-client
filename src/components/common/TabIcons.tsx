import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ITabBarIconProps } from '@type/ITabBarIconProps';
import CalendarIconSVG from '@assets/images/diary.svg';
import PieceIconSVG from '@assets/images/piece.svg';
import MailOpen from '@assets/svg/icons/ion--mail-open-outline.svg';
import Mail from '@assets/svg/icons/ion--mail-outline.svg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MyIconButtons from '@components/common/MyIconButtons';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '@stores/login';
import { alertColor } from '@utils/colors';

export const CalendarIcon = memo(({ color }: ITabBarIconProps) => {
  return <CalendarIconSVG style={{ color: color }} width={24} height={24} />;
});

export const AiLetterIcon = ({ focused, color, size }: ITabBarIconProps) => {
  const userInfo = useRecoilValue(userInfoState);
  const mailIcon =
    userInfo.replyStatus === 'C' ? (
      <MailOpen width={26} height={26} fill={color} />
    ) : (
      <Mail width={26} height={26} fill={color} />
    );
  const showBadge = userInfo.replyStatus === 'R';

  return (
    <View>
      {focused ? <MailOpen width={26} height={26} fill={color} /> : mailIcon}
      {showBadge && <View style={styles.badge} />}
    </View>
  );
};

export const ShopIcon = memo(({ color }: ITabBarIconProps) => (
  <AntDesign name="isv" color={color} size={24.5} />
));

export const PieceIcon = memo(({ color }: ITabBarIconProps) => {
  return <PieceIconSVG style={{ color: color }} width={34} height={34} />;
});

export const CloseIcon = ({ onPress }: { onPress: () => {} }) => (
  <MyIconButtons
    name={'close'}
    iconSet={'MaterialCommunityIcons'}
    size={24}
    onPress={onPress}
    style={{ paddingHorizontal: 16 }}
  />
);

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -1,
    top: 1,
    backgroundColor: alertColor,
    borderRadius: 8,
    width: 7,
    height: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
