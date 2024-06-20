// AiLetterEntryInterface.ts
export interface IAiLetterEntry {
  id?: string;
  date: string;
  summary?: string;
  content?: string;
  isPlaceholder?: boolean;
}
