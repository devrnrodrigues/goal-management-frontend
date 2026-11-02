import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X, Layers, CheckSquare } from 'lucide-react';
import { AddTaskModal, UpdateTaskModal } from '../../task-board';
import { ConfirmDeleteModal, getGoalPermissions } from '../../shared';
import type { Task, SubTask, SubTaskPriority } from '../types';
import { useGoalDetail } from '../hooks';
import { GoalDetailHero } from './GoalDetailHero';
import { GoalTaskQuickAdd } from './GoalTaskQuickAdd';
import { GoalTaskItem } from './GoalTaskItem';
import { GoalTaskModal } from './GoalTaskModal';
import { GoalTasksSkeleton } from './GoalTasksSkeleton';
import {
  ViewContainer,
  WorkspaceGrid,
  TaskListSection,
  ControlsBar,
  FilterTabsGroup,
  FilterTabButton,
  ControlsRightGroup,
  SearchBox,
  SearchInput,
  ClearSearchButton,
  BulkActionButton,
  TasksListWrapper,
  EmptyStateBox,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateText,
} from '../styles/GoalDetailView.styles';

const fadeTransitionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export interface GoalDetailViewProps {
  task: Task;
  isLoading?: boolean;
  onClose: () => void;
  onAddTasks?: (newTasks: SubTask[]) => void;
  onUpdateTasks?: (updatedTasks: SubTask[]) => void;
  onUpdateSingleTask?: (updatedTask: SubTask) => void;
  onToggleSubtask?: (subtaskId: string) => void;
  onDeleteTask?: () => void;
  onDeleteSubtask?: (subtaskId: string) => void;
  onEditGoal?: () => void;
}

