import React from 'react';
import type { ActivityItem as ActivityItemType, DateGroupLabel } from '../types';
import { ActivityItem } from './ActivityItem';
import {
  GroupContainer,
  GroupHeader,
  GroupTitle,
  GroupCountBadge,
  GroupDivider,
  GroupItemsList,
} from '../styles/ActivityTimelineGroup.styles';

interface ActivityTimelineGroupProps {
  label: DateGroupLabel;
  activities: ActivityItemType[];
}

export const ActivityTimelineGroup: React.FC<ActivityTimelineGroupProps> = ({
  label,
  activities,
}) => {
  if (activities.length === 0) {
    return null;
  }

  return (
    <GroupContainer>
      <GroupHeader>
        <GroupTitle>{label}</GroupTitle>
        <GroupCountBadge>{activities.length}</GroupCountBadge>
        <GroupDivider />
      </GroupHeader>

      <GroupItemsList>
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </GroupItemsList>
    </GroupContainer>
  );
};
