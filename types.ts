export interface BookData {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  status: 'active' | 'flagged' | 'inactive';
  scanCount: number;
}

export interface ScanResult {
  verified: boolean;
  timestamp: string;
  location: string;
  book?: BookData;
  error?: string;
}

export enum AppView {
  LANDING = 'LANDING',
  READER = 'READER',
  PARTNER = 'PARTNER',
}

export interface ChartData {
  name: string;
  value: number;
}