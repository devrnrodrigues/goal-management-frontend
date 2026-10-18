import React from 'react';
import { Target } from 'lucide-react';
import { DashboardOverview } from './DashboardOverview';
import {
  DashboardContainer,
  DashboardHeaderWrapper,
  DashboardGreetingTitle,
  DashboardGreetingSubtitle,
  QuickGoToButton,
} from './DashboardPage.styles';

interface DashboardPageProps {
  onNavigateToGoals?: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigateToGoals }) => {
  return (
    <DashboardContainer>
      <DashboardHeaderWrapper>
        <div>
          <DashboardGreetingTitle>Visão geral</DashboardGreetingTitle>
          <DashboardGreetingSubtitle>
            Acompanhe métricas em tempo real e o ritmo de finalização das metas.
          </DashboardGreetingSubtitle>
        </div>
        {onNavigateToGoals && (
          <QuickGoToButton type="button" onClick={onNavigateToGoals}>
            <Target size={16} /> Acessar metas
          </QuickGoToButton>
        )}
      </DashboardHeaderWrapper>

      <DashboardOverview />
    </DashboardContainer>
  );
};
