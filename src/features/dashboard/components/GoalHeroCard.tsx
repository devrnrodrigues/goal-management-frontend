import React from 'react';
import { ChevronLeft, ChevronRight, Award } from 'lucide-react';
import type { GoalHeroCardProps } from './GoalHeroCard.types';
import {
  HeroCardContainer,
  HeroHeader,
  HeroBadge,
  HeroSubtitle,
  CarouselSection,
  CarouselNavButton,
  GoalAvatarWrapper,
  GoalInfoSection,
  GoalTitle,
  GoalMetaText,
  ProgressWrapper,
  ProgressHeader,
  ProgressBarTrack,
  ProgressBarFill,
  StepNotice,
} from '../styles/GoalHeroCard.styles';

export const GoalHeroCard: React.FC<GoalHeroCardProps> = ({
  goal,
  currentIndex,
  totalGoals,
  onPrev,
  onNext,
}) => {
  return (
    <HeroCardContainer>
      <HeroHeader>
        <HeroBadge>Meta prioritária</HeroBadge>
        <HeroSubtitle>Foco principal • {goal.category}</HeroSubtitle>
      </HeroHeader>

      <CarouselSection>
        <CarouselNavButton
          type="button"
          onClick={onPrev}
          aria-label="Meta anterior"
        >
          <ChevronLeft size={18} />
        </CarouselNavButton>

        <GoalAvatarWrapper>
          <Award size={36} />
        </GoalAvatarWrapper>

        <CarouselNavButton
          type="button"
          onClick={onNext}
          aria-label="Próxima meta"
        >
          <ChevronRight size={18} />
        </CarouselNavButton>
      </CarouselSection>

      <GoalInfoSection>
        <GoalTitle title={goal.title}>{goal.title}</GoalTitle>
        <GoalMetaText>
          Prazo: {goal.deadline} • ({currentIndex + 1} de {totalGoals})
        </GoalMetaText>
      </GoalInfoSection>

      <ProgressWrapper>
        <ProgressHeader>
          <span>Progresso</span>
          <span>{goal.progress}%</span>
        </ProgressHeader>
        <ProgressBarTrack>
          <ProgressBarFill $progress={goal.progress} />
        </ProgressBarTrack>
        <StepNotice title={goal.currentStep}>
          Próximo passo: {goal.currentStep}
        </StepNotice>
      </ProgressWrapper>
    </HeroCardContainer>
  );
};
