import React from 'react';
import {
  Clock,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Plus,
} from 'lucide-react';
import type { BoardTask, BoardColumn } from '../types';
import {
  CardContainer,
  CardHeader,
  PriorityBadge,
  DeadlineBadge,
  CardBody,
  CardTitle,
  CardDescription,
  CardFooter,
  AvatarsGroup,
  MemberImg,
  AddMemberCircle,
  HoverActions,
  ActionBtn,
} from '../styles/TaskCard.styles';

interface TaskCardProps {
  task: BoardTask;
  columns: BoardColumn[];
  isDragging?: boolean;
  isDraggingTask?: boolean;
  onToggleComplete: (taskId: string) => void;
  onEdit: (task: BoardTask) => void;
  onDelete: (taskId: string) => void;
  onMove: (taskId: string, targetColId: string) => void;
  onDragStart: (taskId: string) => void;
  onDragEnd?: () => void;
  onDropOnTask?: (targetTaskId: string, targetColId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  columns,
  isDragging = false,
  isDraggingTask = false,
  onToggleComplete: _onToggleComplete,
  onEdit,
  onDelete,
  onMove,
  onDragStart,
  onDragEnd,
  onDropOnTask,
}) => {
  const currentColumnIndex = columns.findIndex((c) => c.id === task.columnId);
  const prevColumn = currentColumnIndex > 0 ? columns[currentColumnIndex - 1] : null;
  const nextColumn =
    currentColumnIndex >= 0 && currentColumnIndex < columns.length - 1
      ? columns[currentColumnIndex + 1]
      : null;

  return (
    <CardContainer
      draggable
      $isDragging={isDragging}
      onDragStart={(e) => {
        e.stopPropagation();
        e.dataTransfer.setData('text/plain', task.id);
        e.dataTransfer.effectAllowed = 'move';
        onDragStart(task.id);
      }}
      onDragEnd={() => {
        onDragEnd?.();
      }}
      onDragOver={(e) => {
        if (isDraggingTask && !isDragging) {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
        }
      }}
      onDrop={(e) => {
        if (isDraggingTask && !isDragging) {
          e.preventDefault();
          e.stopPropagation();
          onDropOnTask?.(task.id, task.columnId);
        }
      }}
      onClick={() => onEdit(task)}
    >
      <CardHeader>
        <PriorityBadge $priority={task.priority}>
          {task.priority}
        </PriorityBadge>

        <DeadlineBadge>
          <Clock size={12} />
          <span>{task.deadline || '14 dias'}</span>
        </DeadlineBadge>
      </CardHeader>

      <CardBody>
        <CardTitle>{task.title}</CardTitle>
        {task.description && (
          <CardDescription>{task.description}</CardDescription>
        )}
      </CardBody>

      <CardFooter onClick={(e) => e.stopPropagation()}>
        {task.members && task.members.length > 0 ? (
          <AvatarsGroup>
            {task.members.map((m) => (
              <MemberImg key={m.id} src={m.avatarUrl} alt={m.name} title={m.name} />
            ))}
            <AddMemberCircle title="Atribuir">
              <Plus size={11} />
            </AddMemberCircle>
          </AvatarsGroup>
        ) : (
          <div />
        )}

        <HoverActions>
          <ActionBtn
            type="button"
            onClick={() => onEdit(task)}
            title="Editar"
          >
            <Pencil size={13} />
          </ActionBtn>

          <ActionBtn
            type="button"
            className="delete-btn"
            onClick={() => onDelete(task.id)}
            title="Excluir"
          >
            <Trash2 size={13} />
          </ActionBtn>

          {prevColumn && (
            <ActionBtn
              type="button"
              onClick={() => onMove(task.id, prevColumn.id)}
              title={`Mover para ${prevColumn.title}`}
            >
              <ChevronLeft size={14} />
            </ActionBtn>
          )}

          {nextColumn && (
            <ActionBtn
              type="button"
              onClick={() => onMove(task.id, nextColumn.id)}
              title={`Mover para ${nextColumn.title}`}
            >
              <ChevronRight size={14} />
            </ActionBtn>
          )}
        </HoverActions>
      </CardFooter>
    </CardContainer>
  );
};
