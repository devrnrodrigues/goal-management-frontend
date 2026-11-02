import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Award } from 'lucide-react';
import { useCompletedGoals } from './useCompletedGoals';
import {
  CompletedGoalCard,
  CompletedGoalDetailModal,
  CompletedGoalsSkeleton,
} from './components';
import {
  CompletedGoalsContainer,
  CardsList,
  EmptyState,
  EmptyTitle,
  EmptySubtitle,
} from './CompletedGoalsPage.styles';
import { MotionCompletedGoalsLayout } from './styles/CompletedGoalsSkeleton.styles';

const fadeTransitionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const CompletedGoalsPage: React.FC = () => {
  const {
    isLoading,
    goals,
    selectedGoal,
    handleOpenDetail,
    handleCloseDetail,
  } = useCompletedGoals();

  return (
    <CompletedGoalsContainer>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <MotionCompletedGoalsLayout
            key="completed-skeleton-view"
            variants={fadeTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.16, ease: 'easeOut' }}
          >
            <CompletedGoalsSkeleton />
          </MotionCompletedGoalsLayout>
        ) : (
          <MotionCompletedGoalsLayout
            key="completed-loaded-view"
            variants={fadeTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
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
          </MotionCompletedGoalsLayout>
        )}
      </AnimatePresence>

      <CompletedGoalDetailModal
        goal={selectedGoal}
        onClose={handleCloseDetail}
      />
    </CompletedGoalsContainer>
  );
};
