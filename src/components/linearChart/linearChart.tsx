import React, { useCallback, useEffect, useState } from 'react';
import uniqueId from 'lodash/uniqueId';

import { AreaClosed, Line, Bar, LinePath } from '@visx/shape';
import { withTooltip, TooltipWithBounds } from '@visx/tooltip';
import { AnimatedAxis, AnimatedGridRows } from '@visx/react-spring';
import { curveMonotoneX } from '@visx/curve';
import { Orientation } from '@visx/axis';
import { localPoint } from '@visx/event';
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';

import { ChartSizeType, HUNDRED_THOUSAND, MarginType, MILLION, Point } from './types';
import {
  bisectValue,
  getAge,
  getAmount,
  getChartSize,
  getYear,
  timeFormat,
  useTimeScale,
  useValueScale,
  valueFormat,
} from '~/components/linearChart/chartUtils';
import useClientRect from '~/hooks/useClientRect';
import { Container } from '~/components/linearChart/linearChart.styled';

// Leave additional space for the axis and tooltips
const margin: MarginType = { top: 10, right: 0, bottom: 30, left: 40 };

export const backgroundColor = 'rgb(39, 43, 77)';
export const lineColor = 'rgb(38, 222, 176)';
const axisColor = '#fff';
const tickLabelColor = '#fff';
export const labelColor = 'rgba(254, 110, 158, 0.6)';
const gridColor = '#6e0fca';

const tickLabelYProps = () =>
  ({
    x: 5,
    fill: tickLabelColor,
    fontSize: 12,
    fontFamily: 'sans-serif',
    textAnchor: 'end',
  } as const);

const tickLabelXProps = () =>
  ({
    fill: tickLabelColor,
    fontSize: 12,
    fontFamily: 'sans-serif',
    textAnchor: 'middle',
  } as const);

type Props = {
  data: Point[];
};

const LinearChart = withTooltip<Props, Point>(
  ({
    data,
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
  }: Props & WithTooltipProvidedProps<Point>) => {
    // Chart size calculation
    const [rect, containerRef] = useClientRect();
    const [size, setSize] = useState<ChartSizeType>({
      width: 500,
      height: 500,
      innerWidth: 500 - margin.left,
      innerHeight: 500 - margin.bottom,
    });
    useEffect(() => {
      if (rect?.width) {
        setSize(getChartSize(margin, rect.width, rect.height));
      }
    }, [rect]);

    const { width, height, innerWidth, innerHeight } = size;

    const amountScale = useValueScale(data, size, margin);
    const timeScale = useTimeScale(data, size, margin);

    // The tooltip handler
    const handleTooltip = useCallback(
      (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
        const { x } = localPoint(event) || { x: 0 };
        const x0 = timeScale.invert(x);
        const index = bisectValue(data, x0, 1);
        const d0 = data[index - 1];
        const d1 = data[index];
        let d = d0;
        if (d1 && getYear(d1)) {
          d = x0.valueOf() - getYear(d0).valueOf() > getYear(d1).valueOf() - x0.valueOf() ? d1 : d0;
        }
        if (!d) return;
        showTooltip({
          tooltipData: d,
          tooltipLeft: timeScale(getYear(d)),
          tooltipTop: amountScale(getAmount(d)),
        });
      },
      [amountScale, data, showTooltip, timeScale],
    );

    const maxValue = Math.max(...data.map(e => getAmount(e)), 0);
    const ticks = Math.round(maxValue / (maxValue >= 2 * MILLION ? MILLION : HUNDRED_THOUSAND));

    return (
      <Container ref={containerRef}>
        <svg width={width} height={height}>
          <AreaClosed<Point>
            data={data}
            x={d => timeScale(getYear(d)) ?? 0}
            y={d => amountScale(getAmount(d)) ?? 0}
            yScale={amountScale}
            fill="url(#visx-axis-gradient)"
            curve={curveMonotoneX}
            height={innerHeight}
            width={innerWidth}
          />
          <AnimatedGridRows
            key="gridrows-center"
            scale={amountScale}
            stroke={gridColor}
            width={innerWidth}
            left={margin.left}
            numTicks={ticks}
            strokeDasharray="1,3"
            animationTrajectory="center"
          />
          <AnimatedAxis
            orientation={Orientation.left}
            scale={amountScale}
            left={margin.left}
            tickFormat={valueFormat}
            stroke={axisColor}
            tickStroke={backgroundColor}
            tickLabelProps={tickLabelYProps}
            numTicks={ticks}
            animationTrajectory="center"
          />
          <AnimatedAxis
            orientation={Orientation.bottom}
            scale={timeScale}
            top={innerHeight + 10}
            tickFormat={timeFormat}
            stroke={axisColor}
            tickStroke={axisColor}
            tickLabelProps={tickLabelXProps}
            animationTrajectory="center"
          />
          <LinePath
            stroke={lineColor}
            strokeWidth={3}
            data={data}
            x={d => timeScale(getYear(d)) ?? 0}
            y={d => amountScale(getAmount(d)) ?? 0}
          />
          <Bar
            x={margin.left}
            y={margin.top}
            width={innerWidth}
            height={innerHeight}
            fill="transparent"
            rx={14}
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: amountScale(getAmount(tooltipData)) }}
                to={{ x: tooltipLeft, y: innerHeight + margin.top }}
                stroke={lineColor}
                strokeWidth={1}
                pointerEvents="none"
                strokeDasharray="5,2"
              />
              <circle cx={tooltipLeft} cy={tooltipTop} r={4} fill={lineColor} pointerEvents="none" />
            </g>
          )}
        </svg>
        {tooltipData && (
          <div>
            <TooltipWithBounds key={uniqueId()} top={tooltipTop - 12} left={tooltipLeft + 12}>
              <div>${Math.round(getAmount(tooltipData))}</div>
              <div>age {getAge(tooltipData)}</div>
            </TooltipWithBounds>
          </div>
        )}
      </Container>
    );
  },
);

export default LinearChart;
