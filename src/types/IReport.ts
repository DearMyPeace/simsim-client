// types.ts
export interface EmotionData {
  happyCnt: number;
  appreciationCnt: number;
  loveCnt: number;
  positiveTotalCnt: number;
  tranquilityCnt: number;
  curiosityCnt: number;
  surpriseCnt: number;
  neutralTotalCnt: number;
  sadCnt: number;
  angryCnt: number;
  fearCnt: number;
  negativeTotalCnt: number;
}

export interface DayEmotionData {
  positiveDate: string;
  positiveTotalCnt: number;
  positiveSummary: string;
  neutralDate: string;
  neutralTotalCnt: number;
  neutralSummary: string;
  negativeDate: string;
  negativeTotalCnt: number;
  negativeSummary: string;
}
