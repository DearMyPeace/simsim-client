import { useDiaryList } from '@api/diary/get';

const useDiaryHook = (selectedDate: string) => {
  const { data, isPending, isError, isSuccess } = useDiaryList(selectedDate);

  return {
    data: data || [],
    isPending,
    isError,
    isSuccess,
  };
};

export default useDiaryHook;
