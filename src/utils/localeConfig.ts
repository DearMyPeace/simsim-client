import { LocaleConfig } from 'react-native-calendars';

const setLocaleConfig = () => {
  LocaleConfig.locales['ko'] = {
    monthNames: [
      '일 월',
      '이 월',
      '삼 월',
      '사 월',
      '오 월',
      '유 월',
      '칠 월',
      '팔 월',
      '구 월',
      '시 월',
      '십일 월',
      '십이 월',
    ],
    monthNamesShort: [
      '일 월',
      '이 월',
      '삼 월',
      '사 월',
      '오 월',
      '유 월',
      '칠 월',
      '팔 월',
      '구 월',
      '시 월',
      '십일 월',
      '십이 월',
    ],
    dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: '오늘',
  };
  LocaleConfig.defaultLocale = 'ko';
};

export default setLocaleConfig;
