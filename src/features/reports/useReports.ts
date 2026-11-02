import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type {
  ReportPeriod,
  ReportFiltersState,
  ReportOverviewMetric,
  MonthlyVelocityItem,
  CategoryDistributionItem,
  PriorityEfficiencyItem,
  GoalHealthReportItem,
  ReportApiResponse,
} from './types';
import { reportsApi } from './api/reportsApi';
import { useDevMode } from '../shared/hooks/useDevMode';

const INITIAL_FILTERS: ReportFiltersState = {
  period: '30_days',
  selectedCategory: 'all',
};

const DEFAULT_METRICS: ReportOverviewMetric[] = [
  {
    id: 'm-1',
    label: 'Taxa de conclusão',
    value: '78%',
    change: '+6.2%',
    isPositive: true,
    subtitle: 'vs. mês anterior',
  },
  {
    id: 'm-2',
    label: 'Tempo médio de ciclo',
    value: '4.2 dias',
    change: '-0.8 dias',
    isPositive: true,
    subtitle: 'agilidade na entrega',
  },
  {
    id: 'm-3',
    label: 'Metas no prazo',
    value: '91%',
    change: '+3.4%',
    isPositive: true,
    subtitle: 'aderência ao cronograma',
  },
  {
    id: 'm-4',
    label: 'Tarefas entregues',
    value: '38',
    change: '+14%',
    isPositive: true,
    subtitle: 'neste ciclo',
  },
];

const DEFAULT_VELOCITY: MonthlyVelocityItem[] = [
  { id: 'v-1', monthLabel: 'Jun', completedTasks: 22, createdTasks: 26 },
  { id: 'v-2', monthLabel: 'Jul', completedTasks: 28, createdTasks: 31 },
  { id: 'v-3', monthLabel: 'Ago', completedTasks: 34, createdTasks: 30 },
  { id: 'v-4', monthLabel: 'Set', completedTasks: 36, createdTasks: 32 },
  { id: 'v-5', monthLabel: 'Out', completedTasks: 38, createdTasks: 28 },
];

const DEFAULT_CATEGORIES: CategoryDistributionItem[] = [
  {
    id: 'cat-1',
    category: 'Engenharia de Software',
    goalsCount: 5,
    percentage: 45,
    color: '#006d44',
  },
  {
    id: 'cat-2',
    category: 'Finanças Pessoais',
    goalsCount: 3,
    percentage: 30,
    color: '#3b82f6',
  },
  {
    id: 'cat-3',
    category: 'Comunicação e Idiomas',
    goalsCount: 2,
    percentage: 15,
    color: '#f59e0b',
  },
  {
    id: 'cat-4',
    category: 'Produtividade e Hábitos',
    goalsCount: 1,
    percentage: 10,
    color: '#8b5cf6',
  },
];

const DEFAULT_PRIORITIES: PriorityEfficiencyItem[] = [
  {
    priority: 'HIGH',
    label: 'Alta',
    completedTasks: 18,
    activeTasks: 3,
    onTimePercentage: 94,
  },
  {
    priority: 'MEDIUM',
    label: 'Média',
    completedTasks: 12,
    activeTasks: 2,
    onTimePercentage: 91,
  },
  {
    priority: 'LOW',
    label: 'Baixa',
    completedTasks: 8,
    activeTasks: 4,
    onTimePercentage: 88,
  },
];

const DEFAULT_GOALS_HEALTH: GoalHealthReportItem[] = [
  {
    id: 'gh-1',
    goalTitle: 'Certificação Cloud Architecture',
    category: 'Engenharia de Software',
    progress: 82,
    completedTasks: 14,
    totalTasks: 17,
    deadline: '15/12/2026',
    healthStatus: 'on_track',
  },
  {
    id: 'gh-2',
    goalTitle: 'Reserva de Emergência 12 Meses',
    category: 'Finanças Pessoais',
    progress: 82,
    completedTasks: 9,
    totalTasks: 11,
    deadline: '30/11/2026',
    healthStatus: 'on_track',
  },
  {
    id: 'gh-3',
    goalTitle: 'Fluência em Inglês Técnico',
    category: 'Comunicação e Idiomas',
    progress: 45,
    completedTasks: 5,
    totalTasks: 11,
    deadline: '20/01/2027',
    healthStatus: 'at_risk',
  },
  {
    id: 'gh-4',
    goalTitle: 'Infraestrutura Kubernetes em Alta Disponibilidade',
    category: 'Engenharia de Software',
    progress: 100,
    completedTasks: 12,
    totalTasks: 12,
    deadline: '10/10/2026',
    healthStatus: 'completed',
  },
];

