export type Category = 'kansallispuisto' | 'luonnonpuisto' | 'muu retkeilyalue';

export interface LocationPoint {
  id: number;
  name: string;
  description: string;
  position: [number, number];
  category: Category;
  visited: boolean;
  link: string;
  visitDate: string;
  municipality: string;
  region: string;
}
