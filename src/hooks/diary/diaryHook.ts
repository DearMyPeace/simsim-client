import { useDiaryList } from '@api/diary/get';
import { markedDateStatus } from '@stores/tense';
import { newDiary } from '@type/Diary';
import { useRecoilValue } from 'recoil';

const useDiaryHook = (selectedDate: string) => {
  const markedDateSet = useRecoilValue(markedDateStatus);
  const { data, isPending, isError, isSuccess } = useDiaryList(
    selectedDate,
    markedDateSet.has(selectedDate),
  );
  const newDiaryData = [newDiary];

  return {
    data: markedDateSet.has(selectedDate) ? data?.diaryList || newDiaryData : newDiaryData,
    isPending,
    isError,
    isSuccess,
    sendStatus: markedDateSet.has(selectedDate) ? data?.sendStatus || false : false,
  };
};

export default useDiaryHook;
