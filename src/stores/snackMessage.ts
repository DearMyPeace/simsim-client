import { atom } from 'recoil';

export const snackMessage = atom<string>({
  key: 'snackMessage',
  default: '',
});
