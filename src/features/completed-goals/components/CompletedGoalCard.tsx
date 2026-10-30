import React, { useState } from 'react';
import { Target, CheckCircle2, Award, ChevronRight } from 'lucide-react';
import type { CompletedGoalItem } from '../types';
import {
  Card,
  CardTopRow,
  TitleCategoryGroup,
  CategoryTag,
  GoalNamePill,
  StatusBadge,
  DescriptionText,
  HighlightBox,
  CardMetaGrid,
  MetaItem,
  MetaLabel,
  MetaValue,
  CardFooterRow,
  MembersAvatarsRow,
  AvatarImg,
  AvatarFallback,
  ViewDetailsButton,
} from '../styles/CompletedGoalCard.styles';

interface CompletedGoalCardProps {
  goal: CompletedGoalItem;
  onViewDetails: (goal: CompletedGoalItem) => void;
}

const SafeCompletedMemberAvatar: React.FC<{
  member: { id: string; name: string; avatarUrl?: string };
}> = ({ member }) => {
  const [hasError, setHasError] = useState(false);

  if (member.avatarUrl && !hasError) {
    return (
      <AvatarImg
        src={member.avatarUrl}
        alt={member.name}
        title={member.name}
        loading="lazy"
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <AvatarFallback title={member.name}>
      {member.name.slice(0, 2).toUpperCase()}
    </AvatarFallback>
  );
};

export const CompletedGoalCard: React.FC<CompletedGoalCardProps> = ({
  goal,
  onViewDetails,
}) => {
  return (
    <Card>
      <CardTopRow>
        <TitleCategoryGroup>
          <CategoryTag>{goal.category}</CategoryTag>
          <GoalNamePill>
            <Target size={14} />
            <span>{goal.title}</span>
          </GoalNamePill>
        </TitleCategoryGroup>

        <StatusBadge>
          <CheckCircle2 size={14} />
          <span>Concluída com sucesso</span>
        </StatusBadge>
      </CardTopRow>

      <DescriptionText>{goal.description}</DescriptionText>

      <HighlightBox>
        <Award size={16} />
        <span>{goal.impactHighlight}</span>
      </HighlightBox>

      <CardMetaGrid>
        <MetaItem>
          <MetaLabel>Início</MetaLabel>
          <MetaValue>{goal.initialDate}</MetaValue>
        </MetaItem>

        <MetaItem>
          <MetaLabel>Data de conclusão</MetaLabel>
          <MetaValue>{goal.completedDate}</MetaValue>
        </MetaItem>

        <MetaItem>
          <MetaLabel>Tempo total</MetaLabel>
          <MetaValue>{goal.durationDays} dias</MetaValue>
        </MetaItem>

        <MetaItem>
          <MetaLabel>Tarefas entregues</MetaLabel>
          <MetaValue>
            {goal.completedSubtasks}/{goal.totalSubtasks} finalizadas
          </MetaValue>
        </MetaItem>
      </CardMetaGrid>

      <CardFooterRow>
        <MembersAvatarsRow>
          {goal.members.map((member) => (
            <SafeCompletedMemberAvatar key={member.id} member={member} />
          ))}
        </MembersAvatarsRow>

        <ViewDetailsButton type="button" onClick={() => onViewDetails(goal)}>
          <span>Ver entregas detalhadas</span>
          <ChevronRight size={14} />
        </ViewDetailsButton>
      </CardFooterRow>
    </Card>
  );
};
