import { useMemo } from 'react';
import { scaleLinear, scaleBand, ScaleInput } from '@visx/scale';
import { bisector } from 'd3-array';
import { ChartSizeType, MarginType, Point } from './types';
import { AxisScale, TickFormatter } from '@visx/axis';

export const getChartSize = (margin: MarginType, clientWidth?: number, clientHeight?: number): ChartSizeType => {
  const width = clientWidth || 0;
  const height = clientHeight || 0;

  const innerWidth = Math.max(width - margin.left - margin.right, 0);
  const innerHeight = Math.max(height - margin.top - margin.bottom, 0);

  return {
    width,
    height,
    innerWidth,
    innerHeight,
  };
};

// Accessors
export const getAmount = (d: Point) => d.amount;
export const getDate = (d: Point) => d.date;
export const getYear = (d: Point) => d.date.getFullYear();
export const bisectValue = bisector<Point, number>(getYear).left;

// Scales
// Y axis
export const useValueScale = (data: Point[], size: ChartSizeType, margin: MarginType) =>
  useMemo(
    () =>
      scaleLinear({
        range: [size.innerHeight + margin.top, margin.top],
        domain: [0, Math.max(...data.map(item => getAmount(item)), 0)],
        nice: true,
      }),
    [data, margin.top, size.innerWidth],
  );

// X axis
export const useTimeScale = (data: Point[], size: ChartSizeType, margin: MarginType) =>
  useMemo(
    () =>
      scaleLinear({
        range: [margin.left, size.innerWidth + margin.left],
        domain: [data.length ? getYear(data[0]) : 0, data.length ? getYear(data[data.length - 1]) : 0],
      }),
    [data, margin.left, size.innerWidth],
  );

export const valueFormat: TickFormatter<ScaleInput<AxisScale>> = (v: number) => {
  if (v > 1000) {
    return `$${Math.round(v / 1000)}k`
  }
  return `$${v}`;
}

export const timeFormat: TickFormatter<ScaleInput<AxisScale>> = (v: Date) => {
  return `${v}`;
}
