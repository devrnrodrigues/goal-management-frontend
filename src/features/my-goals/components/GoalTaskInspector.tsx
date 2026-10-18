import React from 'react';
import { Check, X, Trash2, CheckCircle2, RotateCcw, Target } from 'lucide-react';
import type { SubTask } from '../types';
import {
  InspectorContainer,
  InspectorHeader,
  InspectorTitleGroup,
  InspectorHeading,
  StatusIndicator,
  CloseInspectorButton,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextArea,
  InspectorActions,
  SaveButton,
  SecondaryActionButton,
  EmptyInspectorBox,
  EmptyInspectorIcon,
  EmptyInspectorTitle,
  EmptyInspectorText,
  QuickMetricCardsRow,
  QuickMetricCard,
  QuickMetricValue,
  QuickMetricLabel,
} from '../styles/GoalTaskInspector.styles';

interface GoalTaskInspectorProps {
  activeSubtask: SubTask | null;
  title: string;
  onChangeTitle: (val: string) => void;
  description: string;
  onChangeDescription: (val: string) => void;
  onSave: () => void;
  onClose: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
  progressPercent: number;
  pendingCount: number;
}

export const GoalTaskInspector: React.FC<GoalTaskInspectorProps> = ({
  activeSubtask,
  title,
  onChangeTitle,
  description,
  onChangeDescription,
  onSave,
  onClose,
  onToggleStatus,
  onDelete,
  progressPercent,
  pendingCount,
}) => {
  if (!activeSubtask) {
    return (
      <InspectorContainer>
        <EmptyInspectorBox>
          <EmptyInspectorIcon>
            <Target size={26} />
          </EmptyInspectorIcon>
          <EmptyInspectorTitle>Detalhes da Tarefa</EmptyInspectorTitle>
          <EmptyInspectorText>
            Clique em qualquer tarefa da lista ao lado para ver e editar suas
            informações em tempo real.
          </EmptyInspectorText>

          <QuickMetricCardsRow>
            <QuickMetricCard>
              <QuickMetricValue>{progressPercent}%</QuickMetricValue>
              <QuickMetricLabel>Concluído</QuickMetricLabel>
            </QuickMetricCard>
            <QuickMetricCard>
              <QuickMetricValue>{pendingCount}</QuickMetricValue>
              <QuickMetricLabel>Pendentes</QuickMetricLabel>
            </QuickMetricCard>
          </QuickMetricCardsRow>
        </EmptyInspectorBox>
      </InspectorContainer>
    );
  }

  return (
    <InspectorContainer>
      <InspectorHeader>
        <InspectorTitleGroup>
          <InspectorHeading>Detalhes da Tarefa</InspectorHeading>
          <StatusIndicator $completed={activeSubtask.completed}>
            {activeSubtask.completed ? 'Concluída' : 'Pendente'}
          </StatusIndicator>
        </InspectorTitleGroup>

        <CloseInspectorButton type="button" onClick={onClose} title="Fechar painel">
          <X size={18} />
        </CloseInspectorButton>
      </InspectorHeader>

      <FormGroup>
        <FormLabel>Título da Tarefa</FormLabel>
        <FormInput
          type="text"
          value={title}
          placeholder="Título da tarefa..."
          onChange={(e) => onChangeTitle(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>Descrição & Notas</FormLabel>
        <FormTextArea
          value={description}
          placeholder="Descrição detalhada da tarefa..."
          onChange={(e) => onChangeDescription(e.target.value)}
        />
      </FormGroup>

      <InspectorActions>
        <SaveButton type="button" onClick={onSave}>
          <Check size={16} /> Salvar alterações
        </SaveButton>

        <SecondaryActionButton type="button" onClick={onToggleStatus}>
          {activeSubtask.completed ? (
            <>
              <RotateCcw size={15} /> Reabrir tarefa
            </>
          ) : (
            <>
              <CheckCircle2 size={15} /> Concluir tarefa
            </>
          )}
        </SecondaryActionButton>

        <SecondaryActionButton type="button" $isDanger onClick={onDelete}>
          <Trash2 size={15} /> Excluir tarefa
        </SecondaryActionButton>
      </InspectorActions>
    </InspectorContainer>
  );
};
