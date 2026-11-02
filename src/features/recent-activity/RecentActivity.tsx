import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useRecentActivity } from './useRecentActivity';
import {
  ActivityTimelineGroup,
  ActivityEmptyState,
  RecentActivitySkeleton,
} from './components';
import {
  ActivityPageContainer,
  ActivityFeedWrapper,
} from './RecentActivity.styles';
import { MotionActivityContentWrapper } from './styles/RecentActivitySkeleton.styles';

const fadeTransitionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const RecentActivity: React.FC = () => {
  const {
    isLoading,
    filteredActivitiesCount,
    groupedActivities,
  } = useRecentActivity();

  return (
    <ActivityPageContainer>
      <ActivityFeedWrapper>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <MotionActivityContentWrapper
              key="activity-skeleton-view"
              variants={fadeTransitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.16, ease: 'easeOut' }}
            >
              <RecentActivitySkeleton />
            </MotionActivityContentWrapper>
          ) : (
            <MotionActivityContentWrapper
              key="activity-loaded-view"
              variants={fadeTransitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
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
            </MotionActivityContentWrapper>
          )}
        </AnimatePresence>
      </ActivityFeedWrapper>
    </ActivityPageContainer>
  );
};
