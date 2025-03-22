import { useQuery } from '@tanstack/react-query';
import { fetchMonthlyReport } from '@api/report/get';
import { ICalendarModalDate } from '@type/Diary';
import { IReportData } from '@type/IReport';

export const useReportData = (selectedDate: ICalendarModalDate) => {
  return useQuery({
    queryKey: ['reportList', selectedDate],
    queryFn: () =>
      fetchMonthlyReport(`${selectedDate.year}${selectedDate.month.toString().padStart(2, '0')}`),
    placeholderData: [],
  });
};

export const useReportKeyword = ({
  selectedDate,
  rank,
}: {
  selectedDate: ICalendarModalDate;
  rank: number;
}) => {
  return useQuery({
    queryKey: ['reportKeyword', selectedDate, rank],
    queryFn: () =>
      fetchMonthlyReport(`${selectedDate.year}${selectedDate.month.toString().padStart(2, '0')}`),
    select: (reportData: IReportData[]) => ({
      keyword: reportData[rank - 1].keyword,
      comment: reportData[rank - 1].comment,
    }),
  });
};
