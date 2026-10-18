import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Trash2, Pencil, Check, ChevronDown } from 'lucide-react';
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
  ExpandIconWrapper,
  TaskDescriptionContainer,
  TaskDescriptionMainRow,
  TaskDescriptionText,
  TaskDescriptionActions,
  InlineEditContainer,
  InlineEditTitleInput,
  InlineEditTextArea,
  InlineEditActions,
  InlineSaveButton,
  InlineCancelButton,
  DeletePromptWrapper,
  DeletePromptText,
  DeletePromptActions,
  CancelDeleteBtn,
  ConfirmDeleteBtn,
} from '../styles/GoalTaskItem.styles';

interface GoalTaskItemProps {
  subtask: SubTask;
  isSelected?: boolean;
  onSelect?: () => void;
  onToggle: () => void;
  onDelete: () => void;
  onUpdate?: (updatedSubtask: SubTask) => void;
}

export const GoalTaskItem: React.FC<GoalTaskItemProps> = ({
  subtask,
  isSelected = false,
  onSelect,
  onToggle,
  onDelete,
  onUpdate,
}) => {
  const [showInlineDesc, setShowInlineDesc] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [editTitle, setEditTitle] = useState(subtask.title);
  const [editDescription, setEditDescription] = useState(subtask.description || '');

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
    if (!isEditing && !isConfirmingDelete) {
      setShowInlineDesc((prev) => !prev);
    }
  };

  const handleStartEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConfirmingDelete(false);
    setEditTitle(subtask.title);
    setEditDescription(subtask.description || '');
    setIsEditing(true);
    setShowInlineDesc(true);
  };

  const handleCancelEdit = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setIsEditing(false);
    setEditTitle(subtask.title);
    setEditDescription(subtask.description || '');
  };

  const handleSaveEdit = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    const trimmedTitle = editTitle.trim();
    if (!trimmedTitle) return;

    onUpdate?.({
      ...subtask,
      title: trimmedTitle,
      description: editDescription.trim() || undefined,
    });
    setIsEditing(false);
  };

  return (
    <TaskItemCard
      $isSelected={isSelected}
      $isCompleted={subtask.completed}
      onClick={handleCardClick}
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
          {isEditing ? (
            <InlineEditTitleInput
              type="text"
              value={editTitle}
              placeholder="Título da tarefa"
              autoFocus
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveEdit(e);
                if (e.key === 'Escape') handleCancelEdit(e);
              }}
            />
          ) : (
            <TaskTitleText $completed={subtask.completed} title={subtask.title}>
              {subtask.title}
            </TaskTitleText>
          )}
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

      {showInlineDesc && !isEditing && (
        <TaskDescriptionContainer onClick={(e) => e.stopPropagation()}>
          <TaskDescriptionMainRow>
            <TaskDescriptionText>
              {subtask.description || 'Nenhuma descrição informada.'}
            </TaskDescriptionText>
            <TaskDescriptionActions>
              <IconButton
                type="button"
                title="Editar tarefa"
                onClick={handleStartEdit}
              >
                <Pencil size={15} />
              </IconButton>
              <IconButton
                type="button"
                $isDanger
                title="Excluir tarefa"
                onClick={() => setIsConfirmingDelete((prev) => !prev)}
              >
                <Trash2 size={15} />
              </IconButton>
            </TaskDescriptionActions>
          </TaskDescriptionMainRow>

          <AnimatePresence>
            {isConfirmingDelete && (
              <DeletePromptWrapper
                key="delete-prompt"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.16, ease: 'easeOut' }}
              >
                <DeletePromptText>
                  Tem certeza? Essa ação não poderá ser desfeita.
                </DeletePromptText>
                <DeletePromptActions>
                  <CancelDeleteBtn
                    type="button"
                    onClick={() => setIsConfirmingDelete(false)}
                  >
                    Cancelar
                  </CancelDeleteBtn>
                  <ConfirmDeleteBtn
                    type="button"
                    onClick={() => {
                      onDelete();
                      setIsConfirmingDelete(false);
                    }}
                  >
                    Confirmar
                  </ConfirmDeleteBtn>
                </DeletePromptActions>
              </DeletePromptWrapper>
            )}
          </AnimatePresence>
        </TaskDescriptionContainer>
      )}

      {showInlineDesc && isEditing && (
        <InlineEditContainer onClick={(e) => e.stopPropagation()}>
          <InlineEditTextArea
            rows={2}
            value={editDescription}
            placeholder="Descrição da tarefa"
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <InlineEditActions>
            <InlineCancelButton type="button" onClick={handleCancelEdit}>
              Cancelar
            </InlineCancelButton>
            <InlineSaveButton
              type="button"
              disabled={!editTitle.trim()}
              onClick={handleSaveEdit}
            >
              <Check size={14} /> Salvar
            </InlineSaveButton>
          </InlineEditActions>
        </InlineEditContainer>
      )}
    </TaskItemCard>
  );
};
