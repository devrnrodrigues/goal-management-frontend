import React, { useRef } from 'react';
import { Plus } from 'lucide-react';
import {
  QuickAddWrapper,
  QuickAddHeader,
  QuickAddIcon,
  QuickAddInput,
  QuickAddExpandedSection,
  QuickAddTextArea,
  QuickAddActions,
  QuickAddSubmitButton,
  QuickAddCancelButton,
} from '../styles/GoalTaskQuickAdd.styles';

interface GoalTaskQuickAddProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  title: string;
  onChangeTitle: (val: string) => void;
  description: string;
  onChangeDescription: (val: string) => void;
  onSubmit: () => void;
}

export const GoalTaskQuickAdd: React.FC<GoalTaskQuickAddProps> = ({
  isOpen,
  onOpen,
  onClose,
  title,
  onChangeTitle,
  description,
  onChangeDescription,
  onSubmit,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleFocus = () => {
    if (!isOpen) {
      onOpen();
    }
  };

  return (
    <QuickAddWrapper $isExpanded={isOpen}>
      <QuickAddHeader>
        <QuickAddIcon>
          <Plus size={18} />
        </QuickAddIcon>
        <QuickAddInput
          ref={inputRef}
          type="text"
          value={title}
          placeholder="Nova tarefa"
          onChange={(e) => onChangeTitle(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
        />
      </QuickAddHeader>

      {isOpen && (
        <QuickAddExpandedSection>
          <QuickAddTextArea
            rows={2}
            value={description}
            placeholder="Descrição (opcional)"
            onChange={(e) => onChangeDescription(e.target.value)}
          />
          <QuickAddActions>
            <QuickAddCancelButton type="button" onClick={onClose}>
              Cancelar
            </QuickAddCancelButton>
            <QuickAddSubmitButton
              type="button"
              disabled={!title.trim()}
              onClick={onSubmit}
            >
              Adicionar
            </QuickAddSubmitButton>
          </QuickAddActions>
        </QuickAddExpandedSection>
      )}
    </QuickAddWrapper>
  );
};
