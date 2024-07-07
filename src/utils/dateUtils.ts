import { IDate } from '@type/Diary';
import { IAiLetterEntry } from '@type/IAiLetterEntry';
import { format } from 'date-fns';

export const fillDatesWithData = (dates: Date[], entries: IAiLetterEntry[]): IAiLetterEntry[] => {
  const entriesByDate = entries.reduce<Record<string, IAiLetterEntry>>((acc, entry) => {
    const entryDate = new Date(entry.date);
    if (!isNaN(entryDate.getTime())) {
      acc[entryDate.toISOString().slice(0, 10)] = entry;
    } else {
      console.warn(`Invalid date format in entry: ${entry.date}`);
    }
    return acc;
  }, {});

  return dates.map((date) => {
    const dateStr = date.toISOString().slice(0, 10);
    return entriesByDate[dateStr] || { date: dateStr, isPlaceholder: true };
  });
};

export const generateDateRange = (startDateStr: string, endDateStr: string): Date[] => {
  const dates = [];
  let currentDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

export const generateDateRangeEntry = (entries: IAiLetterEntry[]): IAiLetterEntry[] => {
  const sortedEntries = entries
    .slice()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (sortedEntries.length === 0) return [];

  const startDate = sortedEntries[0].date;
  const endDate = sortedEntries[sortedEntries.length - 1].date;

  const dateRange = generateDateRange(startDate, endDate);

  return fillDatesWithData(dateRange, sortedEntries);
};

export const getToday = () => format(new Date(), 'yyyy-MM-dd');

export const getYear = () => format(new Date(), 'yyyy');

export const getMonth = () => format(new Date(), 'MM') as IDate['month'];
