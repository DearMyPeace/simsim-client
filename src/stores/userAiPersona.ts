import { atom } from 'recoil';

export const userAiPersonaStatus = atom<string>({
  key: 'userAiPersonaStatus',
  default: '공감형',
});
