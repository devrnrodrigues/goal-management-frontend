import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Target } from 'lucide-react';
import { useTaskBoard } from './useTaskBoard';
import type { BoardColumn, BoardTask, TaskPriority } from './types';
import {
  TaskBoardHeader,
  TaskBoardColumn,
  ColumnModal,
  TaskModal,
} from './components';
import { ConfirmDeleteModal } from '../shared';
import {
  BoardContainer,
  BoardColumnsRow,
  ErrorMessageBanner,
  EmptyBoardNotice,
} from './TaskBoard.styles';

export const TaskBoard: React.FC = () => {
  const {
    availableGoals,
    activeGoal,
    columns,
    isLoading,
    errorMessage,
    tasksByColumn,
    priorityFilter,
    setPriorityFilter,
    draggedTaskId,
    handleReorderColumns,
    handleColumnDragEnd,
    handleSelectGoal,
    handleAddColumn,
    handleEditColumn,
    handleDeleteColumn,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
    handleMoveTask,
    handleToggleTaskComplete,
    handleTaskDragStart,
    handleTaskDragEnd,
    handleTaskDropOnTask,
    handleTaskDropOnColumn,
  } = useTaskBoard();

  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [columnToEdit, setColumnToEdit] = useState<BoardColumn | null>(null);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<BoardTask | null>(null);
  const [targetColumnForNewTask, setTargetColumnForNewTask] = useState<string | undefined>(
    columns[0]?.id
  );

  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
  const [taskToDeleteId, setTaskToDeleteId] = useState<string | null>(null);

  const handleOpenAddColumn = () => {
    setColumnToEdit(null);
    setIsColumnModalOpen(true);
  };

  const handleOpenEditColumn = (column: BoardColumn) => {
    setColumnToEdit(column);
    setIsColumnModalOpen(true);
  };

  const handleSaveColumn = (title: string, color: string) => {
    if (columnToEdit) {
      handleEditColumn(columnToEdit.id, title, color);
    } else {
      handleAddColumn(title, color);
    }
  };

  const handleOpenAddTask = (columnId?: string) => {
    setTaskToEdit(null);
    setTargetColumnForNewTask(columnId || columns[0]?.id);
    setIsTaskModalOpen(true);
  };

  const handleOpenEditTask = (task: BoardTask) => {
    setTaskToEdit(task);
    setTargetColumnForNewTask(task.columnId);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (
    title: string,
    description?: string,
    priority?: TaskPriority,
    columnId?: string
  ) => {
    if (taskToEdit) {
      handleUpdateTask(taskToEdit.id, title, description, priority, columnId);
    } else {
      handleAddTask(columnId || columns[0]?.id || 'col-backlog', title, description, priority);
    }
  };

  const handleRequestDeleteTask = (taskId: string) => {
    setTaskToDeleteId(taskId);
    setIsDeleteTaskModalOpen(true);
  };

  const handleConfirmDeleteTask = () => {
    if (taskToDeleteId) {
      handleDeleteTask(taskToDeleteId);
    }
    setIsDeleteTaskModalOpen(false);
    setTaskToDeleteId(null);
  };

  return (
    <BoardContainer>
      {errorMessage && <ErrorMessageBanner>{errorMessage}</ErrorMessageBanner>}

      <TaskBoardHeader
        availableGoals={availableGoals}
        activeGoal={activeGoal}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        onSelectGoal={handleSelectGoal}
        onOpenAddColumnModal={handleOpenAddColumn}
      />

      {!isLoading && !activeGoal ? (
        <EmptyBoardNotice>
          <Target size={42} />
          <h3>Nenhuma meta encontrada</h3>
          <p>Crie uma meta primeiro na aba "Metas" para gerenciar tarefas no quadro.</p>
        </EmptyBoardNotice>
      ) : (
        <BoardColumnsRow
          axis="x"
          values={columns}
          onReorder={handleReorderColumns}
        >
          {columns.map((column) => (
            <TaskBoardColumn
              key={column.id}
              column={column}
              tasks={tasksByColumn[column.id] || []}
              allColumns={columns}
              draggedTaskId={draggedTaskId}
              onColumnDragEnd={handleColumnDragEnd}
              onAddTaskToColumn={handleOpenAddTask}
              onEditColumn={handleOpenEditColumn}
              onDeleteColumn={handleDeleteColumn}
              onToggleComplete={handleToggleTaskComplete}
              onEditTask={handleOpenEditTask}
              onDeleteTask={handleRequestDeleteTask}
              onMoveTask={handleMoveTask}
              onDragStartTask={handleTaskDragStart}
              onDragEndTask={handleTaskDragEnd}
              onDropTaskOnTask={handleTaskDropOnTask}
              onDropTaskOnColumn={handleTaskDropOnColumn}
            />
          ))}
        </BoardColumnsRow>
      )}

      <AnimatePresence>
        {isColumnModalOpen && (
          <ColumnModal
            isOpen={isColumnModalOpen}
            column={columnToEdit}
            onClose={() => {
              setIsColumnModalOpen(false);
              setColumnToEdit(null);
            }}
            onSave={handleSaveColumn}
          />
        )}

        {isTaskModalOpen && (
          <TaskModal
            isOpen={isTaskModalOpen}
            task={taskToEdit}
            columns={columns}
            defaultColumnId={targetColumnForNewTask}
            activeGoal={activeGoal}
            onClose={() => {
              setIsTaskModalOpen(false);
              setTaskToEdit(null);
            }}
            onSave={handleSaveTask}
          />
        )}

        {isDeleteTaskModalOpen && (
          <ConfirmDeleteModal
            isOpen={isDeleteTaskModalOpen}
            title="Excluir Tarefa"
            message="Tem certeza que deseja excluir esta tarefa? Esta ação não poderá ser desfeita."
            onClose={() => {
              setIsDeleteTaskModalOpen(false);
              setTaskToDeleteId(null);
            }}
            onConfirm={handleConfirmDeleteTask}
          />
        )}
      </AnimatePresence>
    </BoardContainer>
  );
};
