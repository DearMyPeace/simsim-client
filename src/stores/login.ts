import { atom } from 'recoil';

export const authTokenState = atom({
  key: 'authTokenState',
  default: null,
});

export const userInfoState = atom<IUserInfo | null>({
  key: 'userInfoState',
  default: null,
});

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false,
});