export const GoalDetailView: React.FC<GoalDetailViewProps> = ({
  task,
  isLoading = false,
  onClose,
  onAddTasks,
  onUpdateTasks,
  onUpdateSingleTask,
  onToggleSubtask,
  onDeleteTask,
  onDeleteSubtask,
  onEditGoal: _onEditGoal,
}) => {
  const permissions = getGoalPermissions(task.userRole);
  const {
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    isQuickAddOpen,
    setIsQuickAddOpen,
    quickTitle,
    setQuickTitle,
    quickDescription,
    setQuickDescription,
    handleQuickAddSubmit,
    isAddTaskModalOpen,
    setIsAddTaskModalOpen,
    isUpdateTaskModalOpen,
    setIsUpdateTaskModalOpen,
    isDeleteModalOpen,
    subtaskToDeleteId,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleConfirmDelete,
    handleToggleSubtaskClick,
    filteredSubtasks,
    totalCount,
    completedCount,
    pendingCount,
    progressPercent,
  } = useGoalDetail({
    task,
    onAddTasks,
    onUpdateSingleTask,
    onToggleSubtask,
    onDeleteTask,
    onDeleteSubtask,
  });

  const [subtaskToEdit, setSubtaskToEdit] = useState<SubTask | null>(null);
  const [isEditSubtaskModalOpen, setIsEditSubtaskModalOpen] = useState(false);

  const handleOpenEditSubtask = (subtask: SubTask) => {
    setSubtaskToEdit(subtask);
    setIsEditSubtaskModalOpen(true);
  };

  const handleSaveSubtask = (
    title: string,
    description?: string,
    priority?: SubTaskPriority,
    deadline?: string
  ) => {
    if (subtaskToEdit) {
      onUpdateSingleTask?.({
        ...subtaskToEdit,
        title,
        description,
        priority,
        deadline,
      });
    }
    setIsEditSubtaskModalOpen(false);
    setSubtaskToEdit(null);
  };

  const handleAddTasksSubmit = (newTasks: SubTask[]) => {
    onAddTasks?.(newTasks);
    setIsAddTaskModalOpen(false);
  };

  const handleUpdateTasksSubmit = (updatedTasks: SubTask[]) => {
    onUpdateTasks?.(updatedTasks);
    setIsUpdateTaskModalOpen(false);
  };

  return (
    <>
      <ViewContainer>
        <GoalDetailHero
          task={task}
          onClose={onClose}
          progressPercent={progressPercent}
        />

        <WorkspaceGrid>
          <TaskListSection>
            <ControlsBar>
              <FilterTabsGroup>
                <FilterTabButton
                  type="button"
                  $isActive={filterStatus === 'all'}
                  onClick={() => setFilterStatus('all')}
                >
                  Todas ({totalCount})
                </FilterTabButton>
                <FilterTabButton
                  type="button"
                  $isActive={filterStatus === 'pending'}
                  onClick={() => setFilterStatus('pending')}
                >
                  Pendentes ({pendingCount})
                </FilterTabButton>
                <FilterTabButton
                  type="button"
                  $isActive={filterStatus === 'completed'}
                  onClick={() => setFilterStatus('completed')}
                >
                  Concluídas ({completedCount})
                </FilterTabButton>
              </FilterTabsGroup>

              <ControlsRightGroup>
                {permissions.canManageTasks && (
                  <BulkActionButton
                    type="button"
                    onClick={() => setIsUpdateTaskModalOpen(true)}
                  >
                    <Layers size={14} /> Editar
                  </BulkActionButton>
                )}

                <SearchBox>
                  <Search size={14} />
                  <SearchInput
                    type="text"
                    value={searchQuery}
                    placeholder="Buscar tarefa"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <ClearSearchButton
                      type="button"
                      onClick={() => setSearchQuery('')}
                    >
                      <X size={12} />
                    </ClearSearchButton>
                  )}
                </SearchBox>
              </ControlsRightGroup>
            </ControlsBar>

            {permissions.canManageTasks && (
              <GoalTaskQuickAdd
                isOpen={isQuickAddOpen}
                onOpen={() => setIsQuickAddOpen(true)}
                onClose={() => setIsQuickAddOpen(false)}
                title={quickTitle}
                onChangeTitle={setQuickTitle}
                description={quickDescription}
                onChangeDescription={setQuickDescription}
                onSubmit={handleQuickAddSubmit}
              />
            )}

            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="tasks-skeleton"
                  variants={fadeTransitionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                >
                  <GoalTasksSkeleton />
                </motion.div>
              ) : filteredSubtasks.length > 0 ? (
                <motion.div
                  key="tasks-list"
                  variants={fadeTransitionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <TasksListWrapper>
                    {filteredSubtasks.map((subtask, index) => {
                      const effectivePriority: SubTaskPriority =
                        subtask.priority || (index % 3 === 0 ? 'Alta' : index % 3 === 1 ? 'Média' : 'Baixa');
                      const effectiveDeadline =
                        subtask.deadline || `${(index + 2) * 5} dias`;
                      const effectiveMembers =
                        subtask.members || task.members?.slice(index % 2, (index % 2) + 2);

                      const effectiveColumnTitle =
                        subtask.columnTitle ||
                        subtask.status ||
                        (subtask.completed
                          ? 'Concluído'
                          : index % 2 === 0
                          ? 'A Fazer'
                          : 'Em Andamento');

                      const displaySubtask: SubTask = {
                        ...subtask,
                        priority: effectivePriority,
                        deadline: effectiveDeadline,
                        members: effectiveMembers,
                        columnTitle: effectiveColumnTitle,
                      };

                      return (
                        <GoalTaskItem
                          key={subtask.id}
                          subtask={displaySubtask}
                          canManage={permissions.canManageTasks}
                          onToggle={() => handleToggleSubtaskClick(subtask.id)}
                          onDelete={() => handleOpenDeleteModal(subtask.id)}
                          onEdit={handleOpenEditSubtask}
                          onUpdate={onUpdateSingleTask}
                        />
                      );
                    })}
                  </TasksListWrapper>
                </motion.div>
              ) : (
                <motion.div
                  key="tasks-empty"
                  variants={fadeTransitionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <EmptyStateBox>
                    <EmptyStateIcon>
                      <CheckSquare size={24} />
                    </EmptyStateIcon>
                    <EmptyStateTitle>Nenhuma tarefa encontrada</EmptyStateTitle>
                    <EmptyStateText>
                      {searchQuery
                        ? 'Nenhuma tarefa corresponde à busca informada.'
                        : permissions.canManageTasks
                        ? 'Adicione sua primeira tarefa para esta meta utilizando o campo acima.'
                        : 'Nenhuma tarefa cadastrada nesta meta.'}
                    </EmptyStateText>
                  </EmptyStateBox>
                </motion.div>
              )}
            </AnimatePresence>
          </TaskListSection>
        </WorkspaceGrid>
      </ViewContainer>

      <AnimatePresence>
        {isAddTaskModalOpen && (
          <AddTaskModal
            isOpen={isAddTaskModalOpen}
            onClose={() => setIsAddTaskModalOpen(false)}
            onAddTask={handleAddTasksSubmit}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isUpdateTaskModalOpen && (
          <UpdateTaskModal
            open={isUpdateTaskModalOpen}
            onClose={() => setIsUpdateTaskModalOpen(false)}
            onUpdateTask={handleUpdateTasksSubmit}
            initialTasks={task.subtasks || []}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isEditSubtaskModalOpen && (
          <GoalTaskModal
            isOpen={isEditSubtaskModalOpen}
            task={subtaskToEdit}
            onClose={() => {
              setIsEditSubtaskModalOpen(false);
              setSubtaskToEdit(null);
            }}
            onSave={handleSaveSubtask}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDeleteModalOpen && (
          <ConfirmDeleteModal
            isOpen={isDeleteModalOpen}
            onClose={handleCloseDeleteModal}
            onConfirm={handleConfirmDelete}
            title={subtaskToDeleteId ? 'Excluir Tarefa' : 'Excluir Meta'}
            message={
              subtaskToDeleteId
                ? 'Tem certeza que deseja excluir esta tarefa? Esta ação não poderá ser desfeita.'
                : 'Tem certeza que deseja excluir esta meta? Esta ação não poderá ser desfeita.'
            }
          />
        )}
      </AnimatePresence>
    </>
  );
};