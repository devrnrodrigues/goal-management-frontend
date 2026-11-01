import React from 'react';
import { useRecentActivity } from './useRecentActivity';
import {
  ActivityTimelineGroup,
  ActivityEmptyState,
} from './components';
import {
  ActivityPageContainer,
  ActivityFeedWrapper,
} from './RecentActivity.styles';

export const RecentActivity: React.FC = () => {
  const {
    filteredActivitiesCount,
    groupedActivities,
  } = useRecentActivity();

  return (
    <ActivityPageContainer>
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
