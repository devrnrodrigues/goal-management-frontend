import { useState, useEffect, useCallback } from 'react';
import {
  Target,
  TrendingUp,
  AlertTriangle,
  ListTodo,
  Flame,
  Trophy,
} from 'lucide-react';
import type {
  DashboardMetric,
  FocusGoal,
  MonthlyGoalData,
  CalendarDeadline,
  DashboardOverviewApiResponse,
} from '../types/dashboard.types';
import { dashboardApi } from '../api/dashboardApi';
import { useDevMode } from '../../shared/hooks/useDevMode';

const MOCK_FOCUS_GOALS: FocusGoal[] = [
  {
    id: 'g-1',
    title: 'Certificação Cloud Architecture',
    category: 'Engenharia de Software',
    progress: 68,
    deadline: '15/12/2026',
    currentStep: 'Simulado prático de alta disponibilidade',
    priority: 'Alta',
  },
  {
    id: 'g-2',
    title: 'Reserva de Emergência 12 Meses',
    category: 'Finanças Pessoais',
    progress: 82,
    deadline: '30/11/2026',
    currentStep: 'Aporte de 15% na renda fixa',
    priority: 'Alta',
  },
  {
    id: 'g-3',
    title: 'Fluência em Inglês Técnico',
    category: 'Comunicação',
    progress: 45,
    deadline: '20/01/2027',
    currentStep: 'Conversação semanal com nativos',
    priority: 'Média',
  },
];

const MOCK_METRICS: DashboardMetric[] = [
  {
    id: 'm-1',
    title: 'Metas ativas',
    value: 12,
    subtitle: '+2 adicionadas este mês',
    icon: Target,
    variant: 'primary',
  },
  {
    id: 'm-2',
    title: 'Taxa de sucesso',
    value: '84%',
    subtitle: '+12% vs. mês anterior',
    icon: TrendingUp,
    variant: 'success',
  },
  {
    id: 'm-3',
    title: 'Ações de hoje',
    value: '6/8',
    subtitle: '75% concluídas hoje',
    icon: ListTodo,
    variant: 'info',
  },
  {
    id: 'm-4',
    title: 'Metas em atenção',
    value: 2,
    subtitle: 'Prazos nos próximos 7 dias',
    icon: AlertTriangle,
    variant: 'warning',
  },
  {
    id: 'm-5',
    title: 'Sequência (Streak)',
    value: '15 dias',
    subtitle: 'Recorde: 21 dias seguidos',
    icon: Flame,
    variant: 'primary',
  },
  {
    id: 'm-6',
    title: 'Metas concluídas',
    value: 28,
    subtitle: '+5 no último trimestre',
    icon: Trophy,
    variant: 'success',
  },
];

const MOCK_MONTHLY_DATA: MonthlyGoalData[] = [
  { month: 'Jan', planned: 8, completed: 7 },
  { month: 'Fev', planned: 5, completed: 6 },
  { month: 'Mar', planned: 11, completed: 13 },
  { month: 'Abr', planned: 7, completed: 9 },
  { month: 'Mai', planned: 9, completed: 11 },
  { month: 'Jun', planned: 6, completed: 8 },
  { month: 'Jul', planned: 14, completed: 17 },
  { month: 'Ago', planned: 6, completed: 6 },
  { month: 'Set', planned: 13, completed: 14 },
  { month: 'Out', planned: 10, completed: 11 },
  { month: 'Nov', planned: 9, completed: 8 },
  { month: 'Dez', planned: 7, completed: 6 },
];

const MOCK_DEADLINES: CalendarDeadline[] = [
  {
    id: 'cd-1',
    day: 15,
    month: 10,
    year: 2026,
    title: 'Entrega do Módulo Frontend',
    category: 'Engenharia de Software',
  },
  {
    id: 'cd-2',
    day: 20,
    month: 10,
    year: 2026,
    title: 'Revisão do Orçamento Q4',
    category: 'Finanças',
  },
  {
    id: 'cd-3',
    day: 28,
    month: 10,
    year: 2026,
    title: 'Checkpoint de Saúde & Corrida',
    category: 'Saúde',
  },
];

