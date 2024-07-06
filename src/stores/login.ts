import { atom } from 'recoil';

export const authTokenState = atom({
  key: 'authTokenState',
  default: null,
});

export const userInfoState = atom<IUserInfo>({
  key: 'userInfoState',
  default: {
    userId: -1,
    name: '',
    email: '',
    role: '',
    pieceCnt: 0,
    personaCode: '',
    personaName: '',
    bgImage: null,
    userStatus: 'N',
    replyStatus: 'D',
    providerName: '',
  },
});

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false,
});
