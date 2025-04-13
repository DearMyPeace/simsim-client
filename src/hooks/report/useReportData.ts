import { useQuery } from '@tanstack/react-query';
import { fetchMonthlyReport } from '@api/report/get';
import { ICalendarModalDate } from '@type/Diary';

export const useReportData = (selectedDate: ICalendarModalDate) => {
  return useQuery({
    queryKey: ['reportList', selectedDate],
    queryFn: () =>
      fetchMonthlyReport(`${selectedDate.year}${selectedDate.month.toString().padStart(2, '0')}`),
    placeholderData: undefined,
    staleTime: Infinity,
  });
};

export const useReportKeyword = ({
  selectedDate,
  rank,
}: {
  selectedDate: ICalendarModalDate;
  rank: number;
}) => {
  const { data: reportData } = useReportData(selectedDate);

  return {
    keyword: reportData?.[rank - 1]?.keyword,
    comment: reportData?.[rank - 1]?.comment,
  };
};
