import React from 'react';
import { Award } from 'lucide-react';
import { useCompletedGoals } from './useCompletedGoals';
import {
  CompletedGoalCard,
  CompletedGoalDetailModal,
} from './components';
import {
  CompletedGoalsContainer,
  CardsList,
  EmptyState,
  EmptyTitle,
  EmptySubtitle,
  ErrorMessageBanner,
} from './CompletedGoalsPage.styles';

export const CompletedGoalsPage: React.FC = () => {
  const {
    goals,
    selectedGoal,
    errorMessage,
    handleOpenDetail,
    handleCloseDetail,
  } = useCompletedGoals();

  return (
    <CompletedGoalsContainer>
      {errorMessage && <ErrorMessageBanner>{errorMessage}</ErrorMessageBanner>}

      {goals.length === 0 ? (
        <EmptyState>
          <Award size={32} />
          <EmptyTitle>Nenhuma meta concluída encontrada</EmptyTitle>
          <EmptySubtitle>
            Você ainda não possui metas finalizadas.
          </EmptySubtitle>
        </EmptyState>
      ) : (
        <CardsList>
          {goals.map((goal) => (
            <CompletedGoalCard
              key={goal.id}
              goal={goal}
              onViewDetails={handleOpenDetail}
            />
          ))}
        </CardsList>
      )}

      <CompletedGoalDetailModal
        goal={selectedGoal}
        onClose={handleCloseDetail}
      />
    </CompletedGoalsContainer>
  );
};
