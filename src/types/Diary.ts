export interface IDiary {
  id: number;
  content: string;
  createdTime: string;
}

export interface IDiaryList {
  diaryList: IDiary[];
}

export const NEW_DIARY = -1;

export type DateStatus = 'FUTURE' | 'TODAY' | 'PAST';

export interface IDiaryCarouselProps {
  selectedDate: string;
  dateStatus: DateStatus;
}

export interface IDiaryCardProps extends IDiary {
  dateStatus: DateStatus;
}

export interface IDate {
  year: string;
  month: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';
}

export interface IMarkedDates {
  [key: string]: {
    selected: boolean;
    marked: boolean;
    dotColor: string;
  };
}

// api 요청 관련 타입
export interface IDiaryListResponse {
  diaryId: number;
  userId: number;
  content: string;
  createdDate: string;
  modifiedDate: string;
}

export interface IDiaryCount {
  markedDate: string;
  diaryCount: number;
}

export interface IDiaryPostRequest {
  userId: number;
  content: string;
  createdDate: string; // yyyy-MM-dd HH:mm:ss
  modifiedDate: string; // yyyy-MM-dd HH:mm:ss (생성 시각과 동일)
}

export interface IDiaryPostResponse {
  diaryId: number;
  userId: number;
  content: string;
  createdDate: string;
  modifiedDate: string;
}

export interface IDiaryPatchRequest {
  id: number;
  data: IDiaryPostRequest;
}
