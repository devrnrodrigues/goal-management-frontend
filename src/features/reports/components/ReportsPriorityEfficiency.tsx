import React from 'react';
import type { PriorityEfficiencyItem } from '../types';
import {
  PriorityCard,
  PriorityHeader,
  PriorityTitle,
  PriorityList,
  PriorityRow,
  PriorityTopRow,
  PriorityBadge,
  PriorityStats,
  StatPill,
  OnTimeBarTrack,
  OnTimeBarFill,
  EmptyMessage,
} from '../styles/ReportsPriorityEfficiency.styles';

interface ReportsPriorityEfficiencyProps {
  items: PriorityEfficiencyItem[];
}

export const ReportsPriorityEfficiency: React.FC<ReportsPriorityEfficiencyProps> = ({
  items,
}) => {
  return (
    <PriorityCard>
      <PriorityHeader>
        <PriorityTitle>Eficiência por prioridade</PriorityTitle>
      </PriorityHeader>

      <PriorityList>
        {items.length === 0 ? (
          <EmptyMessage>Nenhuma tarefa registrada para o período selecionado.</EmptyMessage>
        ) : (
          items.map((item) => (
            <PriorityRow key={item.priority}>
              <PriorityTopRow>
                <PriorityBadge $priority={item.priority}>
                  {item.label}
                </PriorityBadge>

                <PriorityStats>
                  <StatPill>{item.completedTasks} concluídas</StatPill>
                  <StatPill>{item.activeTasks} ativas</StatPill>
                  <StatPill>{item.onTimePercentage}% no prazo</StatPill>
                </PriorityStats>
              </PriorityTopRow>

              <OnTimeBarTrack>
                <OnTimeBarFill
                  $percentage={item.onTimePercentage}
                  $priority={item.priority}
                />
              </OnTimeBarTrack>
            </PriorityRow>
          ))
        )}
      </PriorityList>
    </PriorityCard>
  );
};
