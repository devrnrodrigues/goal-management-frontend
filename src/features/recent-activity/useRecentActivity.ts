import { useState, useMemo } from 'react';
import type {
  ActivityItem,
  ActivityFiltersState,
  ActivityCategory,
  DateGroupLabel,
  GoalFilterOption,
} from './types';

const AUTHOR_RENAN = {
  id: 'u-1',
  name: 'Renan Rodrigues',
  initials: 'RR',
  role: 'Tech Lead',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
};

const AUTHOR_CAMILA = {
  id: 'u-2',
  name: 'Camila Santos',
  initials: 'CS',
  role: 'Product Designer',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
};

const AUTHOR_LUCAS = {
  id: 'u-3',
  name: 'Lucas Mendes',
  initials: 'LM',
  role: 'Frontend Engineer',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
};

const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    actionType: 'task_moved',
    author: AUTHOR_RENAN,
    title: 'Implementar autenticação JWT e Refresh Token',
    goalTitle: 'Certificação Cloud Architecture',
    timestamp: 'Há 12 minutos',
    dateGroup: 'Hoje',
    metadata: {
      fromColumn: 'A Fazer',
      toColumn: 'Em Progresso',
    },
    changes: [
      {
        id: 'c-1',
        label: 'Coluna',
        from: 'A Fazer',
        to: 'Em Progresso',
      },
    ],
  },
  {
    id: 'act-2',
    actionType: 'task_completed',
    author: AUTHOR_RENAN,
    title: 'Configurar pipeline de CI/CD no GitHub Actions',
    goalTitle: 'Certificação Cloud Architecture',
    timestamp: 'Há 45 minutos',
    dateGroup: 'Hoje',
    metadata: {
      fromColumn: 'Em Revisão',
      toColumn: 'Concluído',
    },
    changes: [
      {
        id: 'c-2',
        label: 'Status',
        from: 'Pendente',
        to: 'Finalizado (100%)',
      },
    ],
  },
  {
    id: 'act-3',
    actionType: 'task_created',
    author: AUTHOR_RENAN,
    title: 'Adicionar testes de integração para o gateway de pagamentos',
    goalTitle: 'Reserva de Emergência 12 Meses',
    timestamp: 'Hoje às 14:20',
    dateGroup: 'Hoje',
    metadata: {
      toColumn: 'A Fazer',
      priority: 'Alta',
    },
    changes: [
      {
        id: 'c-3',
        label: 'Prioridade',
        to: 'Alta',
      },
      {
        id: 'c-4',
        label: 'Prazo',
        to: '28/11/2026',
      },
    ],
  },
  {
    id: 'act-4',
    actionType: 'task_updated',
    author: AUTHOR_CAMILA,
    title: 'Refinar design system dos cards de metas',
    goalTitle: 'Fluência em Inglês Técnico',
    timestamp: 'Hoje às 11:05',
    dateGroup: 'Hoje',
    changes: [
      {
        id: 'c-5',
        label: 'Prioridade',
        from: 'Baixa',
        to: 'Alta',
      },
      {
        id: 'c-6',
        label: 'Prazo',
        from: '20/12/2026',
        to: '10/12/2026',
      },
    ],
  },
  {
    id: 'act-5',
    actionType: 'task_moved',
    author: AUTHOR_RENAN,
    title: 'Mapeamento de endpoints REST para GraphQL',
    goalTitle: 'Certificação Cloud Architecture',
    timestamp: 'Ontem às 17:35',
    dateGroup: 'Ontem',
    metadata: {
      fromColumn: 'Backlog',
      toColumn: 'A Fazer',
    },
    changes: [
      {
        id: 'c-7',
        label: 'Coluna',
        from: 'Backlog',
        to: 'A Fazer',
      },
    ],
  },
  {
    id: 'act-6',
    actionType: 'goal_updated',
    author: AUTHOR_RENAN,
    title: 'Reserva de Emergência 12 Meses',
    goalTitle: 'Reserva de Emergência 12 Meses',
    timestamp: 'Ontem às 15:10',
    dateGroup: 'Ontem',
    changes: [
      {
        id: 'c-8',
        label: 'Progresso',
        from: '65%',
        to: '82%',
      },
      {
        id: 'c-9',
        label: 'Aporte',
        from: 'R$ 8.500',
        to: 'R$ 11.200',
      },
    ],
  },
  {
    id: 'act-7',
    actionType: 'task_created',
    author: AUTHOR_LUCAS,
    title: 'Construir componente de timeline minimalista',
    goalTitle: 'Certificação Cloud Architecture',
    timestamp: 'Ontem às 10:40',
    dateGroup: 'Ontem',
    metadata: {
      toColumn: 'Em Progresso',
      priority: 'Média',
    },
    changes: [
      {
        id: 'c-10',
        label: 'Coluna',
        to: 'Em Progresso',
      },
    ],
  },
  {
    id: 'act-8',
    actionType: 'task_completed',
    author: AUTHOR_RENAN,
    title: 'Revisão técnica de arquitetura Serverless com AWS Lambda',
    goalTitle: 'Certificação Cloud Architecture',
    timestamp: '16 de Outubro às 16:50',
    dateGroup: 'Esta semana',
    metadata: {
      fromColumn: 'Em Progresso',
      toColumn: 'Concluído',
    },
    changes: [
      {
        id: 'c-11',
        label: 'Status',
        from: 'Em Progresso',
        to: 'Concluído',
      },
    ],
  },
  {
    id: 'act-9',
    actionType: 'goal_created',
    author: AUTHOR_RENAN,
    title: 'Fluência em Inglês Técnico',
    goalTitle: 'Fluência em Inglês Técnico',
    timestamp: '15 de Outubro às 09:15',
    dateGroup: 'Esta semana',
    changes: [
      {
        id: 'c-12',
        label: 'Meta',
        to: 'Criada com 45% concluído',
      },
    ],
  },
  {
    id: 'act-10',
    actionType: 'task_moved',
    author: AUTHOR_CAMILA,
    title: 'Prototipação de telas de onboarding no Figma',
    goalTitle: 'Fluência em Inglês Técnico',
    timestamp: '14 de Outubro às 18:20',
    dateGroup: 'Esta semana',
    metadata: {
      fromColumn: 'Em Revisão',
      toColumn: 'Concluído',
    },
    changes: [
      {
        id: 'c-13',
        label: 'Coluna',
        from: 'Em Revisão',
        to: 'Concluído',
      },
    ],
  },
  {
    id: 'act-11',
    actionType: 'task_deleted',
    author: AUTHOR_RENAN,
    title: 'Migração de banco legado MySQL 5.7',
    goalTitle: 'Certificação Cloud Architecture',
    timestamp: '10 de Outubro às 11:30',
    dateGroup: 'Anterior',
    changes: [
      {
        id: 'c-14',
        label: 'Motivo',
        to: 'Escopo reavaliado e descontinuado',
      },
    ],
  },
];

