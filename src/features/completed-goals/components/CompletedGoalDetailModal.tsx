import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import type { CompletedGoalItem } from '../types';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitleGroup,
  ModalTitle,
  ModalSubtitle,
  CloseButton,
  ModalBody,
  SectionTitle,
  SubtasksList,
  SubtaskItem,
  SubtaskLeft,
  SubtaskTitle,
  SubtaskMeta,
  CompletionDate,
  ResponsibleAvatar,
  ModalFooter,
  PrimaryActionButton,
} from '../styles/CompletedGoalDetailModal.styles';

interface CompletedGoalDetailModalProps {
  goal: CompletedGoalItem | null;
  onClose: () => void;
}

export const CompletedGoalDetailModal: React.FC<CompletedGoalDetailModalProps> = ({
  goal,
  onClose,
}) => {
  if (!goal) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitleGroup>
            <ModalTitle>{goal.title}</ModalTitle>
            <ModalSubtitle>
              {goal.category} • Concluída em {goal.completedDate}
            </ModalSubtitle>
          </ModalTitleGroup>
          <CloseButton type="button" onClick={onClose}>
            <X size={18} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <SectionTitle>
            Subtarefas e entregas finalizadas ({goal.subtasks.length})
          </SectionTitle>

          <SubtasksList>
            {goal.subtasks.map((st) => (
              <SubtaskItem key={st.id}>
                <SubtaskLeft>
                  <CheckCircle2 size={16} />
                  <SubtaskTitle>{st.title}</SubtaskTitle>
                </SubtaskLeft>

                <SubtaskMeta>
                  <CompletionDate>Entregue em {st.completedAt}</CompletionDate>
                  {st.responsibleAvatar && (
                    <ResponsibleAvatar
                      src={st.responsibleAvatar}
                      alt={st.responsibleName || 'Responsável'}
                      title={st.responsibleName}
                    />
                  )}
                </SubtaskMeta>
              </SubtaskItem>
            ))}
          </SubtasksList>
        </ModalBody>

        <ModalFooter>
          <PrimaryActionButton type="button" onClick={onClose}>
            Fechar
          </PrimaryActionButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};
