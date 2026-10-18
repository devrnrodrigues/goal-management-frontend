import React from 'react';
import { Award, CheckCheck, Clock, TrendingUp } from 'lucide-react';
import type { CompletedGoalsOverviewStats } from '../types';
import {
  StatsGrid,
  StatCard,
  StatHeader,
  StatLabel,
  StatIconWrapper,
  StatValue,
  StatHelper,
} from '../styles/CompletedGoalsStats.styles';

interface CompletedGoalsStatsProps {
  stats: CompletedGoalsOverviewStats;
}

export const CompletedGoalsStats: React.FC<CompletedGoalsStatsProps> = ({ stats }) => {
  return (
    <StatsGrid>
      <StatCard>
        <StatHeader>
          <StatLabel>Metas concluídas</StatLabel>
          <StatIconWrapper>
            <Award size={18} />
          </StatIconWrapper>
        </StatHeader>
        <StatValue>{stats.totalCompletedGoals}</StatValue>
        <StatHelper>100% dos objetivos finalizados</StatHelper>
      </StatCard>

      <StatCard>
        <StatHeader>
          <StatLabel>Tarefas entregues</StatLabel>
          <StatIconWrapper>
            <CheckCheck size={18} />
          </StatIconWrapper>
        </StatHeader>
        <StatValue>{stats.totalDeliveredTasks}</StatValue>
        <StatHelper>Subtarefas finalizadas com sucesso</StatHelper>
      </StatCard>

      <StatCard>
        <StatHeader>
          <StatLabel>Entregas no prazo</StatLabel>
          <StatIconWrapper>
            <TrendingUp size={18} />
          </StatIconWrapper>
        </StatHeader>
        <StatValue>{stats.onTimeSuccessRate}%</StatValue>
        <StatHelper>Aderência ao cronograma inicial</StatHelper>
      </StatCard>

      <StatCard>
        <StatHeader>
          <StatLabel>Tempo médio de ciclo</StatLabel>
          <StatIconWrapper>
            <Clock size={18} />
          </StatIconWrapper>
        </StatHeader>
        <StatValue>{stats.avgDurationDays} dias</StatValue>
        <StatHelper>Do início ao encerramento</StatHelper>
      </StatCard>
    </StatsGrid>
  );
};
