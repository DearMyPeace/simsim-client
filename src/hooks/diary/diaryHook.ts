import { useDiaryList } from '@api/diary/get';
import { markedDateStatus } from '@stores/tense';
import { useRecoilValue } from 'recoil';

const useDiaryHook = (selectedDate: string) => {
  const markedDateSet = useRecoilValue(markedDateStatus);
  const { data, isPending, isError, isSuccess } = useDiaryList(
    selectedDate,
    markedDateSet.has(selectedDate),
  );

  return {
    data: data?.diaryList || [],
    isPending,
    isError,
    isSuccess,
    sendStatus: data?.sendStatus || false,
  };
};

export default useDiaryHook;
