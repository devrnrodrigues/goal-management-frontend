import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Task } from '../my-goals/types';
import { initialTasks } from '../my-goals/constants/initialGoals';
import { membersByTitle, defaultMembers } from '../my-goals/constants/members';
import type { BoardColumn, BoardTask, ActiveGoalInfo, TaskPriority } from './types';
import { useDevMode, appToast } from '../shared';
import { goalsApi } from '../my-goals/api/goalsApi';
import { mapSummaryToTask } from '../my-goals/api/goalMappers';
import { taskBoardApi } from './api/taskBoardApi';
import {
  mapColumnToDisplay,
  mapTaskToDisplay,
  mapPriorityToApi,
} from './api/taskBoardMappers';

const defaultColumns: BoardColumn[] = [
  { id: 'col-backlog', title: 'Backlog', color: '#64748b' },
  { id: 'col-todo', title: 'A Fazer', color: '#3b82f6' },
  { id: 'col-progress', title: 'Em progresso', color: '#f59e0b' },
  { id: 'col-done', title: 'Concluído', color: '#10b981' },
];

export const useTaskBoard = () => {
  const { isMock } = useDevMode();
  const [availableGoals, setAvailableGoals] = useState<Task[]>(isMock ? initialTasks : []);
  const [isBoardLoading, setIsBoardLoading] = useState<boolean>(false);
  const [errorMessage] = useState<string | null>(null);

  const [activeGoal, setActiveGoal] = useState<ActiveGoalInfo | null>(() => {
    if (!isMock) return null;
    const first = initialTasks[0];
    return {
      id: first.id || 'goal-default',
      title: first.title,
      category: first.category,
      deadline: first.deadline,
      progress: first.progress,
    };
  });

  const [columns, setColumns] = useState<BoardColumn[]>(isMock ? defaultColumns : []);

  const [tasks, setTasks] = useState<BoardTask[]>(() => {
    if (!isMock) return [];
    const first = initialTasks[0];
    const firstColId = defaultColumns[0].id;
    const goalMembers = membersByTitle[first.title] || defaultMembers;

    return (first.subtasks || []).map((st, index) => {
      const priorities: TaskPriority[] = ['Alta', 'Média', 'Baixa'];
      const p = priorities[index % priorities.length];
      const memberSubset = goalMembers.slice(index % 2, (index % 2) + 2);

      return {
        id: `task-${st.id}`,
        title: st.title.replace(/;$/, ''),
        description: st.description,
        completed: st.completed,
        priority: p,
        columnId: firstColId,
        goalId: first.id,
        deadline: first.deadline ? `${(index + 2) * 5} dias` : undefined,
        attachmentsCount: (index * 3) % 8,
        commentsCount: (index * 4) % 15,
        members: memberSubset,
      };
    });
  });

  const [searchFilter, setSearchFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const lastSavedColumnsOrderRef = useRef<string>('');
  const columnsRef = useRef<BoardColumn[]>(columns);
  columnsRef.current = columns;

  const loadGoalBoard = useCallback(async (goalId: string) => {
    if (isMock) return;

    setIsBoardLoading(true);
    try {
      const [colRes, taskRes] = await Promise.all([
        taskBoardApi.listColumns(goalId),
        taskBoardApi.listTasks(goalId),
      ]);
      const displayColumns = colRes.map(mapColumnToDisplay);
      const finalColumns = displayColumns.length > 0 ? displayColumns : defaultColumns;
      setColumns(finalColumns);
      lastSavedColumnsOrderRef.current = finalColumns.map((c) => c.id).join(',');
      setTasks(taskRes.map(mapTaskToDisplay));
    } catch {
      appToast.error('Não foi possível carregar as colunas e tarefas do quadro.');
      setColumns([]);
      setTasks([]);
    } finally {
      setIsBoardLoading(false);
    }
  }, [isMock]);

  const { data: serverGoals, isLoading: isGoalsLoading } = useQuery({
    queryKey: ['task-board', 'goals', isMock],
    queryFn: async () => {
      if (isMock) {
        return initialTasks;
      }
      try {
        const pageRes = await goalsApi.listGoals(0, 50);
        return pageRes.content.map(mapSummaryToTask);
      } catch {
        appToast.error('Não foi possível carregar as metas.');
        return [];
      }
    },
  });

  useEffect(() => {
    if (serverGoals) {
      setAvailableGoals(serverGoals);
      if (!activeGoal && serverGoals.length > 0) {
        const first = serverGoals[0];
        setActiveGoal({
          id: first.id || '',
          title: first.title,
          category: first.category,
          deadline: first.deadline,
          progress: first.progress,
          userRole: first.userRole,
        });
        if (!isMock && first.id) {
          loadGoalBoard(first.id);
        } else if (isMock) {
          setColumns(defaultColumns);
          const firstColId = defaultColumns[0].id;
          const goalMembers = membersByTitle[first.title] || defaultMembers;
          setTasks(
            (first.subtasks || []).map((st, index) => {
              const priorities: TaskPriority[] = ['Alta', 'Média', 'Baixa'];
              const p = priorities[index % priorities.length];
              const memberSubset = goalMembers.slice(index % 2, (index % 2) + 2);

              return {
                id: `task-${st.id}`,
                title: st.title.replace(/;$/, ''),
                description: st.description,
                completed: st.completed,
                priority: p,
                columnId: firstColId,
                goalId: first.id,
                deadline: first.deadline ? `${(index + 2) * 5} dias` : undefined,
                attachmentsCount: (index * 3) % 8,
                commentsCount: (index * 4) % 15,
                members: memberSubset,
              };
            })
          );
        }
      }
    }
  }, [serverGoals, isMock, activeGoal, loadGoalBoard]);

  const isLoading = (isGoalsLoading || isBoardLoading) && columns.length === 0;

  const handleSelectGoal = async (goalInput: string | Task) => {
    if (typeof goalInput === 'string') {
      const trimmed = goalInput.trim();
      if (!trimmed) return;

      const matched = availableGoals.find(
        (g) => g.title.toLowerCase() === trimmed.toLowerCase()
      );

      if (matched) {
        await applyGoal(matched);
      } else if (isMock) {
        const customGoal: ActiveGoalInfo = {
          id: `goal-custom-${Date.now()}`,
          title: trimmed,
          category: 'Personalizada',
          progress: 0,
        };
        setActiveGoal(customGoal);
        setTasks([]);
      }
    } else {
      await applyGoal(goalInput);
    }
  };

  const applyGoal = async (goal: Task) => {
    const selected: ActiveGoalInfo = {
      id: goal.id || `goal-${Date.now()}`,
      title: goal.title,
      category: goal.category,
      deadline: goal.deadline,
      progress: goal.progress,
      userRole: goal.userRole,
    };
    setActiveGoal(selected);

    if (isMock) {
      const firstColId = columns[0]?.id || 'col-backlog';
      const goalMembers = membersByTitle[goal.title] || defaultMembers;

      const newTasks: BoardTask[] = (goal.subtasks || []).map((st, index) => {
        const priorities: TaskPriority[] = ['Alta', 'Média', 'Baixa'];
        const p = priorities[index % priorities.length];
        const memberSubset = goalMembers.slice(index % 2, (index % 2) + 2);

        return {
          id: `task-${st.id}-${Date.now()}`,
          title: st.title.replace(/;$/, ''),
          description: st.description,
          completed: st.completed,
          priority: p,
          columnId: firstColId,
          goalId: goal.id,
          deadline: goal.deadline ? `${(index + 2) * 5} dias` : undefined,
          attachmentsCount: (index * 2) % 6,
          commentsCount: (index * 3) % 10,
          members: memberSubset,
        };
      });
      setTasks(newTasks);
      return;
    }

    if (goal.id) {
      await loadGoalBoard(goal.id);
    }
  };

  const handleAddColumn = async (title: string, color: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    if (isMock) {
      const newCol: BoardColumn = {
        id: `col-${Date.now()}`,
        title: trimmed,
        color,
      };
      setColumns((prev) => [...prev, newCol]);
      appToast.success('Coluna adicionada com sucesso!');
      return;
    }

    if (!activeGoal?.id) return;

    try {
      const res = await taskBoardApi.createColumn(activeGoal.id, { title: trimmed, color });
      setColumns((prev) => [...prev, mapColumnToDisplay(res)]);
      appToast.success('Coluna adicionada com sucesso!');
    } catch {
      appToast.error('Erro ao adicionar coluna.');
    }
  };

  const handleEditColumn = async (columnId: string, title: string, color: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    if (isMock) {
      setColumns((prev) =>
        prev.map((col) => (col.id === columnId ? { ...col, title: trimmed, color } : col))
      );
      appToast.success('Coluna atualizada com sucesso!');
      return;
    }

    try {
      const res = await taskBoardApi.updateColumn(columnId, { title: trimmed, color });
      setColumns((prev) =>
        prev.map((col) => (col.id === columnId ? mapColumnToDisplay(res) : col))
      );
      appToast.success('Coluna atualizada com sucesso!');
    } catch {
      appToast.error('Erro ao atualizar coluna.');
    }
  };

  const handleDeleteColumn = async (columnId: string) => {
    if (isMock) {
      setColumns((prev) => prev.filter((col) => col.id !== columnId));
      setTasks((prev) => prev.filter((t) => t.columnId !== columnId));
      appToast.success('Coluna excluída com sucesso!');
      return;
    }

    try {
      await taskBoardApi.deleteColumn(columnId);
      setColumns((prev) => prev.filter((col) => col.id !== columnId));
      setTasks((prev) => prev.filter((t) => t.columnId !== columnId));
      appToast.success('Coluna excluída com sucesso!');
    } catch {
      appToast.error('Erro ao excluir coluna.');
    }
  };

  const handleAddTask = async (
    columnId: string,
    title: string,
    description?: string,
    priority: TaskPriority = 'Média'
  ) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    if (isMock) {
      const goalMembers = activeGoal ? (membersByTitle[activeGoal.title] || defaultMembers) : defaultMembers;
      const newTask: BoardTask = {
        id: `task-${Date.now()}`,
        title: trimmed,
        description: description?.trim() || undefined,
        completed: false,
        priority,
        columnId,
        goalId: activeGoal?.id,
        deadline: '7 dias',
        attachmentsCount: 0,
        commentsCount: 0,
        members: goalMembers.slice(0, 1),
      };
      setTasks((prev) => [...prev, newTask]);
      appToast.success('Tarefa criada com sucesso!');
      return;
    }

    if (!activeGoal?.id) return;

    try {
      const created = await taskBoardApi.createTask(activeGoal.id, {
        columnId,
        title: trimmed,
        description: description?.trim() || undefined,
        priority: mapPriorityToApi(priority),
      });
      setTasks((prev) => [...prev, mapTaskToDisplay(created)]);
      appToast.success('Tarefa criada com sucesso!');
    } catch {
      appToast.error('Erro ao criar tarefa.');
    }
  };

  const handleUpdateTask = async (
    taskId: string,
    title: string,
    description?: string,
    priority: TaskPriority = 'Média',
    columnId?: string
  ) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    if (isMock) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId
            ? {
                ...t,
                title: trimmed,
                description: description?.trim() || undefined,
                priority,
                columnId: columnId || t.columnId,
              }
            : t
        )
      );
      appToast.success('Tarefa atualizada com sucesso!');
      return;
    }

    try {
      const updated = await taskBoardApi.updateTask(taskId, {
        title: trimmed,
        description: description?.trim() || undefined,
        priority: mapPriorityToApi(priority),
        columnId,
      });
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? mapTaskToDisplay(updated) : t))
      );
      appToast.success('Tarefa atualizada com sucesso!');
    } catch {
      appToast.error('Erro ao atualizar tarefa.');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (isMock) {
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      appToast.success('Tarefa excluída com sucesso!');
      return;
    }

    try {
      await taskBoardApi.deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      appToast.success('Tarefa excluída com sucesso!');
    } catch {
      appToast.error('Erro ao excluir tarefa.');
    }
  };

  const handleMoveTask = async (taskId: string, targetColumnId: string) => {
    const currentTask = tasks.find((t) => t.id === taskId);
    if (!currentTask || currentTask.columnId === targetColumnId) return;

    const targetColumn = columns.find((c) => c.id === targetColumnId);
    const targetTitle = targetColumn ? targetColumn.title : 'outra coluna';

    const isDoneCol =
      targetColumnId === 'col-done' ||
      targetColumn?.title.toLowerCase().includes('conclu');

    setTasks((prev) => {
      const task = prev.find((t) => t.id === taskId);
      if (!task) return prev;
      const updated = {
        ...task,
        columnId: targetColumnId,
        completed: isDoneCol ? true : task.completed,
      };
      const without = prev.filter((t) => t.id !== taskId);
      return [...without, updated];
    });

    appToast.success(`Tarefa movida para "${targetTitle}"`);

    if (!isMock) {
      try {
        await taskBoardApi.moveTask(taskId, { targetColumnId });
      } catch {
        appToast.error('Erro ao mover tarefa no servidor.');
      }
    }
  };

  const handleToggleTaskComplete = async (taskId: string) => {
    const currentTask = tasks.find((t) => t.id === taskId);
    const willComplete = currentTask ? !currentTask.completed : true;

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const nextCompleted = !t.completed;
        const doneCol = columns.find((c) =>
          c.title.toLowerCase().includes('conclu')
        );
        const todoCol = columns[0];
        let nextColumn = t.columnId;
        if (nextCompleted && doneCol) {
          nextColumn = doneCol.id;
        } else if (!nextCompleted && t.columnId === doneCol?.id && todoCol) {
          nextColumn = todoCol.id;
        }
        return {
          ...t,
          completed: nextCompleted,
          columnId: nextColumn,
        };
      })
    );

    appToast.success(willComplete ? 'Tarefa concluída!' : 'Tarefa reaberta!');

    if (!isMock) {
      try {
        await taskBoardApi.toggleComplete(taskId);
      } catch {
        appToast.error('Erro ao alternar conclusão da tarefa.');
      }
    }
  };

  const handleTaskDragStart = (taskId: string) => {
    setDraggedTaskId(taskId);
  };

  const handleTaskDragEnd = () => {
    setDraggedTaskId(null);
  };

  const handleTaskDropOnTask = (targetTaskId: string, targetColumnId: string) => {
    if (!draggedTaskId || draggedTaskId === targetTaskId) {
      setDraggedTaskId(null);
      return;
    }

    const currentTask = tasks.find((t) => t.id === draggedTaskId);
    const columnChanged = Boolean(currentTask && currentTask.columnId !== targetColumnId);

    const isDoneCol =
      targetColumnId === 'col-done' ||
      columns.find((c) => c.id === targetColumnId)?.title.toLowerCase().includes('conclu');

    setTasks((prev) => {
      const sourceIndex = prev.findIndex((t) => t.id === draggedTaskId);
      const targetIndex = prev.findIndex((t) => t.id === targetTaskId);
      if (sourceIndex === -1 || targetIndex === -1) return prev;

      const sourceTask = {
        ...prev[sourceIndex],
        columnId: targetColumnId,
        completed: isDoneCol ? true : prev[sourceIndex].completed,
      };

      const next = [...prev];
      next.splice(sourceIndex, 1);
      const newTargetIndex = next.findIndex((t) => t.id === targetTaskId);
      next.splice(newTargetIndex, 0, sourceTask);
      return next;
    });

    const taskId = draggedTaskId;
    setDraggedTaskId(null);

    if (!isMock && columnChanged) {
      taskBoardApi.moveTask(taskId, { targetColumnId }).catch(() => {});
    }
  };

  const handleTaskDropOnColumn = (targetColumnId: string) => {
    if (draggedTaskId) {
      const taskId = draggedTaskId;
      setDraggedTaskId(null);
      handleMoveTask(taskId, targetColumnId);
    }
  };

  const handleReorderColumns = (newColumns: BoardColumn[]) => {
    setColumns(newColumns);
  };

  const handleColumnDragEnd = () => {
    if (!isMock && activeGoal) {
      const currentCols = columnsRef.current;
      const currentOrder = currentCols.map((c) => c.id).join(',');
      const hasMockIds = currentCols.some((c) => c.id.startsWith('col-'));
      if (!hasMockIds && currentOrder && currentOrder !== lastSavedColumnsOrderRef.current) {
        lastSavedColumnsOrderRef.current = currentOrder;
        const orderedIds = currentCols.map((c) => c.id);
        taskBoardApi
          .reorderColumns(activeGoal.id, orderedIds)
          .then(() => {
            appToast.success('Ordem das colunas salva com sucesso!');
          })
          .catch(() => {
            appToast.error('Erro ao salvar a ordem das colunas.');
          });
      }
    }
  };

  const filteredTasks = useMemo(() => {
    let result = tasks;
    if (searchFilter.trim()) {
      const lower = searchFilter.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(lower) ||
          (t.description && t.description.toLowerCase().includes(lower))
      );
    }
    if (priorityFilter !== 'all') {
      result = result.filter((t) => t.priority === priorityFilter);
    }
    return result;
  }, [tasks, searchFilter, priorityFilter]);

  const tasksByColumn = useMemo(() => {
    const map: Record<string, BoardTask[]> = {};
    columns.forEach((col) => {
      map[col.id] = [];
    });
    filteredTasks.forEach((t) => {
      if (map[t.columnId]) {
        map[t.columnId].push(t);
      } else if (columns[0]) {
        map[columns[0].id].push(t);
      }
    });
    return map;
  }, [columns, filteredTasks]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, progress };
  }, [tasks]);

  return {
    availableGoals,
    activeGoal,
    columns,
    tasks,
    isLoading,
    errorMessage,
    filteredTasks,
    tasksByColumn,
    searchFilter,
    setSearchFilter,
    priorityFilter,
    setPriorityFilter,
    draggedTaskId,
    stats,
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
    handleReorderColumns,
    handleColumnDragEnd,
  };
};
