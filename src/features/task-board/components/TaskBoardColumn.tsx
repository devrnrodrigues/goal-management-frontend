import React, { useState, useRef, useEffect } from 'react';
import { Plus, MoreVertical, Pencil, Trash2, GripVertical } from 'lucide-react';
import type { BoardColumn, BoardTask } from '../types';
import { TaskCard } from './TaskCard';
import {
  ColumnWrapper,
  ColumnTopBar,
  ColumnHeader,
  ColumnTitleArea,
  ColumnTitleText,
  TaskCountNumber,
  ColumnActions,
  DragHandleBtn,
  IconBtn,
  ColumnMenuDropdown,
  ColumnMenuItem,
  CardsList,
  EmptyNotice,
} from '../styles/TaskBoardColumn.styles';

interface TaskBoardColumnProps {
  column: BoardColumn;
  tasks: BoardTask[];
  allColumns: BoardColumn[];
  draggedTaskId: string | null;
  draggedColumnId: string | null;
  onAddTaskToColumn: (columnId: string) => void;
  onEditColumn: (column: BoardColumn) => void;
  onDeleteColumn: (columnId: string) => void;
  onToggleComplete: (taskId: string) => void;
  onEditTask: (task: BoardTask) => void;
  onDeleteTask: (taskId: string) => void;
  onMoveTask: (taskId: string, targetColId: string) => void;
  onDragStartTask: (taskId: string) => void;
  onDragEndTask: () => void;
  onDropTaskOnTask: (targetTaskId: string, targetColId: string) => void;
  onDropTaskOnColumn: (targetColId: string) => void;
  onDragStartColumn: (columnId: string) => void;
  onDragEndColumn: () => void;
  onDropColumn: (targetColId: string) => void;
}

export const TaskBoardColumn: React.FC<TaskBoardColumnProps> = ({
  column,
  tasks,
  allColumns,
  draggedTaskId,
  draggedColumnId,
  onAddTaskToColumn,
  onEditColumn,
  onDeleteColumn,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onMoveTask,
  onDragStartTask,
  onDragEndTask,
  onDropTaskOnTask,
  onDropTaskOnColumn,
  onDragStartColumn,
  onDragEndColumn,
  onDropColumn,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isColumnDragOver, setIsColumnDragOver] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isDraggingThisColumn = draggedColumnId === column.id;
  const isDraggingAnyColumn = Boolean(draggedColumnId);
  const isDraggingAnyTask = Boolean(draggedTaskId);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!draggedTaskId && !draggedColumnId) {
      setIsColumnDragOver(false);
    }
  }, [draggedTaskId, draggedColumnId]);

  return (
    <ColumnWrapper
      $isDragging={isDraggingThisColumn}
      $isDragOver={isColumnDragOver}
      onDragOver={(e) => {
        if ((isDraggingAnyColumn && !isDraggingThisColumn) || isDraggingAnyTask) {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
          if (!isColumnDragOver) {
            setIsColumnDragOver(true);
          }
        }
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsColumnDragOver(false);
        }
      }}
      onDrop={(e) => {
        setIsColumnDragOver(false);
        if (isDraggingAnyColumn && !isDraggingThisColumn) {
          e.preventDefault();
          onDropColumn(column.id);
        } else if (isDraggingAnyTask) {
          e.preventDefault();
          onDropTaskOnColumn(column.id);
        }
      }}
    >
      <ColumnTopBar $color={column.color} />
      <ColumnHeader>
        <ColumnTitleArea>
          <ColumnTitleText>{column.title}</ColumnTitleText>
          <TaskCountNumber>{tasks.length}</TaskCountNumber>
        </ColumnTitleArea>

        <ColumnActions ref={menuRef}>
          <DragHandleBtn
            type="button"
            draggable
            onDragStart={(e) => {
              e.stopPropagation();
              e.dataTransfer.setData('text/plain', column.id);
              e.dataTransfer.effectAllowed = 'move';
              onDragStartColumn(column.id);
            }}
            onDragEnd={() => {
              onDragEndColumn();
            }}
            title="Arrastar coluna"
          >
            <GripVertical size={15} />
          </DragHandleBtn>

          <IconBtn
            type="button"
            draggable={false}
            onDragStart={(e) => e.stopPropagation()}
            onClick={() => onAddTaskToColumn(column.id)}
            title="Adicionar tarefa"
          >
            <Plus size={15} />
          </IconBtn>
          <IconBtn
            type="button"
            draggable={false}
            onDragStart={(e) => e.stopPropagation()}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            title="Opções"
          >
            <MoreVertical size={15} />
          </IconBtn>

          {isMenuOpen && (
            <ColumnMenuDropdown>
              <ColumnMenuItem
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onEditColumn(column);
                }}
              >
                <Pencil size={13} /> Editar coluna
              </ColumnMenuItem>
              {allColumns.length > 1 && (
                <ColumnMenuItem
                  type="button"
                  $danger
                  onClick={() => {
                    setIsMenuOpen(false);
                    onDeleteColumn(column.id);
                  }}
                >
                  <Trash2 size={13} /> Excluir coluna
                </ColumnMenuItem>
              )}
            </ColumnMenuDropdown>
          )}
        </ColumnActions>
      </ColumnHeader>

      <CardsList
        onDragOver={(e) => {
          if (isDraggingAnyTask) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
          }
        }}
        onDrop={(e) => {
          if (isDraggingAnyTask) {
            e.preventDefault();
            onDropTaskOnColumn(column.id);
          }
        }}
      >
        {tasks.length === 0 ? (
          <EmptyNotice>Nenhuma tarefa</EmptyNotice>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              columns={allColumns}
              isDragging={draggedTaskId === task.id}
              isDraggingTask={isDraggingAnyTask}
              onToggleComplete={onToggleComplete}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onMove={onMoveTask}
              onDragStart={onDragStartTask}
              onDragEnd={onDragEndTask}
              onDropOnTask={onDropTaskOnTask}
            />
          ))
        )}
      </CardsList>
    </ColumnWrapper>
  );
};
