import { IAiLetterEntry } from '@type/IAiLetterEntry';

export const generateDateRangeTypeDate = (startDate: Date, endDate: Date): Date[] => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

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
