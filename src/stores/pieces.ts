// @stores/pieces.ts
import { atom } from 'recoil';

export const pieces = atom<number>({
  key: 'pieces',
  default: 0,
});
