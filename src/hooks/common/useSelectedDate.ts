import { useRecoilValue } from 'recoil';
import { selectedDateStatus } from '@stores/tense';
import { IDate } from '@type/Diary';
import { format } from 'date-fns';

export const useSelectedDate = () => {
  const tense = useRecoilValue(selectedDateStatus);
  return {
    tense,
    getToday: () => tense,
    getYear: () => format(new Date(tense), 'yyyy'),
    getMonth: () => format(new Date(tense), 'MM') as IDate['month'],
    getDay: () => format(new Date(tense), 'yyyy'),
  };
};
