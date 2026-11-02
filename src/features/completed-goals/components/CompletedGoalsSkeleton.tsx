import React from 'react';
import { CardsList } from '../CompletedGoalsPage.styles';
import {
  CompletedGoalsSkeletonPulse,
  CompletedCardSkeleton,
  CardTopRowSkeleton,
  TitleCategoryGroupSkeleton,
  HighlightBoxSkeleton,
  CardFooterRowSkeleton,
  FooterAvatarsGroupSkeleton,
  AvatarItemSkeleton,
} from '../styles/CompletedGoalsSkeleton.styles';

const COMPLETED_CARD_IDS = [
  { id: 'cg-skel-1', titleWidth: '240px', descWidth: '94%' },
  { id: 'cg-skel-2', titleWidth: '200px', descWidth: '88%' },
  { id: 'cg-skel-3', titleWidth: '260px', descWidth: '91%' },
  { id: 'cg-skel-4', titleWidth: '215px', descWidth: '85%' },
];

const AVATAR_IDS = ['cg-av-1', 'cg-av-2', 'cg-av-3'];

export const CompletedGoalsSkeleton: React.FC = () => {
  return (
    <CardsList>
      {COMPLETED_CARD_IDS.map((card) => (
        <CompletedCardSkeleton key={card.id}>
          <CardTopRowSkeleton>
            <TitleCategoryGroupSkeleton>
              <CompletedGoalsSkeletonPulse $width="120px" $height="13px" />
              <CompletedGoalsSkeletonPulse
                $width={card.titleWidth}
                $height="28px"
                $radius="8px"
              />
            </TitleCategoryGroupSkeleton>
            <CompletedGoalsSkeletonPulse $width="95px" $height="28px" $radius="6px" />
          </CardTopRowSkeleton>

          <div>
            <CompletedGoalsSkeletonPulse $width={card.descWidth} $height="15px" $margin="0 0 6px" />
            <CompletedGoalsSkeletonPulse $width="65%" $height="15px" />
          </div>

          <HighlightBoxSkeleton>
            <CompletedGoalsSkeletonPulse $width="16px" $height="16px" $radius="4px" />
            <CompletedGoalsSkeletonPulse $width="75%" $height="14px" />
          </HighlightBoxSkeleton>

          <CardFooterRowSkeleton>
            <CompletedGoalsSkeletonPulse $width="170px" $height="15px" />
            <FooterAvatarsGroupSkeleton>
              {AVATAR_IDS.map((avatarId) => (
                <AvatarItemSkeleton
                  key={avatarId}
                  $width="28px"
                  $height="28px"
                  $radius="9999px"
                />
              ))}
            </FooterAvatarsGroupSkeleton>
          </CardFooterRowSkeleton>
        </CompletedCardSkeleton>
      ))}
    </CardsList>
  );
};

