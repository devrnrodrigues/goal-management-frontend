import React from 'react';
import { useRecentActivity } from './useRecentActivity';
import {
  ActivityFilters,
  ActivityTimelineGroup,
  ActivityEmptyState,
} from './components';
import {
  ActivityPageContainer,
  ActivityHeaderWrapper,
  HeaderTitlesCol,
  ActivityTitle,
  ActivitySubtitle,
  ActivityFeedWrapper,
} from './RecentActivity.styles';

export const RecentActivity: React.FC = () => {
  const {
    filters,
    categoryCounts,
    goalOptions,
    hasActiveFilters,
    filteredActivitiesCount,
    groupedActivities,
    handleSearchChange,
    handleCategoryChange,
    handleGoalChange,
    handleResetFilters,
  } = useRecentActivity();

  return (
    <ActivityPageContainer>
      <ActivityHeaderWrapper>
        <HeaderTitlesCol>
          <ActivityTitle>Atividades recentes</ActivityTitle>
          <ActivitySubtitle>
            Histórico de alterações, movimentações e atualizações da equipe.
          </ActivitySubtitle>
        </HeaderTitlesCol>
      </ActivityHeaderWrapper>

      <ActivityFilters
        filters={filters}
        categoryCounts={categoryCounts}
        goalOptions={goalOptions}
        hasActiveFilters={hasActiveFilters}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onGoalChange={handleGoalChange}
        onResetFilters={handleResetFilters}
      />

      <ActivityFeedWrapper>
        {filteredActivitiesCount === 0 ? (
          <ActivityEmptyState
            hasFilters={hasActiveFilters}
            onResetFilters={handleResetFilters}
          />
        ) : (
          groupedActivities.map((group) => (
            <ActivityTimelineGroup
              key={group.label}
              label={group.label}
              activities={group.items}
            />
          ))
        )}
      </ActivityFeedWrapper>
    </ActivityPageContainer>
  );
};
