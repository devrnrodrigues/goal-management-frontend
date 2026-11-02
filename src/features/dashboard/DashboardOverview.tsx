import React from 'react';
import { AnimatePresence } from 'framer-motion';
import type { DashboardOverviewProps } from './DashboardOverview.types';
import { useDashboardData } from './hooks/useDashboardData';
import { GoalHeroCard } from './components/GoalHeroCard';
import { MetricsGrid } from './components/MetricsGrid';
import { GoalAnalyticsChart } from './components/GoalAnalyticsChart';
import { DeadlinesCalendar } from './components/DeadlinesCalendar';
import { DashboardSkeleton } from './components/DashboardSkeleton';
import {
  OverviewWrapper,
  TopSectionGrid,
  BottomSectionGrid,
} from './DashboardOverview.styles';

const fadeTransitionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const DashboardOverview: React.FC<DashboardOverviewProps> = () => {
  const {
    metrics,
    currentFocusGoal,
    focusGoalsTotal,
    currentGoalIndex,
    monthlyData,
    upcomingDeadlines,
    selectedCalendarDay,
    isLoading,
    handlePrevGoal,
    handleNextGoal,
    handleSelectDay,
  } = useDashboardData();

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <OverviewWrapper
          key="dashboard-skeleton-view"
          variants={fadeTransitionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.16, ease: 'easeOut' }}
        >
          <DashboardSkeleton />
        </OverviewWrapper>
      ) : (
        <OverviewWrapper
          key="dashboard-loaded-view"
          variants={fadeTransitionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <TopSectionGrid>
            <GoalHeroCard
              goal={currentFocusGoal}
              currentIndex={currentGoalIndex}
              totalGoals={focusGoalsTotal}
              onPrev={handlePrevGoal}
              onNext={handleNextGoal}
            />
            <MetricsGrid metrics={metrics} />
          </TopSectionGrid>

          <BottomSectionGrid>
            <GoalAnalyticsChart data={monthlyData} />
            <DeadlinesCalendar
              selectedDay={selectedCalendarDay}
              onSelectDay={handleSelectDay}
              deadlines={upcomingDeadlines}
            />
          </BottomSectionGrid>
        </OverviewWrapper>
      )}
    </AnimatePresence>
  );
};
