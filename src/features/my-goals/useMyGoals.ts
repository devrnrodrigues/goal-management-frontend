import { useState, useEffect, useCallback } from 'react';
import type { Task, SubTask } from './types';
import type { GoalConfigData } from './components';
import { initialTasks } from './constants/initialGoals';
import { membersByTitle, defaultMembers } from './constants/members';
import { useCardsPerPage } from './hooks';
import { useDevMode, appToast } from '../shared';
import { goalsApi } from './api/goalsApi';
import {
  mapSummaryToTask,
  mapDetailToTask,
  formatDateToApi,
  mapPriorityToApi,
  mapStatusToApi,
} from './api/goalMappers';
import { taskBoardApi } from '../task-board/api/taskBoardApi';
import {
  mapPriorityToDisplay as mapTaskPriorityToDisplay,
  mapPriorityToApi as mapTaskPriorityToApi,
} from '../task-board/api/taskBoardMappers';
import type { TaskApiResponse } from '../task-board/types';

const mapTaskApiToSubTask = (t: TaskApiResponse): SubTask => ({
  id: t.id,
  title: t.title,
  description: t.description,
  completed: t.completed,
  priority: mapTaskPriorityToDisplay(t.priority),
  columnTitle: t.columnTitle,
  deadline: t.deadline,
  members: (t.members || []).map((m) => ({
    id: m.userId,
    name: m.name,
    avatarUrl: m.avatarUrl || '',
  })),
});

