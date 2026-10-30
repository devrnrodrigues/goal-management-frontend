import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { CalendarDayInfo, CalendarTaskStatus } from '../types';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  TitleGroup,
  ModalTitle,
  ModalSubtitle,
  CloseButton,
  ModalBody,
  TasksList,
  TaskItem,
  TaskTopRow,
  TaskStatusIndicator,
  StatusDot,
  PriorityText,
  TaskTitle,
  TaskMetaRow,
  MetaGoal,
  MetaDot,
  EmptyState,
  EmptyText,
} from '../styles/CalendarDayDetailsModal.styles';

interface CalendarDayDetailsModalProps {
  dayInfo: CalendarDayInfo | null;
  onClose: () => void;
}

export const CalendarDayDetailsModal: React.FC<CalendarDayDetailsModalProps> = ({
  dayInfo,
  onClose,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!dayInfo) return;
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dayInfo, handleKeyDown]);

  if (!dayInfo) return null;

  const formattedDateTitle = format(dayInfo.date, "EEEE, d 'de' MMMM", {
    locale: ptBR,
  });

  const capitalizedTitle =
    formattedDateTitle.charAt(0).toUpperCase() + formattedDateTitle.slice(1);

  const totalTasks = dayInfo.tasks.length;

  const getStatusLabel = (status: CalendarTaskStatus, columnName: string) => {
    if (columnName) return columnName;
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'in_progress':
        return 'Em Progresso';
      case 'pending':
      default:
        return 'A Fazer';
    }
  };

  return createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <TitleGroup>
            <ModalTitle>{capitalizedTitle}</ModalTitle>
            <ModalSubtitle>
              {totalTasks === 0
                ? 'Nenhuma tarefa'
                : totalTasks === 1
                ? '1 tarefa'
                : `${totalTasks} tarefas`}
            </ModalSubtitle>
          </TitleGroup>

          <CloseButton type="button" onClick={onClose} aria-label="Fechar">
            <X size={16} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          {totalTasks === 0 ? (
            <EmptyState>
              <EmptyText>Nenhuma tarefa agendada para este dia.</EmptyText>
            </EmptyState>
          ) : (
            <TasksList>
              {dayInfo.tasks.map((task) => (
                <TaskItem key={task.id}>
                  <TaskTopRow>
                    <TaskStatusIndicator>
                      <StatusDot $status={task.status} />
                      <span>{getStatusLabel(task.status, task.columnName)}</span>
                    </TaskStatusIndicator>
                    <PriorityText $priority={task.priority}>
                      {task.priority}
                    </PriorityText>
                  </TaskTopRow>

                  <TaskTitle>{task.title}</TaskTitle>

                  <TaskMetaRow>
                    {task.goalTitle && <MetaGoal>{task.goalTitle}</MetaGoal>}
                    {task.goalTitle && task.author?.name && <MetaDot>•</MetaDot>}
                    {task.author?.name && <span>{task.author.name}</span>}
                    {task.formattedDate && <MetaDot>•</MetaDot>}
                    {task.formattedDate && <span>{task.formattedDate}</span>}
                  </TaskMetaRow>
                </TaskItem>
              ))}
            </TasksList>
          )}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>,
    document.body
  );
};
