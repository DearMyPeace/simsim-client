import { atom } from 'recoil';

// todo: 임시
export const userStatus = atom<number>({
  key: 'userStatus',
  default: -1,
});
