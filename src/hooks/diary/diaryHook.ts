import { useDiaryList } from '@api/diary/get';
import { tense } from '@stores/tense';
import { useRecoilValue } from 'recoil';

const useDiaryHook = (selectedDate: string) => {
  const dateStatus = useRecoilValue(tense);
  const { data, isPending, isError, isSuccess } = useDiaryList(selectedDate, dateStatus);

  return {
    data: data?.diaryList || [],
    isPending,
    isError,
    isSuccess,
    sendStatus: data?.sendStatus || false,
  };
};

export default useDiaryHook;
