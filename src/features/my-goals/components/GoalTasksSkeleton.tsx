import React from 'react';
import {
  TasksSkeletonListWrapper,
  TaskItemSkeletonCard,
  TaskItemSkeletonMainRow,
  TaskItemSkeletonLeft,
  TaskItemSkeletonRight,
  TaskSkeletonPulse,
} from '../styles/GoalTasksSkeleton.styles';

const skeletonItemWidths = ['52%', '68%', '42%', '60%', '48%'];

export const GoalTasksSkeleton: React.FC = () => {
  return (
    <TasksSkeletonListWrapper>
      {skeletonItemWidths.map((width, index) => (
        <TaskItemSkeletonCard key={index}>
          <TaskItemSkeletonMainRow>
            <TaskItemSkeletonLeft>
              <TaskSkeletonPulse $width="20px" $height="20px" $radius="6px" />
              <TaskSkeletonPulse $width={width} $height="14px" $radius="4px" />
            </TaskItemSkeletonLeft>
            <TaskItemSkeletonRight>
              <TaskSkeletonPulse $width="24px" $height="24px" $radius="6px" />
            </TaskItemSkeletonRight>
          </TaskItemSkeletonMainRow>
        </TaskItemSkeletonCard>
      ))}
    </TasksSkeletonListWrapper>
  );
};