const GOAL_OPTIONS: GoalFilterOption[] = [
  { id: 'Certificação Cloud Architecture', title: 'Certificação Cloud Architecture' },
  { id: 'Reserva de Emergência 12 Meses', title: 'Reserva de Emergência 12 Meses' },
  { id: 'Fluência em Inglês Técnico', title: 'Fluência em Inglês Técnico' },
];

const INITIAL_FILTERS: ActivityFiltersState = {
  search: '',
  category: 'all',
  selectedGoal: 'all',
};

const DATE_GROUPS: DateGroupLabel[] = ['Hoje', 'Ontem', 'Esta semana', 'Anterior'];

export const useRecentActivity = () => {
  const [activities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [filters, setFilters] = useState<ActivityFiltersState>(INITIAL_FILTERS);

  const handleSearchChange = (search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  };

  const handleCategoryChange = (category: ActivityCategory) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const handleGoalChange = (selectedGoal: string) => {
    setFilters((prev) => ({ ...prev, selectedGoal }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const hasActiveFilters = Boolean(
    filters.search.trim() !== '' ||
    filters.category !== 'all' ||
    filters.selectedGoal !== 'all'
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<ActivityCategory, number> = {
      all: activities.length,
      moved: 0,
      created: 0,
      updated: 0,
      completed: 0,
    };

    activities.forEach((item) => {
      if (item.actionType === 'task_moved') {
        counts.moved += 1;
      } else if (item.actionType === 'task_created' || item.actionType === 'goal_created') {
        counts.created += 1;
      } else if (item.actionType === 'task_completed') {
        counts.completed += 1;
      } else if (item.actionType === 'task_updated' || item.actionType === 'goal_updated') {
        counts.updated += 1;
      }
    });

    return counts;
  }, [activities]);

  const filteredActivities = useMemo(() => {
    const searchLower = filters.search.trim().toLowerCase();

    return activities.filter((item) => {
      if (filters.selectedGoal !== 'all' && item.goalTitle !== filters.selectedGoal) {
        return false;
      }

      if (filters.category === 'moved' && item.actionType !== 'task_moved') {
        return false;
      }
      if (
        filters.category === 'created' &&
        item.actionType !== 'task_created' &&
        item.actionType !== 'goal_created'
      ) {
        return false;
      }
      if (filters.category === 'completed' && item.actionType !== 'task_completed') {
        return false;
      }
      if (
        filters.category === 'updated' &&
        item.actionType !== 'task_updated' &&
        item.actionType !== 'goal_updated'
      ) {
        return false;
      }

      if (searchLower) {
        const matchesTitle = item.title.toLowerCase().includes(searchLower);
        const matchesAuthor = item.author.name.toLowerCase().includes(searchLower);
        const matchesGoal = item.goalTitle?.toLowerCase().includes(searchLower);
        const matchesMetadata =
          item.metadata?.fromColumn?.toLowerCase().includes(searchLower) ||
          item.metadata?.toColumn?.toLowerCase().includes(searchLower);

        if (!matchesTitle && !matchesAuthor && !matchesGoal && !matchesMetadata) {
          return false;
        }
      }

      return true;
    });
  }, [activities, filters]);

  const groupedActivities = useMemo(() => {
    const groups: { label: DateGroupLabel; items: ActivityItem[] }[] = [];

    DATE_GROUPS.forEach((label) => {
      const itemsInGroup = filteredActivities.filter((item) => item.dateGroup === label);
      if (itemsInGroup.length > 0) {
        groups.push({
          label,
          items: itemsInGroup,
        });
      }
    });

    return groups;
  }, [filteredActivities]);

  return {
    filters,
    categoryCounts,
    goalOptions: GOAL_OPTIONS,
    hasActiveFilters,
    filteredActivitiesCount: filteredActivities.length,
    groupedActivities,
    handleSearchChange,
    handleCategoryChange,
    handleGoalChange,
    handleResetFilters,
  };
};
