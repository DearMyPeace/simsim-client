import { DateStatus } from '@type/Diary';
import { atom } from 'recoil';

export const tense = atom<DateStatus | null>({
  key: 'tense',
  default: 'TODAY',
});
