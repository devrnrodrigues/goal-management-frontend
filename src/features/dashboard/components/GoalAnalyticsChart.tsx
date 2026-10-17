import React from 'react';
import { useTheme } from 'styled-components';
import type { GoalAnalyticsChartProps } from './GoalAnalyticsChart.types';
import {
  ChartCardContainer,
  ChartHeader,
  ChartTitle,
  LegendContainer,
  LegendItem,
  SvgContainer,
} from '../styles/GoalAnalyticsChart.styles';

export const GoalAnalyticsChart: React.FC<GoalAnalyticsChartProps> = ({ data }) => {
  const theme = useTheme();

  const maxValue = 20;
  const chartHeight = 210;
  const chartWidth = 1100;
  const horizontalOffset = 50;
  const usableWidth = chartWidth - horizontalOffset;
  const stepX = usableWidth / data.length;

  return (
    <ChartCardContainer>
      <ChartHeader>
        <ChartTitle>Evolução de metas</ChartTitle>
        <LegendContainer>
          <LegendItem $color={theme.colors.primary}>Planejado</LegendItem>
          <LegendItem $color={theme.colors.statusWarning}>Concluído</LegendItem>
        </LegendContainer>
      </ChartHeader>

      <SvgContainer>
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight + 40}`}
          width="100%"
          height="100%"
        >
          {[0, 5, 10, 15, 20].map((val) => {
            const y = chartHeight - (val / maxValue) * chartHeight + 10;
            return (
              <g key={val}>
                <line
                  x1={horizontalOffset}
                  y1={y}
                  x2={chartWidth}
                  y2={y}
                  stroke={theme.colors.borderLight}
                  strokeDasharray="3 3"
                />
                <text
                  x={horizontalOffset - 8}
                  y={y + 4}
                  fontSize="10"
                  fill={theme.colors.textMuted}
                  textAnchor="end"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {data.map((item, idx) => {
            const x = horizontalOffset + idx * stepX + stepX / 2;
            const barWidth = 9;
            const plannedHeight = (item.planned / maxValue) * chartHeight;
            const completedHeight = (item.completed / maxValue) * chartHeight;

            return (
              <g key={item.month}>
                <rect
                  x={x - barWidth - 2}
                  y={chartHeight - plannedHeight + 10}
                  width={barWidth}
                  height={plannedHeight}
                  fill={theme.colors.primary}
                  rx="4"
                >
                  <title>{`${item.month} - Planejado: ${item.planned}`}</title>
                </rect>

                <rect
                  x={x + 2}
                  y={chartHeight - completedHeight + 10}
                  width={barWidth}
                  height={completedHeight}
                  fill={theme.colors.statusWarning}
                  rx="4"
                >
                  <title>{`${item.month} - Concluído: ${item.completed}`}</title>
                </rect>

                <text
                  x={x}
                  y={chartHeight + 28}
                  fontSize="11"
                  fill={theme.colors.textSecondary}
                  textAnchor="middle"
                >
                  {item.month}
                </text>
              </g>
            );
          })}
        </svg>
      </SvgContainer>
    </ChartCardContainer>
  );
};
