import { IAiLetterEntry } from '@type/IAiLetterEntry';

export const generateDateRange = (startDate: Date, endDate: Date): Date[] => {
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
    acc[new Date(entry.date).toISOString().slice(0, 10)] = entry;
    return acc;
  }, {});

  return dates.map((date) => {
    const dateStr = date.toISOString().slice(0, 10);
    return entriesByDate[dateStr] || { date: dateStr, isPlaceholder: true };
  });
};
