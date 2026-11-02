import React from 'react';
import { CardGrid } from '../MyGoals.styles';
import {
  MyGoalsSkeletonPulse,
  GoalCardSkeletonContainer,
  GoalCardHeaderSkeleton,
  GoalCardHeaderContentSkeleton,
  GoalCardBottomSkeleton,
  GoalCardDividerSkeleton,
  GoalCardFooterSkeleton,
  AvatarGroupSkeleton,
  AvatarSkeletonItem,
} from '../styles/MyGoalsSkeleton.styles';

const AVATAR_SKELETON_IDS = [
  'avatar-skel-1',
  'avatar-skel-2',
  'avatar-skel-3',
];

const SKELETON_CARD_ITEMS = Array.from({ length: 10 }, (_, index) => ({
  id: `goal-card-skel-${index + 1}`,
  titleWidth: index % 3 === 0 ? '82%' : index % 3 === 1 ? '68%' : '75%',
}));

export const MyGoalsSkeleton: React.FC = () => {
  return (
    <CardGrid>
      {SKELETON_CARD_ITEMS.map((card) => (
        <GoalCardSkeletonContainer key={card.id}>
          <GoalCardHeaderSkeleton>
            <GoalCardHeaderContentSkeleton>
              <MyGoalsSkeletonPulse $width="95px" $height="13px" />
              <MyGoalsSkeletonPulse $width={card.titleWidth} $height="24px" $radius="6px" />
            </GoalCardHeaderContentSkeleton>
            <MyGoalsSkeletonPulse $width="26px" $height="26px" $radius="9999px" />
          </GoalCardHeaderSkeleton>

          <GoalCardBottomSkeleton>
            <MyGoalsSkeletonPulse
              $width="100%"
              $height="16px"
              $radius="9999px"
              $margin="0 0 14px 0"
            />
            <GoalCardDividerSkeleton />
            <GoalCardFooterSkeleton>
              <MyGoalsSkeletonPulse $width="125px" $height="16px" />
              <AvatarGroupSkeleton>
                {AVATAR_SKELETON_IDS.map((avatarId) => (
                  <AvatarSkeletonItem
                    key={avatarId}
                    $width="32px"
                    $height="32px"
                    $radius="9999px"
                  />
                ))}
              </AvatarGroupSkeleton>
            </GoalCardFooterSkeleton>
          </GoalCardBottomSkeleton>
        </GoalCardSkeletonContainer>
      ))}
    </CardGrid>
  );
};
