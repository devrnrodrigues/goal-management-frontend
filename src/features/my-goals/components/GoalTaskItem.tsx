import React, { useState } from 'react';
import { Trash2, Pencil, ChevronDown, Clock } from 'lucide-react';
import type { SubTask } from '../types';
import {
  TaskItemCard,
  TaskItemMainRow,
  TaskItemLeft,
  CheckboxWrapper,
  CustomCheckbox,
  TaskTitleText,
  TaskItemActions,
  IconButton,
  ExpandIconWrapper,
  TaskDescriptionContainer,
  TaskDescriptionMainRow,
  TaskDescriptionText,
  TaskDescriptionRightGroup,
  TaskDescriptionMetaRow,
  TaskDescriptionActions,
  KanbanStatusBadge,
  DeadlineBadge,
  AvatarsGroup,
  MemberImg,
} from '../styles/GoalTaskItem.styles';

interface GoalTaskItemProps {
  subtask: SubTask;
  isSelected?: boolean;
  onSelect?: () => void;
  onToggle: () => void;
  onDelete: () => void;
  onEdit?: (subtask: SubTask) => void;
  onUpdate?: (updatedSubtask: SubTask) => void;
}

const SafeMemberImg: React.FC<{ m: { id: string; name: string; avatarUrl?: string } }> = ({ m }) => {
  const [hasError, setHasError] = useState(false);
  if (m.avatarUrl && !hasError) {
    return <MemberImg src={m.avatarUrl} alt={m.name} title={m.name} onError={() => setHasError(true)} />;
  }
  return (
    <span
      title={m.name}
      style={{
        width: 22,
        height: 22,
        borderRadius: '50%',
        backgroundColor: '#f1f5f9', border: '2px solid #ffffff', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)',
        color: '#334155',
        fontSize: 9,
        fontWeight: 700,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {m.name.slice(0, 2).toUpperCase()}
    </span>
  );
};

export const GoalTaskItem: React.FC<GoalTaskItemProps> = ({
  subtask,
  isSelected = false,
  onSelect,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [showInlineDesc, setShowInlineDesc] = useState(false);

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle();
  };

  const handleToggleDescClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowInlineDesc((prev) => !prev);
  };

  const handleCardClick = () => {
    if (onSelect) {
      onSelect();
    }
    setShowInlineDesc((prev) => !prev);
  };

  const kanbanStatus = subtask.completed
    ? 'Concluído'
    : (subtask.columnTitle || subtask.status || 'A Fazer');

  return (
    <TaskItemCard
      $isSelected={isSelected}
      $isCompleted={subtask.completed}
      onClick={handleCardClick}
    >
      <TaskItemMainRow>
        <TaskItemLeft>
          <CheckboxWrapper
            type="button"
            onClick={handleCheckboxClick}
            aria-label={subtask.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
          >
            <CustomCheckbox $checked={subtask.completed} />
          </CheckboxWrapper>
          <TaskTitleText $completed={subtask.completed} title={subtask.title}>
            {subtask.title}
          </TaskTitleText>
        </TaskItemLeft>

        <TaskItemActions>
          <IconButton
            type="button"
            title={showInlineDesc ? 'Recolher detalhes' : 'Ver detalhes'}
            onClick={handleToggleDescClick}
          >
            <ExpandIconWrapper $isOpen={showInlineDesc}>
              <ChevronDown size={16} />
            </ExpandIconWrapper>
          </IconButton>
        </TaskItemActions>
      </TaskItemMainRow>

      {showInlineDesc && (
        <TaskDescriptionContainer onClick={(e) => e.stopPropagation()}>
          <TaskDescriptionMainRow>
            <TaskDescriptionText>
              {subtask.description || 'Nenhuma descrição informada.'}
            </TaskDescriptionText>

            <TaskDescriptionRightGroup>
              <TaskDescriptionMetaRow>
                <KanbanStatusBadge $status={kanbanStatus}>
                  {kanbanStatus}
                </KanbanStatusBadge>

                {subtask.deadline && (
                  <DeadlineBadge>
                    <Clock size={12} />
                    <span>{subtask.deadline}</span>
                  </DeadlineBadge>
                )}

                {subtask.members && subtask.members.length > 0 && (
                  <AvatarsGroup>
                    {subtask.members.map((m) => (
                      <SafeMemberImg key={m.id} m={m} />
                    ))}
                  </AvatarsGroup>
                )}
              </TaskDescriptionMetaRow>

              <TaskDescriptionActions>
                <IconButton
                  type="button"
                  title="Editar tarefa"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(subtask);
                  }}
                >
                  <Pencil size={15} />
                </IconButton>

                <IconButton
                  type="button"
                  $isDanger
                  title="Excluir tarefa"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                >
                  <Trash2 size={15} />
                </IconButton>
              </TaskDescriptionActions>
            </TaskDescriptionRightGroup>
          </TaskDescriptionMainRow>
        </TaskDescriptionContainer>
      )}
    </TaskItemCard>
  );
};
