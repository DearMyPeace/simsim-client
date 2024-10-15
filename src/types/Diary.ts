import { Dispatch, SetStateAction } from 'react';

export interface IDiary {
  id: number;
  content: string;
  createdTime: string;
}

export interface IDiaryList {
  diaryList: IDiary[];
}

export const NEW_DIARY = -1;

export const newDiary = {
  id: NEW_DIARY,
  content: '이 날의 심심기록을 남겨보세요',
  createdTime: '',
};

export type DateStatus = 'TODAY' | 'PAST' | 'FUTURE';

export interface IDiaryCarouselProps {
  selectedDate: string;
}

export interface IDiaryCardProps extends IDiary {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  isLetterSent: boolean;
  isSuccess: boolean;
}

export interface IDate {
  year: string;
  month: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';
}

export interface IDay extends IDate {
  day: string;
}

export interface IMarkedDates {
  [key: string]: {
    selected: boolean;
    marked: boolean;
    dotColor: string;
    disableTouchEvent?: boolean;
    disabled?: boolean;
  };
}

// api 요청 관련 타입
export interface IDiariesResponse {
  diaryId: number;
  content: string;
  createdDate: string;
  uerId: number;
  deleteYn: 'Y' | 'N';
  markedDate: string;
  modifiedDate: string;
}
export interface IDiaryListResponse {
  sendStatus: boolean;
  diaries: IDiariesResponse[];
}

export interface IDiaryCount {
  markedDate: string;
  diaryCount: number;
}

export interface IDiaryPostRequest {
  content: string;
  createdDate: string; // iso8601
  modifiedDate: string; // iso8601
}

export interface IDiaryPostResponse {
  diaryId: number;
  content: string;
  createdDate: string;
  modifiedDate: string;
}

export interface IDiaryPatchRequest {
  diaryId: number;
  data: IDiaryPostRequest;
}

export type DiaryButtonType = 'SAVE' | 'CLOSE' | 'DELETE' | 'SEND';
