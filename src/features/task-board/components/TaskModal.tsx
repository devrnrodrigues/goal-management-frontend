import React, { useState, useEffect } from 'react';
import { X, Target } from 'lucide-react';
import type { BoardTask, BoardColumn, TaskPriority, ActiveGoalInfo } from '../types';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseBtn,
  ModalBody,
  GoalInfoBanner,
  GoalInfoText,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextArea,
  FormRow,
  FormSelect,
  ModalFooter,
  CancelButton,
  SubmitButton,
} from '../styles/TaskModal.styles';

interface TaskModalProps {
  isOpen: boolean;
  task?: BoardTask | null;
  columns: BoardColumn[];
  defaultColumnId?: string;
  activeGoal?: ActiveGoalInfo | null;
  onClose: () => void;
  onSave: (
    title: string,
    description?: string,
    priority?: TaskPriority,
    columnId?: string
  ) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  task,
  columns,
  defaultColumnId,
  activeGoal,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('Média');
  const [columnId, setColumnId] = useState<string>(
    defaultColumnId || columns[0]?.id || ''
  );

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setPriority(task.priority || 'Média');
      setColumnId(task.columnId);
    } else {
      setTitle('');
      setDescription('');
      setPriority('Média');
      setColumnId(defaultColumnId || columns[0]?.id || '');
    }
  }, [task, defaultColumnId, columns, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave(title.trim(), description.trim() || undefined, priority, columnId);
    onClose();
  };

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <ModalContainer
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <ModalTitle>{task ? 'Editar tarefa' : 'Adicionar nova tarefa'}</ModalTitle>
          <CloseBtn type="button" onClick={onClose}>
            <X size={18} />
          </CloseBtn>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <ModalBody>
            {activeGoal && (
              <GoalInfoBanner>
                <Target size={16} />
                <GoalInfoText>
                  Meta de destino: <strong>{activeGoal.title}</strong>
                </GoalInfoText>
              </GoalInfoBanner>
            )}

            <FormGroup>
              <FormLabel>Título da tarefa</FormLabel>
              <FormInput
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título da tarefa"
                required
                autoFocus
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Descrição</FormLabel>
              <FormTextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição da tarefa"
                rows={3}
              />
            </FormGroup>

            <FormRow>
              <FormGroup>
                <FormLabel>Prioridade</FormLabel>
                <FormSelect
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as TaskPriority)}
                >
                  <option value="Baixa">Baixa</option>
                  <option value="Média">Média</option>
                  <option value="Alta">Alta</option>
                </FormSelect>
              </FormGroup>

              <FormGroup>
                <FormLabel>Coluna</FormLabel>
                <FormSelect
                  value={columnId}
                  onChange={(e) => setColumnId(e.target.value)}
                >
                  {columns.map((col) => (
                    <option key={col.id} value={col.id}>
                      {col.title}
                    </option>
                  ))}
                </FormSelect>
              </FormGroup>
            </FormRow>
          </ModalBody>

          <ModalFooter>
            <CancelButton type="button" onClick={onClose}>
              Cancelar
            </CancelButton>
            <SubmitButton type="submit">Salvar</SubmitButton>
          </ModalFooter>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
};
