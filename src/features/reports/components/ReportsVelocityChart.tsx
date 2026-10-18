import React from 'react';
import type { MonthlyVelocityItem } from '../types';
import {
  ChartCard,
  ChartHeader,
  ChartTitleWrapper,
  ChartTitle,
  ChartSubtitle,
  LegendRow,
  LegendItem,
  LegendDot,
  BarsContainer,
  BarColumn,
  BarsPair,
  BarFill,
  MonthAxisLabel,
} from '../styles/ReportsVelocityChart.styles';

interface ReportsVelocityChartProps {
  data: MonthlyVelocityItem[];
}

export const ReportsVelocityChart: React.FC<ReportsVelocityChartProps> = ({ data }) => {
  const maxVal = Math.max(
    ...data.map((item) => Math.max(item.completedTasks, item.createdTasks)),
    1
  );

  return (
    <ChartCard>
      <ChartHeader>
        <ChartTitleWrapper>
          <ChartTitle>Ritmo de entrega e criação</ChartTitle>
          <ChartSubtitle>Volume de tarefas concluídas vs novas tarefas criadas</ChartSubtitle>
        </ChartTitleWrapper>

        <LegendRow>
          <LegendItem>
            <LegendDot $variant="completed" />
            <span>Concluídas</span>
          </LegendItem>
          <LegendItem>
            <LegendDot $variant="created" />
            <span>Criadas</span>
          </LegendItem>
        </LegendRow>
      </ChartHeader>

      <BarsContainer>
        {data.map((item) => {
          const completedPercent = Math.round((item.completedTasks / maxVal) * 100);
          const createdPercent = Math.round((item.createdTasks / maxVal) * 100);

          return (
            <BarColumn key={item.id}>
              <BarsPair>
                <BarFill
                  $heightPercent={completedPercent}
                  $variant="completed"
                  title={`${item.completedTasks} concluídas`}
                />
                <BarFill
                  $heightPercent={createdPercent}
                  $variant="created"
                  title={`${item.createdTasks} criadas`}
                />
              </BarsPair>
              <MonthAxisLabel>{item.monthLabel}</MonthAxisLabel>
            </BarColumn>
          );
        })}
      </BarsContainer>
    </ChartCard>
  );
};
