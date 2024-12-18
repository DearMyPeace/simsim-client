export interface ILoginProps {
  handleLoginPress: (func: () => void) => void;
}

export interface AppleData {
  authorization: string;
  user: string | undefined;
}

export interface GoogleTokenData {
  access_token: string;
}

export type KakaoTokenData = GoogleTokenData;
