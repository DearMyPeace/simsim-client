import instance from '@api/axios';
import { GoogleTokenData, AppleData, KakaoTokenData } from '@type/Login';

export const postUserGoogleToken = async (data: GoogleTokenData) => {
  const response = await instance.post('/auth/google', data);
  return response.data;
};

export const postUserAppleToken = async (data: AppleData) => {
  const response = await instance.post('/auth/apple', data);
  return response.data;
};

export const postUserKakaoToken = async (data: KakaoTokenData) => {
  const response = await instance.post('/auth/kakao', data);
  return response.data;
};
