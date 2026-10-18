import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { SubTask, SubTaskPriority } from '../types';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseBtn,
  ModalBody,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextArea,
  FormRow,
  FormSelect,
  ModalFooter,
  CancelButton,
  SubmitButton,
} from '../styles/GoalTaskModal.styles';

interface GoalTaskModalProps {
  isOpen: boolean;
  task?: SubTask | null;
  onClose: () => void;
  onSave: (
    title: string,
    description?: string,
    priority?: SubTaskPriority,
    deadline?: string
  ) => void;
}

export const GoalTaskModal: React.FC<GoalTaskModalProps> = ({
  isOpen,
  task,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<SubTaskPriority>('Média');
  const [deadline, setDeadline] = useState('15 dias');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setPriority(task.priority || 'Média');
      setDeadline(task.deadline || '15 dias');
    } else {
      setTitle('');
      setDescription('');
      setPriority('Média');
      setDeadline('15 dias');
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave(
      title.trim(),
      description.trim() || undefined,
      priority,
      deadline.trim() || undefined
    );
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
          <ModalTitle>{task ? 'Editar tarefa' : 'Adicionar tarefa'}</ModalTitle>
          <CloseBtn type="button" onClick={onClose}>
            <X size={18} />
          </CloseBtn>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormGroup>
              <FormLabel>Título da tarefa</FormLabel>
              <FormInput
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título da tarefa"
                autoFocus
                required
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
                  onChange={(e) => setPriority(e.target.value as SubTaskPriority)}
                >
                  <option value="Baixa">Baixa</option>
                  <option value="Média">Média</option>
                  <option value="Alta">Alta</option>
                </FormSelect>
              </FormGroup>

              <FormGroup>
                <FormLabel>Prazo estimado</FormLabel>
                <FormInput
                  type="text"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  placeholder="Prazo"
                />
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
