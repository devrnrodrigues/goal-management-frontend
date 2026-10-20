import { useState, useMemo, useEffect, useCallback } from 'react';
import type {
  CompletedGoalItem,
  CompletedGoalsFiltersState,
  CompletedGoalsSortOption,
  CompletedGoalsOverviewStats,
  CompletedSubTask,
} from './types';
import { isMockSession, getAuthToken } from '../shared/api/httpClient';
import { goalsApi } from '../my-goals/api/goalsApi';
import { taskBoardApi } from '../task-board/api/taskBoardApi';
import { formatDateToDisplay, mapMemberToAvatar } from '../my-goals/api/goalMappers';

const INITIAL_COMPLETED_GOALS: CompletedGoalItem[] = [
  {
    id: 'cg-1',
    title: 'Migração do Core para Java 21 & Spring Boot 3.3',
    category: 'Engenharia de Produto',
    description: 'Atualização profunda do ecossistema backend com Virtual Threads, redução de consumo de memória em 38% e padronização da arquitetura Package by Feature.',
    completedDate: '28/09/2026',
    initialDate: '01/08/2026',
    durationDays: 58,
    totalSubtasks: 6,
    completedSubtasks: 6,
    deliverablesSummary: 'Virtual threads habilitadas em todos os microsserviços e taxa de throughput multiplicada por 2.4x.',
    impactHighlight: 'Tempo médio de resposta reduzido de 140ms para 32ms em horários de pico.',
    members: [
      {
        id: 'usr-renan',
        name: 'Renan Rodrigues',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'usr-1',
        name: 'Marina Silva',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'usr-2',
        name: 'Lucas Costa',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
      },
    ],
    subtasks: [
      {
        id: 'cst-1-1',
        title: 'Mapeamento e atualização das dependências do Maven pom.xml',
        completedAt: '05/08/2026',
        responsibleName: 'Marina Silva',
        responsibleAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-1-2',
        title: 'Refatoração dos Records DTO e validações Jakarta Validation',
        completedAt: '16/08/2026',
        responsibleName: 'Renan Rodrigues',
        responsibleAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-1-3',
        title: 'Ajuste de filtros Spring Security e emissão stateless de JWT',
        completedAt: '28/08/2026',
        responsibleName: 'Lucas Costa',
        responsibleAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-1-4',
        title: 'Configuração de migrações Flyway e testes idempotentes',
        completedAt: '08/09/2026',
        responsibleName: 'Marina Silva',
        responsibleAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-1-5',
        title: 'Homologação e benchmark de carga em cluster de staging',
        completedAt: '20/09/2026',
        responsibleName: 'Renan Rodrigues',
        responsibleAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-1-6',
        title: 'Deploy final e monitoramento de telemetria com Grafana',
        completedAt: '28/09/2026',
        responsibleName: 'Lucas Costa',
        responsibleAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
      },
    ],
  },
  {
    id: 'cg-2',
    title: 'Design System & Identidade Visual v1.0',
    category: 'Design System',
    description: 'Padronização de tipografia Plus Jakarta Sans, tokens de espaçamento, temas dark/light e catálogo unificado de componentes React com Styled Components.',
    completedDate: '15/09/2026',
    initialDate: '15/07/2026',
    durationDays: 62,
    totalSubtasks: 5,
    completedSubtasks: 5,
    deliverablesSummary: 'Biblioteca reutilizável integrada ao pipeline de desenvolvimento e documentação interativa.',
    impactHighlight: 'Redução de 45% no tempo de entrega de novas telas pelos times frontend.',
    members: [
      {
        id: 'usr-renan',
        name: 'Renan Rodrigues',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'usr-4',
        name: 'Gabriel Pires',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'usr-6',
        name: 'Rodrigo Alves',
        avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80',
      },
    ],
    subtasks: [
      {
        id: 'cst-2-1',
        title: 'Mapeamento de paleta de cores HSL e contraste semântico WCAG AAA',
        completedAt: '25/07/2026',
        responsibleName: 'Gabriel Pires',
        responsibleAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-2-2',
        title: 'Construção dos componentes base (Button, Input, Badge, Card, Modal)',
        completedAt: '12/08/2026',
        responsibleName: 'Rodrigo Alves',
        responsibleAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-2-3',
        title: 'Implementação de micro-animações suaves com Framer Motion',
        completedAt: '25/08/2026',
        responsibleName: 'Renan Rodrigues',
        responsibleAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-2-4',
        title: 'Testes de responsividade cross-device (mobile first)',
        completedAt: '05/09/2026',
        responsibleName: 'Gabriel Pires',
        responsibleAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-2-5',
        title: 'Publicação da versão estável e migração das rotas principais',
        completedAt: '15/09/2026',
        responsibleName: 'Rodrigo Alves',
        responsibleAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80',
      },
    ],
  },
  {
    id: 'cg-3',
    title: 'Migração de Infraestrutura para Kubernetes na AWS',
    category: 'Infraestrutura & Cloud',
    description: 'Transição completa dos serviços legados para clusters EKS com autoscaling horizontal e esteiras automatizadas de CI/CD.',
    completedDate: '02/09/2026',
    initialDate: '10/06/2026',
    durationDays: 84,
    totalSubtasks: 4,
    completedSubtasks: 4,
    deliverablesSummary: 'Clusters multi-AZ tolerantes a falhas e implantação contínua zero downtime.',
    impactHighlight: 'Disponibilidade de 99.98% e economia de 32% nos custos de nuvem.',
    members: [
      {
        id: 'usr-5',
        name: 'Beatriz Rocha',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'usr-7',
        name: 'Julia Martins',
        avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'usr-renan',
        name: 'Renan Rodrigues',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
      },
    ],
    subtasks: [
      {
        id: 'cst-3-1',
        title: 'Provisionamento de infraestrutura como código (Terraform)',
        completedAt: '30/06/2026',
        responsibleName: 'Beatriz Rocha',
        responsibleAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-3-2',
        title: 'Criação dos manifests Kubernetes e Helm Charts parametrizados',
        completedAt: '18/07/2026',
        responsibleName: 'Julia Martins',
        responsibleAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-3-3',
        title: 'Implementação de esteira com GitHub Actions e deploy canário',
        completedAt: '10/08/2026',
        responsibleName: 'Renan Rodrigues',
        responsibleAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-3-4',
        title: 'Virada oficial de DNS e desligamento dos servidores legados',
        completedAt: '02/09/2026',
        responsibleName: 'Beatriz Rocha',
        responsibleAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80',
      },
    ],
  },
];

