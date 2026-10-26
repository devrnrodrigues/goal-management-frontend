import { useState, useMemo, useEffect, useCallback } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  getDate,
} from 'date-fns';
import type {
  CalendarTask,
  CalendarDayInfo,
  CalendarTaskAuthor,
  CalendarTaskStatus,
  CalendarTaskPriority,
} from './types';
import { useDevMode } from '../shared';
import { goalsApi } from '../my-goals/api/goalsApi';
import { taskBoardApi } from '../task-board/api/taskBoardApi';
import { mapPriorityToDisplay } from '../task-board/api/taskBoardMappers';

const AUTHOR_RENAN: CalendarTaskAuthor = {
  id: 'u-1',
  name: 'Renan Rodrigues',
  initials: 'RR',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
};

const AUTHOR_CAMILA: CalendarTaskAuthor = {
  id: 'u-2',
  name: 'Camila Santos',
  initials: 'CS',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
};

const AUTHOR_LUCAS: CalendarTaskAuthor = {
  id: 'u-3',
  name: 'Lucas Mendes',
  initials: 'LM',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
};

const buildMockTasks = (referenceDate: Date): CalendarTask[] => {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();

  const makeDateKey = (day: number) => {
    return format(new Date(year, month, day), 'yyyy-MM-dd');
  };

  return [
    {
      id: 'cal-task-1',
      title: 'Implementar autenticação JWT e Refresh Token',
      createdAt: makeDateKey(18),
      formattedDate: '18/10 às 09:30',
      goalTitle: 'Certificação Cloud Architecture',
      priority: 'Alta',
      status: 'in_progress',
      author: AUTHOR_RENAN,
      columnName: 'Em Progresso',
    },
    {
      id: 'cal-task-2',
      title: 'Adicionar testes de integração para gateway',
      createdAt: makeDateKey(18),
      formattedDate: '18/10 às 14:15',
      goalTitle: 'Reserva de Emergência 12 Meses',
      priority: 'Alta',
      status: 'pending',
      author: AUTHOR_RENAN,
      columnName: 'A Fazer',
    },
    {
      id: 'cal-task-3',
      title: 'Configurar pipeline de CI/CD no GitHub Actions',
      createdAt: makeDateKey(18),
      formattedDate: '18/10 às 16:45',
      goalTitle: 'Certificação Cloud Architecture',
      priority: 'Média',
      status: 'completed',
      author: AUTHOR_RENAN,
      columnName: 'Concluído',
    },
    {
      id: 'cal-task-4',
      title: 'Mapeamento de endpoints REST para GraphQL',
      createdAt: makeDateKey(17),
      formattedDate: '17/10 às 10:20',
      goalTitle: 'Certificação Cloud Architecture',
      priority: 'Média',
      status: 'in_progress',
      author: AUTHOR_RENAN,
      columnName: 'Em Progresso',
    },
    {
      id: 'cal-task-5',
      title: 'Construir componente de timeline minimalista',
      createdAt: makeDateKey(17),
      formattedDate: '17/10 às 15:00',
      goalTitle: 'Certificação Cloud Architecture',
      priority: 'Baixa',
      status: 'pending',
      author: AUTHOR_LUCAS,
      columnName: 'A Fazer',
    },
    {
      id: 'cal-task-6',
      title: 'Definir métricas de sucesso da meta',
      createdAt: makeDateKey(15),
      formattedDate: '15/10 às 11:30',
      goalTitle: 'Fluência em Inglês Técnico',
      priority: 'Alta',
      status: 'completed',
      author: AUTHOR_CAMILA,
      columnName: 'Concluído',
    },
    {
      id: 'cal-task-7',
      title: 'Pesquisa com usuários sobre experiência',
      createdAt: makeDateKey(15),
      formattedDate: '15/10 às 16:00',
      goalTitle: 'Fluência em Inglês Técnico',
      priority: 'Média',
      status: 'completed',
      author: AUTHOR_CAMILA,
      columnName: 'Concluído',
    },
    {
      id: 'cal-task-8',
      title: 'Migração de banco legado MySQL 5.7',
      createdAt: makeDateKey(12),
      formattedDate: '12/10 às 14:00',
      goalTitle: 'Certificação Cloud Architecture',
      priority: 'Alta',
      status: 'completed',
      author: AUTHOR_RENAN,
      columnName: 'Concluído',
    },
    {
      id: 'cal-task-9',
      title: 'Criar documentação técnica da API',
      createdAt: makeDateKey(22),
      formattedDate: '22/10 às 10:00',
      goalTitle: 'Certificação Cloud Architecture',
      priority: 'Baixa',
      status: 'pending',
      author: AUTHOR_LUCAS,
      columnName: 'A Fazer',
    },
    {
      id: 'cal-task-10',
      title: 'Auditoria de segurança e permissões IAM',
      createdAt: makeDateKey(25),
      formattedDate: '25/10 às 16:30',
      goalTitle: 'Certificação Cloud Architecture',
      priority: 'Média',
      status: 'pending',
      author: AUTHOR_CAMILA,
      columnName: 'A Fazer',
    },
    {
      id: 'cal-task-11',
      title: 'Planejamento de investimentos do 4º trimestre',
      createdAt: makeDateKey(8),
      formattedDate: '08/10 às 11:00',
      goalTitle: 'Reserva de Emergência 12 Meses',
      priority: 'Média',
      status: 'completed',
      author: AUTHOR_RENAN,
      columnName: 'Concluído',
    },
    {
      id: 'cal-task-12',
      title: 'Sessão de conversação em inglês com nativos',
      createdAt: makeDateKey(5),
      formattedDate: '05/10 às 18:00',
      goalTitle: 'Fluência em Inglês Técnico',
      priority: 'Média',
      status: 'completed',
      author: AUTHOR_RENAN,
      columnName: 'Concluído',
    },
  ];
};

