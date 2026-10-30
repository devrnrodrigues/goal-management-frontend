import React, { useState } from 'react';
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

const SafeResponsibleAvatar: React.FC<{ src: string; name?: string }> = ({ src, name }) => {
  const [hasError, setHasError] = useState(false);

  if (!hasError) {
    return (
      <ResponsibleAvatar
        src={src}
        alt={name || 'Responsável'}
        title={name}
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <span
      title={name}
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
      {(name || 'U').slice(0, 2).toUpperCase()}
    </span>
  );
};

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
                    <SafeResponsibleAvatar
                      src={st.responsibleAvatar}
                      name={st.responsibleName}
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
