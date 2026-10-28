import React, { useState, useRef, useEffect } from 'react';
import { Plus, MoreVertical, Pencil, Trash2, GripVertical } from 'lucide-react';
import { useDragControls } from 'framer-motion';
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
  onColumnDragEnd: () => void;
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
}

export const TaskBoardColumn: React.FC<TaskBoardColumnProps> = ({
  column,
  tasks,
  allColumns,
  draggedTaskId,
  onColumnDragEnd,
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
}) => {
  const dragControls = useDragControls();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTaskDragOver, setIsTaskDragOver] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    if (!draggedTaskId) {
      setIsTaskDragOver(false);
    }
  }, [draggedTaskId]);

  return (
    <ColumnWrapper
      value={column}
      dragListener={false}
      dragControls={dragControls}
      onDragEnd={onColumnDragEnd}
      whileDrag={{
        scale: 1.02,
        boxShadow: '0 20px 30px -4px rgba(0, 0, 0, 0.15), 0 10px 15px -3px rgba(0, 0, 0, 0.08)',
        zIndex: 50,
      }}
      $isTaskDragOver={isTaskDragOver && isDraggingAnyTask}
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
        if (isDraggingAnyTask) {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
          if (!isTaskDragOver) {
            setIsTaskDragOver(true);
          }
        }
      }}
      onDragLeave={(e: React.DragEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsTaskDragOver(false);
        }
      }}
      onDrop={(e: React.DragEvent<HTMLDivElement>) => {
        setIsTaskDragOver(false);
        if (isDraggingAnyTask) {
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
            onPointerDown={(e) => {
              e.preventDefault();
              dragControls.start(e);
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

      <CardsList>
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
