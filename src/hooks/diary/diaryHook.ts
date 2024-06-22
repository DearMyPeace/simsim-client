import { useDiaryList } from '@api/diary/get';

const useDiaryHook = (selectedDate: string) => {
  const { data, isPending, isError } = useDiaryList(selectedDate);

  return {
    data: data || [],
    isPending,
    isError,
  };
};

export default useDiaryHook;
