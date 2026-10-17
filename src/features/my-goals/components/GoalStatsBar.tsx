import React from 'react';
import { Target, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import {
  StatsContainer,
  StatCard,
  StatIconWrapper,
  StatInfo,
  StatValue,
  StatLabel,
} from './GoalStatsBar.styles';

interface GoalStatsBarProps {
  totalGoals: number;
  inProgressGoals: number;
  urgentGoals: number;
  averageProgress: number;
}

export const GoalStatsBar: React.FC<GoalStatsBarProps> = ({
  totalGoals,
  inProgressGoals,
  urgentGoals,
  averageProgress,
}) => {
  return (
    <StatsContainer>
      <StatCard>
        <StatIconWrapper $variant="primary">
          <Target size={22} />
        </StatIconWrapper>
        <StatInfo>
          <StatValue>{totalGoals}</StatValue>
          <StatLabel>Total de metas</StatLabel>
        </StatInfo>
      </StatCard>

      <StatCard>
        <StatIconWrapper $variant="info">
          <Activity size={22} />
        </StatIconWrapper>
        <StatInfo>
          <StatValue>{inProgressGoals}</StatValue>
          <StatLabel>Em andamento</StatLabel>
        </StatInfo>
      </StatCard>

      <StatCard>
        <StatIconWrapper $variant="urgent">
          <AlertCircle size={22} />
        </StatIconWrapper>
        <StatInfo>
          <StatValue>{urgentGoals}</StatValue>
          <StatLabel>Prazo crítico</StatLabel>
        </StatInfo>
      </StatCard>

      <StatCard>
        <StatIconWrapper $variant="warning">
          <CheckCircle2 size={22} />
        </StatIconWrapper>
        <StatInfo>
          <StatValue>{averageProgress}%</StatValue>
          <StatLabel>Conclusão média</StatLabel>
        </StatInfo>
      </StatCard>
    </StatsContainer>
  );
};
