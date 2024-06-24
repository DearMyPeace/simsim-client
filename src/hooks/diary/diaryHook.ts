import { useDiaryList } from '@api/diary/get';
import { tense } from '@stores/tense';
import { useRecoilValue } from 'recoil';

const useDiaryHook = (selectedDate: string) => {
  const dateStatus = useRecoilValue(tense);
  const { data, isPending, isError, isSuccess } = useDiaryList(selectedDate, dateStatus);

  return {
    data: data || [],
    isPending,
    isError,
    isSuccess,
  };
};

export default useDiaryHook;
