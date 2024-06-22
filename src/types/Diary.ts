export interface IDiary {
  id: string;
  content: string;
  createdTime: string;
}

export interface IDiaryList {
  diaryList: IDiary[];
}

export type DateStatus = 'FUTURE' | 'TODAY' | 'PAST';

export interface IDiaryCarouselProps {
  selectedDate: string;
  dateStatus: DateStatus;
}

export interface IDiaryCardProps {
  createdTime: string;
  content: string;
  dateStatus: DateStatus;
}

// api 요청 관련 타입
export interface IDiaryListResponse {
  diaryId: number;
  userId: number;
  content: string;
  createdDate: Date;
  modifiedDate: Date;
}

export interface IDiaryPostRequest {
  userEmail: string;
  createdTime: string; // yyyy-MM-dd HH:mm:ss
  content: string;
}

export interface IDiaryEditRequest extends IDiaryPostRequest {
  id: string;
}

export interface IDiaryDeleteRequest {
  userEmail: string;
  id: string;
}
