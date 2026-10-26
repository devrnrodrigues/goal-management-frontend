import React from 'react';
import { useRecentActivity } from './useRecentActivity';
import {
  ActivityTimelineGroup,
  ActivityEmptyState,
} from './components';
import {
  ActivityPageContainer,
  ActivityFeedWrapper,
  ErrorMessageBanner,
} from './RecentActivity.styles';

export const RecentActivity: React.FC = () => {
  const {
    errorMessage,
    filteredActivitiesCount,
    groupedActivities,
  } = useRecentActivity();

  return (
    <ActivityPageContainer>
      {errorMessage && <ErrorMessageBanner>{errorMessage}</ErrorMessageBanner>}

      <ActivityFeedWrapper>
        {filteredActivitiesCount === 0 ? (
          <ActivityEmptyState />
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