const formatIsoDateToBr = (isoDate: string | null): string => {
  if (!isoDate) return 'Sem prazo';
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

export const useDashboardData = () => {
  const { isMock } = useDevMode();
  const [currentGoalIndex, setCurrentGoalIndex] = useState(0);
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(() => new Date().getDate());
  const [isLoading, setIsLoading] = useState(!isMock);

  const [metrics, setMetrics] = useState<DashboardMetric[]>(isMock ? MOCK_METRICS : []);
  const [focusGoals, setFocusGoals] = useState<FocusGoal[]>(isMock ? MOCK_FOCUS_GOALS : []);
  const [monthlyData, setMonthlyData] = useState<MonthlyGoalData[]>(isMock ? MOCK_MONTHLY_DATA : []);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState<CalendarDeadline[]>(isMock ? MOCK_DEADLINES : []);

  const mapApiResponseToState = (data: DashboardOverviewApiResponse) => {
    const { metrics: m, focusGoals: fg, monthlyEvolution: me, upcomingDeadlines: ud } = data;

    const mappedMetrics: DashboardMetric[] = [
      {
        id: 'm-1',
        title: 'Metas ativas',
        value: m.activeGoals.total,
        subtitle: `+${m.activeGoals.addedThisMonth} adicionadas este mês`,
        icon: Target,
        variant: 'primary',
      },
      {
        id: 'm-2',
        title: 'Taxa de sucesso',
        value: `${m.successRate.currentRate}%`,
        subtitle: `${m.successRate.differenceFromLastMonth >= 0 ? '+' : ''}${m.successRate.differenceFromLastMonth}% vs. mês anterior`,
        icon: TrendingUp,
        variant: 'success',
      },
      {
        id: 'm-3',
        title: 'Ações de hoje',
        value: `${m.todayActions.completed}/${m.todayActions.total}`,
        subtitle: `${m.todayActions.total > 0 ? Math.round((m.todayActions.completed / m.todayActions.total) * 100) : 100}% concluídas hoje`,
        icon: ListTodo,
        variant: 'info',
      },
      {
        id: 'm-4',
        title: 'Metas em atenção',
        value: m.attentionGoals.total,
        subtitle: `${m.attentionGoals.dueNext7Days} prazos nos próximos 7 dias`,
        icon: AlertTriangle,
        variant: 'warning',
      },
      {
        id: 'm-5',
        title: 'Sequência (Streak)',
        value: `${m.streak.currentStreak} dias`,
        subtitle: `Recorde: ${m.streak.longestStreak} dias seguidos`,
        icon: Flame,
        variant: 'primary',
      },
      {
        id: 'm-6',
        title: 'Metas concluídas',
        value: m.completedGoals.total,
        subtitle: `+${m.completedGoals.completedThisQuarter} no último trimestre`,
        icon: Trophy,
        variant: 'success',
      },
    ];

    const mappedFocusGoals: FocusGoal[] = fg.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      progress: item.progress,
      deadline: formatIsoDateToBr(item.deadline),
      currentStep: item.currentStep,
      priority: item.priority === 'URGENT' || item.priority === 'HIGH' ? 'Alta' : 'Média',
    }));

    const mappedDeadlines: CalendarDeadline[] = ud.map((item) => ({
      id: item.id,
      day: item.day,
      month: item.month,
      year: item.year,
      title: item.title,
      category: item.category,
      priority: item.priority,
    }));

    setMetrics(mappedMetrics);
    setFocusGoals(mappedFocusGoals);
    setMonthlyData(me);
    setUpcomingDeadlines(mappedDeadlines);
  };

  const loadData = useCallback(async () => {
    if (isMock) {
      setMetrics(MOCK_METRICS);
      setFocusGoals(MOCK_FOCUS_GOALS);
      setMonthlyData(MOCK_MONTHLY_DATA);
      setUpcomingDeadlines(MOCK_DEADLINES);
      return;
    }

    setIsLoading(true);
    try {
      const response = await dashboardApi.getOverview();
      mapApiResponseToState(response);
    } catch {
      setMetrics([]);
      setFocusGoals([]);
      setMonthlyData([]);
      setUpcomingDeadlines([]);
    } finally {
      setIsLoading(false);
    }
  }, [isMock]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handlePrevGoal = () => {
    if (focusGoals.length <= 1) return;
    setCurrentGoalIndex((prev) =>
      prev === 0 ? focusGoals.length - 1 : prev - 1
    );
  };

  const handleNextGoal = () => {
    if (focusGoals.length <= 1) return;
    setCurrentGoalIndex((prev) =>
      prev === focusGoals.length - 1 ? 0 : prev + 1
    );
  };

  const handleSelectDay = (day: number) => {
    setSelectedCalendarDay(day);
  };

  const currentFocusGoal = focusGoals[currentGoalIndex] ?? null;

  return {
    metrics,
    currentFocusGoal,
    focusGoalsTotal: focusGoals.length,
    currentGoalIndex,
    monthlyData,
    upcomingDeadlines,
    selectedCalendarDay,
    isLoading,
    refetch: loadData,
    handlePrevGoal,
    handleNextGoal,
    handleSelectDay,
  };
};
