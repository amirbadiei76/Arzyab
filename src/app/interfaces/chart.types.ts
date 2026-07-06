export type RangeKey = '7D' | '1M' | '3M' | '6M' | '1Y' | 'All';
export type IntervalKey = '1D' | '1W' | '1M';

export interface Preset {
  key: string;
  label: string;
  title: string;
  range: RangeKey;
  interval: IntervalKey;
}

export interface ChartState {
  range: RangeKey;
  interval: IntervalKey;
}

export interface OhlcPoint {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}


export interface RawData {
    p: string;
    h: string;
    l: string;
    ts: string;
}

export interface ChartData {
    t: number[],
    c: number[],
    o: number[],
    h: number[],
    l: number[],
    v?: number[],
    s?: string
}
  
export interface CandleData {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
}
  
export interface VolumeData {
    time: number;
    value: number;
    color: string;
}