export const useCompletedGoals = () => {
  const isMock = isMockSession() || !getAuthToken();
  const [goals, setGoals] = useState<CompletedGoalItem[]>(isMock ? INITIAL_COMPLETED_GOALS : []);
  const [selectedGoal, setSelectedGoal] = useState<CompletedGoalItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!isMock);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filters, setFilters] = useState<CompletedGoalsFiltersState>({
    searchQuery: '',
    selectedCategory: 'all',
    sortBy: 'recent',
  });

  const loadCompletedGoals = useCallback(async () => {
    if (isMock) {
      setGoals(INITIAL_COMPLETED_GOALS);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const pageRes = await goalsApi.listGoals(0, 50);
      const completedGoals = pageRes.content.filter(
        (g) => g.status === 'COMPLETED' || g.progress === 100
      );

      const detailedPromises = completedGoals.map(async (g) => {
        try {
          const [tasks, members] = await Promise.all([
            taskBoardApi.listTasks(g.id).catch(() => []),
            goalsApi.listMembers(g.id).catch(() => []),
          ]);

          const completedSubtasks: CompletedSubTask[] = tasks.map((t) => ({
            id: t.id,
            title: t.title,
            completedAt: t.deadline ? formatDateToDisplay(t.deadline) : 'Concluído',
            responsibleName: t.members?.[0]?.name,
            responsibleAvatar: t.members?.[0]?.avatarUrl,
          }));

          const item: CompletedGoalItem = {
            id: g.id,
            title: g.title,
            category: g.category,
            description: g.description || '',
            completedDate: g.deadline ? formatDateToDisplay(g.deadline) : 'Recentemente',
            initialDate: g.createdAt ? formatDateToDisplay(g.createdAt.slice(0, 10)) : '',
            durationDays: 30,
            totalSubtasks: tasks.length,
            completedSubtasks: tasks.filter((t) => t.completed).length,
            members: members.map(mapMemberToAvatar),
            deliverablesSummary: g.description || 'Entregas finalizadas com sucesso.',
            impactHighlight: 'Meta cumprida integralmente conforme o planejamento.',
            subtasks: completedSubtasks,
          };
          return item;
        } catch {
          return null;
        }
      });

      const resolved = await Promise.all(detailedPromises);
      const valid = resolved.filter((item): item is CompletedGoalItem => item !== null);
      setGoals(valid);
    } catch {
      setErrorMessage('Não foi possível carregar as metas concluídas.');
    } finally {
      setIsLoading(false);
    }
  }, [isMock]);

  useEffect(() => {
    loadCompletedGoals();
  }, [loadCompletedGoals]);

  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    goals.forEach((g) => set.add(g.category));
    return Array.from(set);
  }, [goals]);

  const overviewStats = useMemo<CompletedGoalsOverviewStats>(() => {
    const totalGoals = goals.length;
    const totalTasks = goals.reduce((acc, curr) => acc + curr.completedSubtasks, 0);
    const avgDuration =
      totalGoals > 0
        ? Math.round(goals.reduce((acc, curr) => acc + curr.durationDays, 0) / totalGoals)
        : 0;

    return {
      totalCompletedGoals: totalGoals,
      totalDeliveredTasks: totalTasks,
      avgDurationDays: avgDuration,
      onTimeSuccessRate: 100,
    };
  }, [goals]);

  const filteredGoals = useMemo(() => {
    const query = filters.searchQuery.trim().toLowerCase();

    return goals
      .filter((goal) => {
        const matchesCategory =
          filters.selectedCategory === 'all' || goal.category === filters.selectedCategory;
        const matchesQuery =
          query === '' ||
          goal.title.toLowerCase().includes(query) ||
          goal.description.toLowerCase().includes(query) ||
          goal.category.toLowerCase().includes(query);

        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'oldest':
            return a.id.localeCompare(b.id);
          case 'tasks_count':
            return b.completedSubtasks - a.completedSubtasks;
          case 'duration':
            return a.durationDays - b.durationDays;
          case 'recent':
          default:
            return b.id.localeCompare(a.id);
        }
      });
  }, [goals, filters]);

  const handleSearchChange = (searchQuery: string) => {
    setFilters((prev) => ({ ...prev, searchQuery }));
  };

  const handleCategoryChange = (selectedCategory: string) => {
    setFilters((prev) => ({ ...prev, selectedCategory }));
  };

  const handleSortChange = (sortBy: CompletedGoalsSortOption) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  };

  const handleOpenDetail = (goal: CompletedGoalItem) => {
    setSelectedGoal(goal);
  };

  const handleCloseDetail = () => {
    setSelectedGoal(null);
  };

  return {
    goals: filteredGoals,
    selectedGoal,
    filters,
    availableCategories,
    overviewStats,
    isLoading,
    errorMessage,
    handleSearchChange,
    handleCategoryChange,
    handleSortChange,
    handleOpenDetail,
    handleCloseDetail,
  };
};
