import React, { useState } from 'react';
import { Trash2, ChevronRight, FileText } from 'lucide-react';
import type { SubTask } from '../types';
import {
  TaskItemCard,
  TaskItemMainRow,
  TaskItemLeft,
  CheckboxWrapper,
  HiddenCheckbox,
  CustomCheckbox,
  TaskTitleText,
  TaskItemActions,
  IconButton,
  TaskDescriptionPreview,
} from '../styles/GoalTaskItem.styles';

interface GoalTaskItemProps {
  subtask: SubTask;
  isSelected: boolean;
  onSelect: () => void;
  onToggle: () => void;
  onDelete: () => void;
}

export const GoalTaskItem: React.FC<GoalTaskItemProps> = ({
  subtask,
  isSelected,
  onSelect,
  onToggle,
  onDelete,
}) => {
  const [showInlineDesc, setShowInlineDesc] = useState(false);

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  const handleToggleDescClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowInlineDesc((prev) => !prev);
  };

  return (
    <TaskItemCard
      $isSelected={isSelected}
      $isCompleted={subtask.completed}
      onClick={onSelect}
    >
      <TaskItemMainRow>
        <TaskItemLeft>
          <CheckboxWrapper onClick={handleCheckboxClick}>
            <HiddenCheckbox
              checked={subtask.completed}
              onChange={() => {}}
            />
            <CustomCheckbox $checked={subtask.completed} />
          </CheckboxWrapper>
          <TaskTitleText $completed={subtask.completed} title={subtask.title}>
            {subtask.title}
          </TaskTitleText>
        </TaskItemLeft>

        <TaskItemActions>
          {subtask.description && (
            <IconButton
              type="button"
              title="Alternar descrição rápida"
              onClick={handleToggleDescClick}
            >
              <FileText size={15} />
            </IconButton>
          )}
          <IconButton
            type="button"
            $isDanger
            title="Excluir tarefa"
            onClick={handleDeleteClick}
          >
            <Trash2 size={15} />
          </IconButton>
          <IconButton type="button" title="Ver detalhes no painel lateral">
            <ChevronRight size={16} />
          </IconButton>
        </TaskItemActions>
      </TaskItemMainRow>

      {showInlineDesc && subtask.description && (
        <TaskDescriptionPreview>{subtask.description}</TaskDescriptionPreview>
      )}
    </TaskItemCard>
  );
};
