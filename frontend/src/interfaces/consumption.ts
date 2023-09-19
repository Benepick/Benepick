interface Segment {
  percent: number;
  color: string;
}

type Segments = Segment[];

export interface CircleChartProps {
  segments: Segments;
  totalAmount: number;
}
