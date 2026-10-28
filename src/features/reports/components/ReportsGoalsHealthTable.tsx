import React from 'react';
import { Target } from 'lucide-react';
import type { GoalHealthReportItem } from '../types';
import {
  HealthCard,
  HealthHeader,
  HealthTitle,
  TableWrapper,
  GoalsTable,
  TableHead,
  TableBody,
  GoalNamePill,
  ProgressWrapper,
  MiniTrack,
  MiniFill,
  ProgressText,
  HealthBadge,
} from '../styles/ReportsGoalsHealthTable.styles';

interface ReportsGoalsHealthTableProps {
  goals: GoalHealthReportItem[];
}

export const ReportsGoalsHealthTable: React.FC<ReportsGoalsHealthTableProps> = ({
  goals,
}) => {
  const getHealthBadgeLabel = (status: GoalHealthReportItem['healthStatus']) => {
    switch (status) {
      case 'completed':
        return 'Concluída';
      case 'on_track':
        return 'No prazo';
      case 'delayed':
        return 'Atrasada';
      case 'at_risk':
      case 'attention':
      default:
        return 'Em risco';
    }
  };

  return (
    <HealthCard>
      <HealthHeader>
        <HealthTitle>Saúde e andamento das metas</HealthTitle>
      </HealthHeader>

      <TableWrapper>
        <GoalsTable>
          <TableHead>
            <tr>
              <th>Meta</th>
              <th>Categoria</th>
              <th>Progresso</th>
              <th>Tarefas</th>
              <th>Prazo final</th>
              <th>Status</th>
            </tr>
          </TableHead>

          <TableBody>
            {goals.map((item) => (
              <tr key={item.id}>
                <td>
                  <GoalNamePill title={item.goalTitle}>
                    <Target size={11} />
                    {item.goalTitle}
                  </GoalNamePill>
                </td>
                <td>{item.category}</td>
                <td>
                  <ProgressWrapper>
                    <MiniTrack>
                      <MiniFill $progress={item.progress} />
                    </MiniTrack>
                    <ProgressText>{item.progress}%</ProgressText>
                  </ProgressWrapper>
                </td>
                <td>
                  {item.completedTasks}/{item.totalTasks}
                </td>
                <td>{item.deadline}</td>
                <td>
                  <HealthBadge $status={item.healthStatus}>
                    {getHealthBadgeLabel(item.healthStatus)}
                  </HealthBadge>
                </td>
              </tr>
            ))}
          </TableBody>
        </GoalsTable>
      </TableWrapper>
    </HealthCard>
  );
};
