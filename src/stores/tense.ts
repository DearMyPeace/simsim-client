import { DateStatus } from '@type/Diary';
import { atom } from 'recoil';

export const tense = atom<DateStatus>({
  key: 'tense',
  default: 'TODAY',
});
