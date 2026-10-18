import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
} from '../styles/GoalHeroCard.styles';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 36 : -36,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -36 : 36,
    opacity: 0,
  }),
};

export const GoalHeroCard: React.FC<GoalHeroCardProps> = ({
  goal,
  onPrev,
  onNext,
}) => {
  const [direction, setDirection] = useState<number>(1);

  const handlePrev = () => {
    setDirection(-1);
    onPrev();
  };

  const handleNext = () => {
    setDirection(1);
    onNext();
  };

  return (
    <HeroCardContainer>
      <HeroHeader>
        <HeroBadge>Meta prioritária</HeroBadge>
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={`category-${goal.id}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <HeroSubtitle>{goal.category}</HeroSubtitle>
          </motion.div>
        </AnimatePresence>
      </HeroHeader>

      <CarouselSection>
        <CarouselNavButton
          type="button"
          onClick={handlePrev}
          aria-label="Meta anterior"
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </CarouselNavButton>

        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={`avatar-${goal.id}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            <GoalAvatarWrapper>
              <Award size={42} />
            </GoalAvatarWrapper>
          </motion.div>
        </AnimatePresence>

        <CarouselNavButton
          type="button"
          onClick={handleNext}
          aria-label="Próxima meta"
        >
          <ChevronRight size={20} strokeWidth={2} />
        </CarouselNavButton>
      </CarouselSection>

      <AnimatePresence initial={false} mode="wait" custom={direction}>
        <motion.div
          key={`info-${goal.id}`}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          <GoalInfoSection>
            <GoalTitle title={goal.title}>{goal.title}</GoalTitle>
            <GoalMetaText>Prazo: {goal.deadline}</GoalMetaText>
          </GoalInfoSection>

          <ProgressWrapper>
            <ProgressHeader>
              <span>Progresso</span>
              <span>{goal.progress}%</span>
            </ProgressHeader>
            <ProgressBarTrack>
              <ProgressBarFill $progress={goal.progress} />
            </ProgressBarTrack>
          </ProgressWrapper>
        </motion.div>
      </AnimatePresence>
    </HeroCardContainer>
  );
};
