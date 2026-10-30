import React, { useState } from 'react';
import { Clock, Target, ArrowRight } from 'lucide-react';
import type { ActivityItem as ActivityItemType } from '../types';
import {
  ItemCard,
  AuthorAvatarWrapper,
  AuthorAvatarImg,
  ItemBody,
  ItemSentence,
  TargetTaskText,
  MetaRow,
  GoalContextPill,
  DotSeparator,
  TimestampText,
  ChangesList,
  ChangeItem,
  ChangeLabel,
  ChangeFrom,
  ChangeTo,
  ChangeArrow,
} from '../styles/ActivityItem.styles';

interface ActivityItemProps {
  activity: ActivityItemType;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const [avatarError, setAvatarError] = useState(false);

  const renderActionSentence = () => {
    const authorName = <strong>{activity.author.name}</strong>;
    const taskTag = <TargetTaskText>{activity.title}</TargetTaskText>;

    switch (activity.actionType) {
      case 'task_moved':
        return (
          <ItemSentence>
            {authorName} moveu a tarefa {taskTag}
            {activity.metadata?.fromColumn && activity.metadata?.toColumn && (
              <>
                {' '}de <strong>{activity.metadata.fromColumn}</strong> para{' '}
                <strong>{activity.metadata.toColumn}</strong>
              </>
            )}
          </ItemSentence>
        );

      case 'task_created':
        return (
          <ItemSentence>
            {authorName} criou a tarefa {taskTag}
            {activity.metadata?.toColumn && (
              <> na coluna <strong>{activity.metadata.toColumn}</strong></>
            )}
          </ItemSentence>
        );

      case 'task_completed':
        return (
          <ItemSentence>
            {authorName} concluiu a tarefa {taskTag}
          </ItemSentence>
        );

      case 'task_updated':
        return (
          <ItemSentence>
            {authorName} editou a tarefa {taskTag}
          </ItemSentence>
        );

      case 'task_deleted':
        return (
          <ItemSentence>
            {authorName} removeu a tarefa {taskTag}
          </ItemSentence>
        );

      case 'goal_created':
        return (
          <ItemSentence>
            {authorName} criou a meta {taskTag}
          </ItemSentence>
        );

      case 'goal_updated':
        return (
          <ItemSentence>
            {authorName} atualizou a meta {taskTag}
          </ItemSentence>
        );

      case 'column_reordered':
        return (
          <ItemSentence>
            {authorName} reorganizou as colunas do quadro
          </ItemSentence>
        );

      default:
        return (
          <ItemSentence>
            {authorName} interagiu com {taskTag}
          </ItemSentence>
        );
    }
  };

  return (
    <ItemCard>
      <AuthorAvatarWrapper title={activity.author.name}>
        {activity.author.avatarUrl && !avatarError ? (
          <AuthorAvatarImg
            src={activity.author.avatarUrl}
            alt={activity.author.name}
            loading="lazy"
            onError={() => setAvatarError(true)}
          />
        ) : (
          activity.author.initials
        )}
      </AuthorAvatarWrapper>

      <ItemBody>
        {renderActionSentence()}

        <MetaRow>
          {activity.goalTitle && (
            <>
              <GoalContextPill>
                <Target size={11} />
                {activity.goalTitle}
              </GoalContextPill>
              <DotSeparator>•</DotSeparator>
            </>
          )}

          <TimestampText>
            <Clock size={12} />
            {activity.timestamp}
          </TimestampText>
        </MetaRow>

        {activity.changes && activity.changes.length > 0 && (
          <ChangesList>
            {activity.changes.map((change) => (
              <ChangeItem key={change.id}>
                <ChangeLabel>{change.label}:</ChangeLabel>
                {change.from && <ChangeFrom>{change.from}</ChangeFrom>}
                {change.from && (
                  <ChangeArrow>
                    <ArrowRight size={11} />
                  </ChangeArrow>
                )}
                <ChangeTo>{change.to}</ChangeTo>
              </ChangeItem>
            ))}
          </ChangesList>
        )}
      </ItemBody>
    </ItemCard>
  );
};
