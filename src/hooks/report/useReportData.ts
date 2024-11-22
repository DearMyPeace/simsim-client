import { useQuery } from '@tanstack/react-query';
import { fetchMockReportData } from '@api/report/get';
import { ICalendarModalDate } from '@type/Diary';

const useReportData = (selectedDate: ICalendarModalDate) => {
  return useQuery({
    queryKey: ['report', selectedDate],
    queryFn: () =>
      fetchMockReportData(`${selectedDate.year}${selectedDate.month.toString().padStart(2, '0')}`),
  });
};

export default useReportData;
