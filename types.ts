export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface FactState {
  text: string;
  loading: boolean;
  error: string | null;
}