export const useMyGoals = () => {
  const { isMock } = useDevMode();
  const [tasks, setTasks] = useState<Task[]>(isMock ? initialTasks : []);
  const [isLoading, setIsLoading] = useState<boolean>(!isMock);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [goalToDeleteId, setGoalToDeleteId] = useState<string | null>(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [configModalTab, setConfigModalTab] = useState<'details' | 'members'>('details');
  const [highlightedMemberId, setHighlightedMemberId] = useState<string | null>(null);
  const [goalForConfig, setGoalForConfig] = useState<Task | null>(null);

  const loadGoals = useCallback(async () => {
    if (isMock) {
      setTasks(initialTasks);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const pageResponse = await goalsApi.listGoals(0, 50);
      const mappedTasks = pageResponse.content.map(mapSummaryToTask);
      setTasks(mappedTasks);
    } catch {
      appToast.error('Não foi possível carregar as metas do servidor.');
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, [isMock]);

  useEffect(() => {
    loadGoals();
  }, [loadGoals]);

  useEffect(() => {
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
    window.addEventListener('open-add-goal-modal', handleOpenModal);
    return () => {
      window.removeEventListener('open-add-goal-modal', handleOpenModal);
    };
  }, []);

  const cardsPerPage = useCardsPerPage();
  const totalPages = Math.ceil(tasks.length / cardsPerPage) || 1;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const totalGoals = tasks.length;
  const inProgressGoals = tasks.filter((t) =>
    t.status === 'Em progresso' ||
    t.status === 'Em desenvolvimento' ||
    t.status === 'Homologação' ||
    t.status === 'Revisão final'
  ).length;
  const urgentGoals = tasks.filter((t) => t.status === 'Prazo final' || t.status === 'Prazo Final' || t.priority?.includes('Alta')).length;
  const averageProgress = totalGoals > 0
    ? Math.round(tasks.reduce((acc, t) => acc + t.progress, 0) / totalGoals)
    : 0;

  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentTasks = tasks.slice(startIndex, startIndex + cardsPerPage);

  const selectedTask = selectedTaskId !== null
    ? tasks.find((t) => t.id === selectedTaskId) || null
    : null;

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handleCreateTask = async (newTask: Task) => {
    if (isMock) {
      const created: Task = {
        ...newTask,
        id: newTask.id || `goal-${Date.now()}`,
      };
      setTasks([created, ...tasks]);
      setCurrentPage(1);
      appToast.success('Meta criada com sucesso!');
      return;
    }

    try {
      const createdGoal = await goalsApi.createGoal({
        title: newTask.title,
        description: newTask.description,
        category: newTask.category,
        priority: mapPriorityToApi(newTask.priority),
        deadline: formatDateToApi(newTask.deadline),
      });

      if (newTask.members && newTask.members.length > 0) {
        const extraMembers = newTask.members.filter((m) => m.role !== 'owner');
        for (const m of extraMembers) {
          try {
            await goalsApi.addMember(createdGoal.id, m.id, m.role || 'viewer');
          } catch (err: unknown) {
            const apiError = err as { message?: string };
            appToast.error(apiError.message || 'Erro ao adicionar membro à nova meta.');
          }
        }
      }

      const createdTask = mapDetailToTask(createdGoal);
      setTasks((prev) => [
        {
          ...createdTask,
          status: newTask.status || createdTask.status,
          members: newTask.members || createdTask.members,
        },
        ...prev,
      ]);
      setCurrentPage(1);
      appToast.success('Meta criada com sucesso!');
    } catch {
      appToast.error('Erro ao criar a meta no servidor.');
    }
  };

  const handleOpenDeleteModal = (taskId: string) => {
    setGoalToDeleteId(taskId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (goalToDeleteId === null) return;

    if (isMock) {
      setTasks((prev) => prev.filter((t) => t.id !== goalToDeleteId));
      if (selectedTaskId === goalToDeleteId) {
        setSelectedTaskId(null);
      }
      setIsDeleteModalOpen(false);
      setGoalToDeleteId(null);
      appToast.success('Meta excluída com sucesso!');
      return;
    }

    try {
      await goalsApi.deleteGoal(goalToDeleteId);
      setTasks((prev) => prev.filter((t) => t.id !== goalToDeleteId));
      if (selectedTaskId === goalToDeleteId) {
        setSelectedTaskId(null);
      }
      appToast.success('Meta excluída com sucesso!');
    } catch {
      appToast.error('Erro ao excluir a meta no servidor.');
    } finally {
      setIsDeleteModalOpen(false);
      setGoalToDeleteId(null);
    }
  };

  const handleSelectGoal = async (task: Task) => {
    setSelectedTaskId(task.id || null);

    if (!isMock && task.id) {
      try {
        const [detail, taskList] = await Promise.all([
          goalsApi.getGoalById(task.id),
          taskBoardApi.listTasks(task.id).catch(() => []),
        ]);
        const detailedTask = mapDetailToTask(detail);
        const subtasks = taskList.map(mapTaskApiToSubTask);
        const total = subtasks.length;
        const completed = subtasks.filter((st) => st.completed).length;
        const progress = total > 0 ? Math.round((completed / total) * 100) : detailedTask.progress;

        setTasks((prev) =>
          prev.map((t) => (t.id === task.id ? { ...t, ...detailedTask, subtasks, progress } : t))
        );
      } catch {
      }
    }
  };

  const handleOpenConfigModal = (task: Task, tab: 'details' | 'members' = 'details', memberId?: string) => {
    const existingMembers = task.members && task.members.length > 0
      ? task.members
      : (isMock ? (membersByTitle[task.title] || defaultMembers) : []);

    setConfigModalTab(tab);
    setHighlightedMemberId(memberId || null);
    setGoalForConfig({
      ...task,
      members: existingMembers,
      userRole: task.userRole,
    });
    setIsConfigModalOpen(true);
  };

  const handleSaveGoalConfig = async (updatedData: GoalConfigData) => {
    if (!goalForConfig) return;

    if (isMock || !goalForConfig.id) {
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id === goalForConfig.id || t.title === goalForConfig.title) {
            return {
              ...t,
              category: updatedData.category,
              title: updatedData.title,
              description: updatedData.description,
              deadline: updatedData.deadline,
              status: updatedData.status,
              priority: updatedData.priority,
              members: updatedData.members,
            };
          }
          return t;
        })
      );
      setIsConfigModalOpen(false);
      setGoalForConfig(null);
      return;
    }

    try {
      const response = await goalsApi.updateGoal(goalForConfig.id, {
        title: updatedData.title,
        description: updatedData.description,
        category: updatedData.category,
        priority: mapPriorityToApi(updatedData.priority),
        status: mapStatusToApi(updatedData.status),
        deadline: formatDateToApi(updatedData.deadline),
      });

      const originalMembers = goalForConfig.members || [];
      const newMembers = updatedData.members || [];

      let memberError: string | null = null;

      const added = newMembers.filter((m) => !originalMembers.some((om) => om.id === m.id));
      for (const m of added) {
        try {
          await goalsApi.addMember(goalForConfig.id, m.id, m.role || 'viewer');
        } catch (err: unknown) {
          const apiError = err as { message?: string };
          memberError = apiError.message || 'Erro ao adicionar membro à meta.';
        }
      }

      const removed = originalMembers.filter((om) => !newMembers.some((m) => m.id === om.id));
      for (const m of removed) {
        try {
          await goalsApi.removeMember(goalForConfig.id, m.id);
        } catch (err: unknown) {
          const apiError = err as { message?: string };
          memberError = apiError.message || 'Erro ao remover membro da meta.';
        }
      }

      const roleChanged = newMembers.filter((m) => {
        const orig = originalMembers.find((om) => om.id === m.id);
        return orig && m.role && orig.role && orig.role.toLowerCase() !== m.role.toLowerCase();
      });

      const newOwner = roleChanged.find((m) => m.role === 'owner');
      const otherChanges = roleChanged.filter((m) => m.role !== 'owner');

      if (newOwner) {
        try {
          await goalsApi.updateMemberRole(goalForConfig.id, newOwner.id, 'owner');
          appToast.success('Posse da meta transferida com sucesso!');
        } catch (err: unknown) {
          const apiError = err as { message?: string };
          memberError = apiError.message || 'Erro ao transferir a posse da meta.';
        }
      }

      if (otherChanges.length > 0) {
        for (const m of otherChanges) {
          try {
            await goalsApi.updateMemberRole(goalForConfig.id, m.id, m.role || 'viewer');
          } catch (err: unknown) {
            const apiError = err as { message?: string };
            memberError = apiError.message || 'Erro ao atualizar papel do membro.';
          }
        }
        if (!memberError && !newOwner) {
          appToast.success('Permissões dos membros atualizadas com sucesso!');
        }
      }

      if (memberError) {
        appToast.error(memberError);
      } else if (!newOwner && otherChanges.length === 0) {
        appToast.success('Configurações da meta salvas com sucesso!');
      }

      const updatedTask = mapDetailToTask(response);

      setTasks((prev) =>
        prev.map((t) => {
          if (t.id === goalForConfig.id) {
            return {
              ...t,
              ...updatedTask,
              members: updatedData.members || updatedTask.members,
            };
          }
          return t;
        })
      );
    } catch {
      appToast.error('Erro ao atualizar a meta no servidor.');
    } finally {
      setIsConfigModalOpen(false);
      setGoalForConfig(null);
    }
  };

  const handleDeleteGoalFromConfig = async () => {
    if (!goalForConfig) return;
    const targetId = goalForConfig.id;
    const targetTitle = goalForConfig.title;

    if (isMock || !targetId) {
      setTasks((prev) => prev.filter((t) => t.id !== targetId && t.title !== targetTitle));
      if (selectedTaskId === targetId) {
        setSelectedTaskId(null);
      }
      setIsConfigModalOpen(false);
      setGoalForConfig(null);
      appToast.success('Meta excluída com sucesso!');
      return;
    }

    try {
      await goalsApi.deleteGoal(targetId);
      setTasks((prev) => prev.filter((t) => t.id !== targetId));
      if (selectedTaskId === targetId) {
        setSelectedTaskId(null);
      }
      appToast.success('Meta excluída com sucesso!');
    } catch {
      appToast.error('Erro ao excluir a meta no servidor.');
    } finally {
      setIsConfigModalOpen(false);
      setGoalForConfig(null);
    }
  };

  const handleUpdateSingleTask = async (updatedSubtask: SubTask) => {
    if (selectedTaskId !== null) {
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id !== selectedTaskId) return t;
          const subtasksList = t.subtasks || [];
          const newSubtasks = subtasksList.map((st) =>
            st.id === updatedSubtask.id ? updatedSubtask : st
          );
          const total = newSubtasks.length;
          const completed = newSubtasks.filter((st) => st.completed).length;
          const newProgress = total > 0 ? Math.round((completed / total) * 100) : 0;
          return { ...t, subtasks: newSubtasks, progress: newProgress };
        })
      );

      if (!isMock) {
        try {
          await taskBoardApi.updateTask(updatedSubtask.id, {
            title: updatedSubtask.title.replace(/;$/, ''),
            description: updatedSubtask.description,
            priority: mapTaskPriorityToApi(updatedSubtask.priority),
          });
          appToast.success('Tarefa atualizada com sucesso!');
        } catch {
          appToast.error('Erro ao atualizar tarefa.');
        }
      } else {
        appToast.success('Tarefa atualizada com sucesso!');
      }
    }
  };

  const handleUpdateGoalTasks = (updatedSubtasks: SubTask[]) => {
    if (selectedTaskId !== null) {
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id !== selectedTaskId) return t;
          const total = updatedSubtasks.length;
          const completed = updatedSubtasks.filter((st) => st.completed).length;
          const newProgress = total > 0 ? Math.round((completed / total) * 100) : 0;
          return { ...t, subtasks: updatedSubtasks, progress: newProgress };
        })
      );
    }
  };

  const handleAddSubtasks = async (newSubtasks: SubTask[]) => {
    if (selectedTaskId !== null) {
      if (isMock) {
        setTasks((prev) =>
          prev.map((t) => {
            if (t.id !== selectedTaskId) return t;
            const combined = [...(t.subtasks || []), ...newSubtasks];
            const total = combined.length;
            const completed = combined.filter((st) => st.completed).length;
            const newProgress = total > 0 ? Math.round((completed / total) * 100) : 0;
            return { ...t, subtasks: combined, progress: newProgress };
          })
        );
        appToast.success('Tarefas adicionadas com sucesso!');
        return;
      }

      try {
        const createdApiTasks = await Promise.all(
          newSubtasks.map((st) =>
            taskBoardApi.createTask(selectedTaskId, {
              title: st.title.replace(/;$/, ''),
              description: st.description,
              priority: mapTaskPriorityToApi(st.priority),
            })
          )
        );
        const mappedCreated = createdApiTasks.map(mapTaskApiToSubTask);

        setTasks((prev) =>
          prev.map((t) => {
            if (t.id !== selectedTaskId) return t;
            const combined = [...(t.subtasks || []), ...mappedCreated];
            const total = combined.length;
            const completed = combined.filter((st) => st.completed).length;
            const newProgress = total > 0 ? Math.round((completed / total) * 100) : 0;
            return { ...t, subtasks: combined, progress: newProgress };
          })
        );
        appToast.success('Tarefas adicionadas com sucesso!');
      } catch {
        appToast.error('Erro ao adicionar tarefas.');
      }
    }
  };

  const handleToggleSubtask = async (subtaskId: string) => {
    if (selectedTaskId !== null) {
      let willComplete = true;
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id !== selectedTaskId) return t;
          const subtasksList = t.subtasks || [];
          const target = subtasksList.find((st) => st.id === subtaskId);
          if (target) {
            willComplete = !target.completed;
          }
          const updated = subtasksList.map((st) =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          );
          const total = updated.length;
          const completed = updated.filter((st) => st.completed).length;
          const newProgress = total > 0 ? Math.round((completed / total) * 100) : 0;
          return { ...t, subtasks: updated, progress: newProgress };
        })
      );

      appToast.success(willComplete ? 'Tarefa concluída!' : 'Tarefa reaberta!');

      if (!isMock) {
        try {
          await taskBoardApi.toggleComplete(subtaskId);
        } catch {
          appToast.error('Erro ao alternar conclusão da tarefa.');
        }
      }
    }
  };

  const handleDeleteSubtask = async (subtaskId: string) => {
    if (selectedTaskId !== null) {
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id !== selectedTaskId) return t;
          const subtasksList = t.subtasks || [];
          const updated = subtasksList.filter((st) => st.id !== subtaskId);
          const total = updated.length;
          const completed = updated.filter((st) => st.completed).length;
          const newProgress = total > 0 ? Math.round((completed / total) * 100) : 0;
          return { ...t, subtasks: updated, progress: newProgress };
        })
      );

      appToast.success('Tarefa excluída com sucesso!');

      if (!isMock) {
        try {
          await taskBoardApi.deleteTask(subtaskId);
        } catch {
          appToast.error('Erro ao excluir tarefa.');
        }
      }
    }
  };

  return {
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
    selectedTaskId,
    setSelectedTaskId,
    isModalOpen,
    setIsModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    goalToDeleteId,
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
  };
};
