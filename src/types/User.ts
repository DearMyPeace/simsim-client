// todo: 필요한 정보만 저장하기
export interface IUserInfo {
  userId: number;
  name: string;
  email: string;
  role: string;
  pieceCnt: number;
  personaCode: string;
  personaName: string;
  bgImage: string | null;
  userStatus: 'Y' | 'N';
  replyStatus: 'R' | 'C' | 'D'; // R: recieve, C: check, D: default
  providerName: 'GOOGLE' | 'APPLE' | '';
}
