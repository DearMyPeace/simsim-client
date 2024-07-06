import { useDiaryList } from '@api/diary/get';
import { markedDateStatus } from '@stores/tense';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const useDiaryHook = (selectedDate: string) => {
  const markedDateSet = useRecoilValue(markedDateStatus);
  const [isMarked, setIsMarked] = useState(false);

  useEffect(() => {
    setIsMarked(markedDateSet.has(selectedDate));
  }, [selectedDate, markedDateSet]);

  const { data, isPending, isError, isSuccess } = useDiaryList(selectedDate, isMarked);

  return {
    data: data?.diaryList || [],
    isPending,
    isError,
    isSuccess,
    sendStatus: data?.sendStatus || false,
  };
};

export default useDiaryHook;
