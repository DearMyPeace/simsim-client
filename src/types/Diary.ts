export interface IDiary {
  id: string;
  createdTime: string;
  content: string;
}

export interface IDiaryList {
  diaryList: IDiary[];
}

export interface IDiaryCardProps {
  createdTime: string;
  content: string;
}
