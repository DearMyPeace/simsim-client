import { useDiaryList } from '@api/diary/get';
import { markedDateStatus } from '@stores/tense';
import { IDiary, newDiary } from '@type/Diary';
import { useRecoilValue } from 'recoil';

const useDiaryHook = (selectedDate: string) => {
  const markedDateSet = useRecoilValue(markedDateStatus);
  const { data, isPending, isError, isSuccess } = useDiaryList(
    selectedDate,
    markedDateSet.has(selectedDate),
  );

  const diaryData: IDiary[] = isSuccess
    ? data?.diaryList || [newDiary]
    : isPending
    ? [{ ...newDiary, content: '심심기록을 가져오는 중입니다.' }]
    : [{ ...newDiary, content: '심심기록을 가져올 수 없습니다.' }];

  return {
    data: diaryData,
    isPending,
    isError,
    isSuccess,
    sendStatus: data?.sendStatus || false,
  };
};

export default useDiaryHook;
