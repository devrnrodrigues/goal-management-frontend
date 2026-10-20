import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus, ChevronLeft, ChevronRight, Target } from 'lucide-react';
import {
  GoalCard,
  GoalDetailView,
  AddGoalModal,
  GoalConfigModal,
  GoalStatsBar,
} from './components';
import { ConfirmDeleteModal } from '../shared';
import { useMyGoals } from './useMyGoals';
import type { SubTask, Task } from './types';
import {
  GoalsPageArea,
  GoalsHeader,
  GoalsTitle,
  GoalsSubtitle,
  AddButton,
  CardGrid,
  GoalCardWrapper,
  ViewSelector,
  ErrorMessageBanner,
  EmptyStateContainer,
} from './MyGoals.styles';

export type { SubTask, Task };

export const MyGoals: React.FC = () => {
  const {
    tasks,
    isLoading,
    errorMessage,
    currentPage,
    totalGoals,
    inProgressGoals,
    urgentGoals,
    averageProgress,
    totalPages,
    currentTasks,
    selectedTask,
    setSelectedTaskId,
    isModalOpen,
    setIsModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    setGoalToDeleteId,
    isConfigModalOpen,
    setIsConfigModalOpen,
    configModalTab,
    highlightedMemberId,
    setHighlightedMemberId,
    goalForConfig,
    handlePrev,
    handleNext,
    handleCreateTask,
    handleSelectGoal,
    handleOpenDeleteModal,
    handleConfirmDelete,
    handleOpenConfigModal,
    handleSaveGoalConfig,
    handleDeleteGoalFromConfig,
    handleUpdateSingleTask,
    handleUpdateGoalTasks,
    handleAddSubtasks,
    handleToggleSubtask,
    handleDeleteSubtask,
  } = useMyGoals();

  return (
    <GoalsPageArea>
      {selectedTask ? (
        <GoalDetailView
          key="task-view"
          task={selectedTask}
          onClose={() => setSelectedTaskId(null)}
          onAddTasks={handleAddSubtasks}
          onUpdateTasks={handleUpdateGoalTasks}
          onUpdateSingleTask={handleUpdateSingleTask}
          onToggleSubtask={handleToggleSubtask}
          onDeleteTask={() => handleOpenDeleteModal(selectedTask.id || '')}
          onDeleteSubtask={handleDeleteSubtask}
          onEditGoal={() => handleOpenConfigModal(selectedTask)}
        />
      ) : (
        <>
          <GoalsHeader>
            <div>
              <GoalsTitle>Minhas metas</GoalsTitle>
              <GoalsSubtitle>
                Acompanhe o progresso, adicione e gerencie metas.
              </GoalsSubtitle>
            </div>
            <AddButton type="button" onClick={() => setIsModalOpen(true)}>
              <Plus size={16} /> Adicionar meta
            </AddButton>
          </GoalsHeader>

          {errorMessage && <ErrorMessageBanner>{errorMessage}</ErrorMessageBanner>}

          <GoalStatsBar
            totalGoals={totalGoals}
            inProgressGoals={inProgressGoals}
            urgentGoals={urgentGoals}
            averageProgress={averageProgress}
          />

          {!isLoading && tasks.length === 0 ? (
            <EmptyStateContainer>
              <Target size={42} />
              <h3>Nenhuma meta cadastrada</h3>
              <p>Comece adicionando uma meta para planejar e acompanhar seus objetivos.</p>
            </EmptyStateContainer>
          ) : (
            <CardGrid id="cardGrid">
              {currentTasks.map((task) => (
                <GoalCardWrapper
                  key={task.id || task.title}
                  onClick={() => handleSelectGoal(task)}
                >
                  <GoalCard
                    category={task.category}
                    title={task.title}
                    progress={task.progress}
                    description={task.description}
                    deadline={task.deadline}
                    status={task.status}
                    priority={task.priority}
                    members={task.members}
                    onOpenSettings={(tab, memberId) => handleOpenConfigModal(task, tab, memberId)}
                  />
                </GoalCardWrapper>
              ))}
            </CardGrid>
          )}

          {totalPages > 1 && (
            <ViewSelector>
              <button
                id="prevBtn"
                type="button"
                onClick={handlePrev}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} /> Voltar
              </button>
              <span id="pageIndicator">{currentPage} / {totalPages}</span>
              <button
                id="nextBtn"
                type="button"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Próximo <ChevronRight size={16} />
              </button>
            </ViewSelector>
          )}
        </>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <AddGoalModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddGoal={handleCreateTask}
          />
        )}

        {isDeleteModalOpen && (
          <ConfirmDeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setGoalToDeleteId(null);
            }}
            onConfirm={handleConfirmDelete}
          />
        )}

        {isConfigModalOpen && goalForConfig && (
          <GoalConfigModal
            isOpen={isConfigModalOpen}
            initialTab={configModalTab}
            highlightedMemberId={highlightedMemberId}
            onClose={() => {
              setIsConfigModalOpen(false);
              setHighlightedMemberId(null);
            }}
            goal={{
              category: goalForConfig.category,
              title: goalForConfig.title,
              description: goalForConfig.description,
              deadline: goalForConfig.deadline,
              status: goalForConfig.status,
              priority: goalForConfig.priority,
              members: goalForConfig.members,
            }}
            onSaveGoal={handleSaveGoalConfig}
            onDeleteGoal={handleDeleteGoalFromConfig}
          />
        )}
      </AnimatePresence>
    </GoalsPageArea>
  );
};
