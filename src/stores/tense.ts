import { DateStatus } from '@type/Diary';
import { format } from 'date-fns';
import { atom } from 'recoil';

export const tense = atom<DateStatus>({
  key: 'tense',
  default: 'TODAY',
});

export const selectedDateStatus = atom<string>({
  key: 'selectedDateStatus',
  default: format(new Date(), 'yyyy-MM-dd'),
});

export const markedDateStatus = atom<Set<string>>({
  key: 'markedDateStatus',
  default: new Set([format(new Date(), 'yyyy-MM-dd')]),
});
