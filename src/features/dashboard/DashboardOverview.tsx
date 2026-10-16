import React from 'react';
import type { DashboardOverviewProps } from './DashboardOverview.types';
import { useDashboardData } from './hooks/useDashboardData';
import { GoalHeroCard } from './components/GoalHeroCard';
import { MetricsGrid } from './components/MetricsGrid';
import { GoalAnalyticsChart } from './components/GoalAnalyticsChart';
import { DeadlinesCalendar } from './components/DeadlinesCalendar';
import {
  OverviewWrapper,
  TopSectionGrid,
  BottomSectionGrid,
} from './DashboardOverview.styles';

export const DashboardOverview: React.FC<DashboardOverviewProps> = () => {
  const {
    metrics,
    currentFocusGoal,
    focusGoalsTotal,
    currentGoalIndex,
    monthlyData,
    upcomingDeadlines,
    selectedCalendarDay,
    handlePrevGoal,
    handleNextGoal,
    handleSelectDay,
  } = useDashboardData();

  return (
    <OverviewWrapper>
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
  );
};
