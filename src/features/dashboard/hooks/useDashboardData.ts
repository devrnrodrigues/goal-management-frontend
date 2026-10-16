import { useState } from 'react';
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
} from '../types/dashboard.types';

export const useDashboardData = () => {
  const [currentGoalIndex, setCurrentGoalIndex] = useState(0);
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(15);

  const focusGoals: FocusGoal[] = [
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

  const metrics: DashboardMetric[] = [
    {
      id: 'm-1',
      title: 'Metas Ativas',
      value: 12,
      subtitle: '+2 adicionadas este mês',
      icon: Target,
      variant: 'primary',
    },
    {
      id: 'm-2',
      title: 'Taxa de Sucesso',
      value: '84%',
      subtitle: '+12% vs. mês anterior',
      icon: TrendingUp,
      variant: 'success',
    },
    {
      id: 'm-3',
      title: 'Ações de Hoje',
      value: '6/8',
      subtitle: '75% concluídas hoje',
      icon: ListTodo,
      variant: 'info',
    },
    {
      id: 'm-4',
      title: 'Metas em Atenção',
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
      title: 'Metas Concluídas',
      value: 28,
      subtitle: '+5 no último trimestre',
      icon: Trophy,
      variant: 'success',
    },
  ];

  const monthlyData: MonthlyGoalData[] = [
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

  const upcomingDeadlines: CalendarDeadline[] = [
    {
      day: 15,
      month: 10,
      year: 2026,
      title: 'Entrega do Módulo Frontend',
      category: 'Engenharia de Software',
    },
    {
      day: 20,
      month: 10,
      year: 2026,
      title: 'Revisão do Orçamento Q4',
      category: 'Finanças',
    },
    {
      day: 28,
      month: 10,
      year: 2026,
      title: 'Checkpoint de Saúde & Corrida',
      category: 'Saúde',
    },
  ];

  const handlePrevGoal = () => {
    setCurrentGoalIndex((prev) =>
      prev === 0 ? focusGoals.length - 1 : prev - 1
    );
  };

  const handleNextGoal = () => {
    setCurrentGoalIndex((prev) =>
      prev === focusGoals.length - 1 ? 0 : prev + 1
    );
  };

  const handleSelectDay = (day: number) => {
    setSelectedCalendarDay(day);
  };

  const currentFocusGoal = focusGoals[currentGoalIndex];

  return {
    metrics,
    currentFocusGoal,
    focusGoalsTotal: focusGoals.length,
    currentGoalIndex,
    monthlyData,
    upcomingDeadlines,
    selectedCalendarDay,
    handlePrevGoal,
    handleNextGoal,
    handleSelectDay,
  };
};