const getInitials = (name?: string): string => {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return parts[0].slice(0, 2).toUpperCase();
};

export const useCalendar = () => {
  const { isMock } = useDevMode();
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [realTasks, setRealTasks] = useState<CalendarTask[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(!isMock);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadRealCalendarTasks = useCallback(async () => {
    if (isMock) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const goalsResponse = await goalsApi.listGoals(0, 50);
      const goals = goalsResponse.content;

      const tasksPromises = goals.map(async (goal) => {
        try {
          const taskList = await taskBoardApi.listTasks(goal.id);
          return taskList.map((t): CalendarTask => {
            const dateKey = t.deadline || (t.createdAt ? t.createdAt.slice(0, 10) : format(new Date(), 'yyyy-MM-dd'));
            const dateParts = dateKey.split('-');
            const formattedDate = dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}` : dateKey;

            const priority: CalendarTaskPriority = mapPriorityToDisplay(t.priority);
            const status: CalendarTaskStatus = t.completed
              ? 'completed'
              : t.columnTitle?.toLowerCase().includes('progresso')
              ? 'in_progress'
              : 'pending';

            const firstMember = t.members?.[0];
            const author: CalendarTaskAuthor = {
              id: firstMember?.userId || 'u-user',
              name: firstMember?.name || 'Membro',
              avatarUrl: firstMember?.avatarUrl,
              initials: getInitials(firstMember?.name),
            };

            return {
              id: t.id,
              title: t.title,
              createdAt: dateKey,
              formattedDate,
              goalTitle: goal.title,
              priority,
              status,
              author,
              columnName: t.columnTitle || 'A Fazer',
            };
          });
        } catch {
          return [];
        }
      });

      const results = await Promise.all(tasksPromises);
      setRealTasks(results.flat());
    } catch {
      setErrorMessage('Não foi possível carregar as entregas no calendário.');
    } finally {
      setIsLoading(false);
    }
  }, [isMock]);

  useEffect(() => {
    loadRealCalendarTasks();
  }, [loadRealCalendarTasks]);

  const activeTasks = useMemo(() => {
    if (isMock) {
      return buildMockTasks(currentMonthDate);
    }
    return realTasks;
  }, [isMock, currentMonthDate, realTasks]);

  const tasksByDateKey = useMemo(() => {
    const map = new Map<string, CalendarTask[]>();

    activeTasks.forEach((task) => {
      const existing = map.get(task.createdAt) || [];
      existing.push(task);
      map.set(task.createdAt, existing);
    });

    return map;
  }, [activeTasks]);

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonthDate);
    const monthEnd = endOfMonth(currentMonthDate);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const intervalDays = eachDayOfInterval({ start: startDate, end: endDate });
    const today = new Date();

    return intervalDays.map((date): CalendarDayInfo => {
      const dateKey = format(date, 'yyyy-MM-dd');
      const tasks = tasksByDateKey.get(dateKey) || [];

      return {
        date,
        dateKey,
        dayNumber: getDate(date),
        isCurrentMonth: isSameMonth(date, currentMonthDate),
        isToday: isSameDay(date, today),
        isSelected: isSameDay(date, selectedDate),
        tasks,
      };
    });
  }, [currentMonthDate, selectedDate, tasksByDateKey]);

  const handlePrevMonth = () => {
    setCurrentMonthDate((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate((prev) => addMonths(prev, 1));
  };

  const handleToday = () => {
    const now = new Date();
    setCurrentMonthDate(now);
    setSelectedDate(now);
  };

  const handleSelectDay = (date: Date) => {
    setSelectedDate(date);
    if (!isSameMonth(date, currentMonthDate)) {
      setCurrentMonthDate(date);
    }
  };

  return {
    currentMonthDate,
    selectedDate,
    calendarDays,
    isLoading,
    errorMessage,
    handlePrevMonth,
    handleNextMonth,
    handleToday,
    handleSelectDay,
  };
};
