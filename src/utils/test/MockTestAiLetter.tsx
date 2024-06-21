// src/utils/mockTestUtils.ts
import { IAiLetterEntry } from '@type/IAiLetterEntry';
import { generateDateRange, fillDatesWithData } from '@utils/dateUtils';
import AiLetterEntries from '@api/mock/AiLetterEntries';

export const getMockAiLetterEntries = (startDate: Date, endDate: Date): IAiLetterEntry[] => {
  return fillDatesWithData(generateDateRange(startDate, endDate), AiLetterEntries);
};
