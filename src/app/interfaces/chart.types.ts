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