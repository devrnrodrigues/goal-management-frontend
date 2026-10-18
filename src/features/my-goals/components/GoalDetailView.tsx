import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Search, X, Layers, CheckSquare } from 'lucide-react';
import { AddTaskModal, UpdateTaskModal } from '../../task-board';
import { ConfirmDeleteModal } from '../../shared';
import type { Task, SubTask } from '../types';
import { useGoalDetail } from '../hooks';
import { GoalDetailHero } from './GoalDetailHero';
import { GoalTaskQuickAdd } from './GoalTaskQuickAdd';
import { GoalTaskItem } from './GoalTaskItem';
import { GoalTaskInspector } from './GoalTaskInspector';
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

export interface GoalDetailViewProps {
  task: Task;
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
  onClose,
  onAddTasks,
  onUpdateTasks,
  onUpdateSingleTask,
  onToggleSubtask,
  onDeleteTask,
  onDeleteSubtask,
  onEditGoal,
}) => {
  const {
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    selectedSubtaskId,
    activeSubtask,
    handleSelectSubtask,
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
    inspectorTitle,
    setInspectorTitle,
    inspectorDescription,
    setInspectorDescription,
    handleSaveInspector,
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
          completedCount={completedCount}
          totalCount={totalCount}
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
                <SearchBox>
                  <Search size={14} />
                  <SearchInput
                    type="text"
                    value={searchQuery}
                    placeholder="Buscar tarefa..."
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

                <BulkActionButton
                  type="button"
                  onClick={() => setIsUpdateTaskModalOpen(true)}
                >
                  <Layers size={14} /> Em lote
                </BulkActionButton>
              </ControlsRightGroup>
            </ControlsBar>

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

            {filteredSubtasks.length > 0 ? (
              <TasksListWrapper>
                {filteredSubtasks.map((subtask) => (
                  <GoalTaskItem
                    key={subtask.id}
                    subtask={subtask}
                    isSelected={selectedSubtaskId === subtask.id}
                    onSelect={() => handleSelectSubtask(subtask.id)}
                    onToggle={() => handleToggleSubtaskClick(subtask.id)}
                    onDelete={() => handleOpenDeleteModal(subtask.id)}
                  />
                ))}
              </TasksListWrapper>
            ) : (
              <EmptyStateBox>
                <EmptyStateIcon>
                  <CheckSquare size={24} />
                </EmptyStateIcon>
                <EmptyStateTitle>Nenhuma tarefa encontrada</EmptyStateTitle>
                <EmptyStateText>
                  {searchQuery
                    ? 'Nenhuma tarefa corresponde à busca informada.'
                    : 'Adicione sua primeira tarefa para esta meta utilizando o campo acima.'}
                </EmptyStateText>
              </EmptyStateBox>
            )}
          </TaskListSection>

          <GoalTaskInspector
            activeSubtask={activeSubtask}
            title={inspectorTitle}
            onChangeTitle={setInspectorTitle}
            description={inspectorDescription}
            onChangeDescription={setInspectorDescription}
            onSave={handleSaveInspector}
            onClose={() => handleSelectSubtask(selectedSubtaskId || '')}
            onToggleStatus={() =>
              activeSubtask && handleToggleSubtaskClick(activeSubtask.id)
            }
            onDelete={() =>
              activeSubtask && handleOpenDeleteModal(activeSubtask.id)
            }
            progressPercent={progressPercent}
            pendingCount={pendingCount}
          />
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