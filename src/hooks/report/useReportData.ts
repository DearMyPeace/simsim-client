import { useQuery } from '@tanstack/react-query';
import { fetchMockReportData, fetchMockReportKeyword } from '@api/report/get';
import { ICalendarModalDate } from '@type/Diary';

export const useReportData = (selectedDate: ICalendarModalDate) => {
  return useQuery({
    queryKey: ['reportList', selectedDate],
    queryFn: () =>
      fetchMockReportData(`${selectedDate.year}${selectedDate.month.toString().padStart(2, '0')}`),
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
      fetchMockReportKeyword({
        targetDate: `${selectedDate.year}${selectedDate.month.toString().padStart(2, '0')}`,
        rank: rank,
      }),
  });
};
