import { useDiaryList } from '@api/diary/get';
import { markedDateStatus } from '@stores/tense';
import { NEW_DIARY } from '@type/Diary';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

const useDiaryHook = (selectedDate: string) => {
  const markedDateSet = useRecoilValue(markedDateStatus);
  const { data, isPending, isError, isSuccess } = useDiaryList(
    selectedDate,
    markedDateSet.has(selectedDate),
  );
  const newDiary = [
    {
      id: NEW_DIARY,
      content: '이 날의 심심기록을 남겨보세요',
      createdTime: '',
    },
  ];

  return {
    data: markedDateSet.has(selectedDate) ? data?.diaryList || [] : newDiary,
    isPending,
    isError,
    isSuccess,
    sendStatus: markedDateSet.has(selectedDate) ? data?.sendStatus || false : false,
  };
};

export default useDiaryHook;
