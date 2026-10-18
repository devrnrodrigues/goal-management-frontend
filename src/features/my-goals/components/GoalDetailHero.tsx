import React from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import type { Task } from '../types';
import {
  HeroContainer,
  HeroTopRow,
  GoalTitle,
  BackButton,
  HeroMainGrid,
  HeroLeftContent,
  GoalDescription,
  MetaFooterRow,
  MetaBadge,
  AvatarGroup,
  MemberAvatarImage,
  AvatarFallback,
  ProgressCard,
  ProgressTopRow,
  ProgressLabel,
  ProgressPercentage,
  ProgressTrack,
  ProgressFillBar,
  ProgressStatsRow,
  StatHighlight,
} from '../styles/GoalDetailHero.styles';

interface GoalDetailHeroProps {
  task: Task;
  onClose: () => void;
  completedCount: number;
  totalCount: number;
  progressPercent: number;
}

export const GoalDetailHero: React.FC<GoalDetailHeroProps> = ({
  task,
  onClose,
  completedCount,
  totalCount,
  progressPercent,
}) => {
  return (
    <HeroContainer>
      <HeroTopRow>
        <GoalTitle>{task.title}</GoalTitle>
        <BackButton type="button" onClick={onClose}>
          <ArrowLeft size={16} /> Voltar
        </BackButton>
      </HeroTopRow>

      <HeroMainGrid>
        <HeroLeftContent>
          <GoalDescription>{task.description}</GoalDescription>

          <MetaFooterRow>
            <MetaBadge>
              <Calendar size={14} />
              <span>Prazo: {task.deadline || 'Não definido'}</span>
            </MetaBadge>

            {task.members && task.members.length > 0 && (
              <AvatarGroup>
                {task.members.map((member) =>
                  member.avatarUrl ? (
                    <MemberAvatarImage
                      key={member.id}
                      src={member.avatarUrl}
                      alt={member.name}
                      title={member.name}
                    />
                  ) : (
                    <AvatarFallback key={member.id} title={member.name}>
                      {member.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  )
                )}
              </AvatarGroup>
            )}
          </MetaFooterRow>
        </HeroLeftContent>

        <ProgressCard>
          <ProgressTopRow>
            <ProgressLabel>Progresso Geral</ProgressLabel>
            <ProgressPercentage>{progressPercent}%</ProgressPercentage>
          </ProgressTopRow>

          <ProgressTrack>
            <ProgressFillBar $percent={progressPercent} />
          </ProgressTrack>

          <ProgressStatsRow>
            <span>
              <StatHighlight>{completedCount}</StatHighlight> de{' '}
              <StatHighlight>{totalCount}</StatHighlight> concluídas
            </span>
            <span>{totalCount - completedCount} pendentes</span>
          </ProgressStatsRow>
        </ProgressCard>
      </HeroMainGrid>
    </HeroContainer>
  );
};