const mapReportResponseToData = (data: ReportApiResponse) => {
  const mappedGoalsHealth: GoalHealthReportItem[] = data.goalsHealth.map((g) => ({
    id: g.id,
    goalTitle: g.goalTitle,
    category: g.category,
    progress: g.progress,
    completedTasks: g.completedTasks,
    totalTasks: g.totalTasks,
    deadline: g.deadline,
    healthStatus: (g.healthStatus === 'delayed'
      ? 'delayed'
      : g.healthStatus === 'at_risk'
      ? 'at_risk'
      : g.progress >= 100
      ? 'completed'
      : 'on_track') as GoalHealthReportItem['healthStatus'],
  }));

  return {
    metrics: data.metrics,
    velocityData: data.velocityData,
    categoryDistribution: data.categoryDistribution,
    priorityEfficiencies: data.priorityEfficiencies,
    goalsHealth: mappedGoalsHealth,
    availableCategories: data.availableCategories,
  };
};

export const useReports = () => {
  const { isMock } = useDevMode();
  const [filters, setFilters] = useState<ReportFiltersState>(INITIAL_FILTERS);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['reports', 'overview', filters.period, filters.selectedCategory, isMock],
    queryFn: async () => {
      if (isMock) {
        return {
          metrics: DEFAULT_METRICS,
          velocityData: DEFAULT_VELOCITY,
          categoryDistribution: DEFAULT_CATEGORIES,
          priorityEfficiencies: DEFAULT_PRIORITIES,
          goalsHealth: DEFAULT_GOALS_HEALTH,
          availableCategories: DEFAULT_CATEGORIES.map((c) => c.category),
        };
      }
      try {
        const response = await reportsApi.getReport(filters.period, filters.selectedCategory);
        return mapReportResponseToData(response);
      } catch {
        return {
          metrics: [],
          velocityData: [],
          categoryDistribution: [],
          priorityEfficiencies: [],
          goalsHealth: [],
          availableCategories: [],
        };
      }
    },
  });

  const metrics = data?.metrics ?? (isMock ? DEFAULT_METRICS : []);
  const velocityData = data?.velocityData ?? (isMock ? DEFAULT_VELOCITY : []);
  const categoryDistribution = data?.categoryDistribution ?? (isMock ? DEFAULT_CATEGORIES : []);
  const priorityEfficiencies = data?.priorityEfficiencies ?? (isMock ? DEFAULT_PRIORITIES : []);
  const goalsHealth = data?.goalsHealth ?? (isMock ? DEFAULT_GOALS_HEALTH : []);
  const availableCategories = data?.availableCategories ?? (isMock ? DEFAULT_CATEGORIES.map((c) => c.category) : []);

  const handlePeriodChange = (period: ReportPeriod) => {
    setFilters((prev) => ({ ...prev, period }));
  };

  const handleCategoryChange = (selectedCategory: string) => {
    setFilters((prev) => ({ ...prev, selectedCategory }));
  };

  const handleExport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Meta,Categoria,Progresso,Tarefas Concluidas,Total Tarefas,Prazo,Status\n' +
      goalsHealth
        .map(
          (g) =>
            `"${g.goalTitle}","${g.category}",${g.progress}%,${g.completedTasks},${g.totalTasks},"${g.deadline}","${g.healthStatus}"`
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `relatorio_metas_${filters.period}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    filters,
    metrics,
    velocityData,
    categoryDistribution,
    priorityEfficiencies,
    goalsHealth,
    availableCategories,
    isLoading,
    refetch,
    handlePeriodChange,
    handleCategoryChange,
    handleExport,
  };
};
