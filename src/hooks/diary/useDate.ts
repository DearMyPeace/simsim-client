import { tense } from '@stores/tense';
import { getToday } from '@utils/dateUtils';
import { isPast, isSameDay } from 'date-fns';
import { useSetRecoilState } from 'recoil';

const useDate = () => {
  const setDateStatus = useSetRecoilState(tense);

  const saveDateStatus = (date: string) => {
    if (isSameDay(date, new Date(getToday()))) {
      setDateStatus('TODAY');
    } else if (isPast(new Date(date))) {
      setDateStatus('PAST');
    } else {
      setDateStatus('FUTURE');
    }
  };

  return saveDateStatus;
};

export default useDate;
