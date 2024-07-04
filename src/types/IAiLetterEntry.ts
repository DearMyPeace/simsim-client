// AiLetterEntryInterface.ts

export interface IID {
  id: number;
}

export interface IAiLetterEntry {
  id?: IID;
  date: string;
  summary?: string;
  content?: string;
  isPlaceholder?: boolean;
  replyStatus?: string;
}
