import { useState, useMemo } from 'react';
import type {
  ReportPeriod,
  ReportFiltersState,
  ReportOverviewMetric,
  MonthlyVelocityItem,
  CategoryDistributionItem,
  TeamMemberReport,
  GoalHealthReportItem,
} from './types';

const INITIAL_FILTERS: ReportFiltersState = {
  period: '30_days',
  selectedCategory: 'all',
};

const METRICS_BY_PERIOD: Record<ReportPeriod, ReportOverviewMetric[]> = {
  '30_days': [
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
  ],
  quarter: [
    {
      id: 'm-1',
      label: 'Taxa de conclusão',
      value: '72%',
      change: '+4.5%',
      isPositive: true,
      subtitle: 'vs. trimestre anterior',
    },
    {
      id: 'm-2',
      label: 'Tempo médio de ciclo',
      value: '4.8 dias',
      change: '-0.3 dias',
      isPositive: true,
      subtitle: 'tempo por tarefa',
    },
    {
      id: 'm-3',
      label: 'Metas no prazo',
      value: '88%',
      change: '+2.1%',
      isPositive: true,
      subtitle: 'entregas trimestrais',
    },
    {
      id: 'm-4',
      label: 'Tarefas entregues',
      value: '112',
      change: '+18%',
      isPositive: true,
      subtitle: 'no trimestre',
    },
  ],
  year: [
    {
      id: 'm-1',
      label: 'Taxa de conclusão',
      value: '81%',
      change: '+12.0%',
      isPositive: true,
      subtitle: 'evolução anual acumulada',
    },
    {
      id: 'm-2',
      label: 'Tempo médio de ciclo',
      value: '4.5 dias',
      change: '-1.2 dias',
      isPositive: true,
      subtitle: 'média do ano',
    },
    {
      id: 'm-3',
      label: 'Metas no prazo',
      value: '89%',
      change: '+5.0%',
      isPositive: true,
      subtitle: 'média histórica',
    },
    {
      id: 'm-4',
      label: 'Tarefas entregues',
      value: '346',
      change: '+24%',
      isPositive: true,
      subtitle: 'total no ano',
    },
  ],
};

const VELOCITY_DATA: MonthlyVelocityItem[] = [
  { id: 'v-1', monthLabel: 'Jun', completedTasks: 22, createdTasks: 26 },
  { id: 'v-2', monthLabel: 'Jul', completedTasks: 28, createdTasks: 31 },
  { id: 'v-3', monthLabel: 'Ago', completedTasks: 34, createdTasks: 30 },
  { id: 'v-4', monthLabel: 'Set', completedTasks: 36, createdTasks: 32 },
  { id: 'v-5', monthLabel: 'Out', completedTasks: 38, createdTasks: 28 },
];

const CATEGORY_DISTRIBUTION: CategoryDistributionItem[] = [
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

const TEAM_MEMBERS: TeamMemberReport[] = [
  {
    id: 'tm-1',
    name: 'Renan Rodrigues',
    role: 'Tech Lead',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    initials: 'RR',
    completedTasks: 18,
    activeTasks: 3,
    onTimePercentage: 94,
  },
  {
    id: 'tm-2',
    name: 'Camila Santos',
    role: 'Product Designer',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    initials: 'CS',
    completedTasks: 12,
    activeTasks: 2,
    onTimePercentage: 91,
  },
  {
    id: 'tm-3',
    name: 'Lucas Mendes',
    role: 'Frontend Engineer',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    initials: 'LM',
    completedTasks: 8,
    activeTasks: 4,
    onTimePercentage: 88,
  },
];

const GOALS_HEALTH: GoalHealthReportItem[] = [
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
    healthStatus: 'attention',
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

export const useReports = () => {
  const [filters, setFilters] = useState<ReportFiltersState>(INITIAL_FILTERS);

  const metrics = useMemo(() => {
    return METRICS_BY_PERIOD[filters.period];
  }, [filters.period]);

  const availableCategories = useMemo(() => {
    return CATEGORY_DISTRIBUTION.map((item) => item.category);
  }, []);

  const filteredGoalsHealth = useMemo(() => {
    if (filters.selectedCategory === 'all') {
      return GOALS_HEALTH;
    }
    return GOALS_HEALTH.filter((item) => item.category === filters.selectedCategory);
  }, [filters.selectedCategory]);

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
      filteredGoalsHealth
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
    velocityData: VELOCITY_DATA,
    categoryDistribution: CATEGORY_DISTRIBUTION,
    teamMembers: TEAM_MEMBERS,
    goalsHealth: filteredGoalsHealth,
    availableCategories,
    handlePeriodChange,
    handleCategoryChange,
    handleExport,
  };
};
