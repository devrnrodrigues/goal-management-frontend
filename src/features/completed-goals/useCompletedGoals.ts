import { useState, useMemo } from 'react';
import type {
  CompletedGoalItem,
  CompletedGoalsFiltersState,
  CompletedGoalsOverviewStats,
  CompletedGoalsSortOption,
} from './types';

const INITIAL_COMPLETED_GOALS: CompletedGoalItem[] = [
  {
    id: 'cg-1',
    title: 'Migração para Gateway V2',
    category: 'Engenharia de Produto',
    description: 'Transição completa do processamento de pagamentos para a nova API transacional com suporte a Pix e antifraude nativo.',
    completedDate: '12/10/2026',
    initialDate: '01/09/2026',
    durationDays: 41,
    totalSubtasks: 6,
    completedSubtasks: 6,
    deliverablesSummary: '6 de 6 entregas validadas em produção sem ocorrência de incidentes críticos.',
    impactHighlight: '+99.98% de disponibilidade e redução de 40% nas taxas de estorno.',
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
        title: 'Mapeamento de endpoints e schemas de requisição',
        completedAt: '08/09/2026',
        responsibleName: 'Marina Silva',
        responsibleAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-1-2',
        title: 'Implementação de fallback automático para adquirente reserva',
        completedAt: '19/09/2026',
        responsibleName: 'Renan Rodrigues',
        responsibleAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-1-3',
        title: 'Bateria de testes de carga simulando 40k req/min',
        completedAt: '28/09/2026',
        responsibleName: 'Lucas Costa',
        responsibleAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-1-4',
        title: 'Homologação bancária e conciliação de recebíveis',
        completedAt: '04/10/2026',
        responsibleName: 'Marina Silva',
        responsibleAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-1-5',
        title: 'Certificação de conformidade de logs e auditoria',
        completedAt: '09/10/2026',
        responsibleName: 'Renan Rodrigues',
        responsibleAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-1-6',
        title: 'Virada completa de DNS e desligamento do legado',
        completedAt: '12/10/2026',
        responsibleName: 'Lucas Costa',
        responsibleAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
      },
    ],
  },
  {
    id: 'cg-2',
    title: 'Automação de CI/CD para Produção',
    category: 'Infraestrutura & Cloud',
    description: 'Implementação de pipelines declarativos no GitHub Actions com verificações estáticas, testes de integração e deploy canário.',
    completedDate: '28/09/2026',
    initialDate: '15/08/2026',
    durationDays: 44,
    totalSubtasks: 5,
    completedSubtasks: 5,
    deliverablesSummary: 'Todas as esteiras operando com tempo médio de build inferior a 4 minutos.',
    impactHighlight: 'Tempo de deploy reduzido de 45 minutos para apenas 3.8 minutos.',
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
        title: 'Padronização de Dockerfiles multi-stage para microserviços',
        completedAt: '22/08/2026',
        responsibleName: 'Gabriel Pires',
        responsibleAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-2-2',
        title: 'Configuração de runner auto-hospedado com cache distribuído',
        completedAt: '03/09/2026',
        responsibleName: 'Rodrigo Alves',
        responsibleAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-2-3',
        title: 'Integração de scan de vulnerabilidades de dependências no PR',
        completedAt: '12/09/2026',
        responsibleName: 'Renan Rodrigues',
        responsibleAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-2-4',
        title: 'Mecanismo de rollback automático em caso de falha de probe',
        completedAt: '20/09/2026',
        responsibleName: 'Gabriel Pires',
        responsibleAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-2-5',
        title: 'Publicação de dashboards de telemetria no canal de engenharia',
        completedAt: '28/09/2026',
        responsibleName: 'Rodrigo Alves',
        responsibleAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80',
      },
    ],
  },
  {
    id: 'cg-3',
    title: 'Portal do Desenvolvedor & API Docs',
    category: 'Design System',
    description: 'Central unificada de documentação interativa, playbooks de arquitetura e guias de integração para times internos e parceiros.',
    completedDate: '15/09/2026',
    initialDate: '01/08/2026',
    durationDays: 45,
    totalSubtasks: 4,
    completedSubtasks: 4,
    deliverablesSummary: 'Documentação 100% atualizada com exemplos em TypeScript, cURL e Python.',
    impactHighlight: 'Tempo de onboarding de novos desenvolvedores caiu de 12 para 2 dias.',
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
        title: 'Estruturação do OpenAPI 3.1 para todos os endpoints públicos',
        completedAt: '10/08/2026',
        responsibleName: 'Beatriz Rocha',
        responsibleAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-3-2',
        title: 'Desenvolvimento do portal web interativo com busca semântica',
        completedAt: '25/08/2026',
        responsibleName: 'Julia Martins',
        responsibleAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-3-3',
        title: 'Criação do console interativo para testes de requisições sandbox',
        completedAt: '05/09/2026',
        responsibleName: 'Renan Rodrigues',
        responsibleAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-3-4',
        title: 'Publicação oficial e treinamento das lideranças técnicas',
        completedAt: '15/09/2026',
        responsibleName: 'Beatriz Rocha',
        responsibleAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80',
      },
    ],
  },
  {
    id: 'cg-4',
    title: 'Auditoria de Conformidade LGPD & SOC2',
    category: 'Segurança & Compliance',
    description: 'Revisão técnica de retenção de dados, anonimização em logs, criptografia em trânsito e políticas de acesso baseado em cargos.',
    completedDate: '30/08/2026',
    initialDate: '10/07/2026',
    durationDays: 51,
    totalSubtasks: 5,
    completedSubtasks: 5,
    deliverablesSummary: 'Certificação de compliance emitida sem ressalvas por auditor externo.',
    impactHighlight: 'Adequação 100% legal aprovada para captação de clientes corporativos.',
    members: [
      {
        id: 'usr-3',
        name: 'Camila Lima',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'usr-1',
        name: 'Marina Silva',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'usr-8',
        name: 'Felipe Dias',
        avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=80&q=80',
      },
    ],
    subtasks: [
      {
        id: 'cst-4-1',
        title: 'Mapeamento do inventário e fluxo de dados sensíveis (PII)',
        completedAt: '24/07/2026',
        responsibleName: 'Camila Lima',
        responsibleAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-4-2',
        title: 'Aplicação de mascaramento automático em pipelines analíticos',
        completedAt: '06/08/2026',
        responsibleName: 'Marina Silva',
        responsibleAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-4-3',
        title: 'Configuração de MFA obrigatório e rotação automática de chaves',
        completedAt: '16/08/2026',
        responsibleName: 'Felipe Dias',
        responsibleAvatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-4-4',
        title: 'Execução de teste de intrusão (pentest) com empresa terceira',
        completedAt: '23/08/2026',
        responsibleName: 'Camila Lima',
        responsibleAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-4-5',
        title: 'Emissão e registro formal do relatório de adequação',
        completedAt: '30/08/2026',
        responsibleName: 'Marina Silva',
        responsibleAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
      },
    ],
  },
  {
    id: 'cg-5',
    title: 'Unificação do Data Warehouse & BI',
    category: 'Growth & Operações',
    description: 'Consolidação de fontes de dados dispersas em um único lakehouse com modelagem dbt e atualização horária de KPIs.',
    completedDate: '18/08/2026',
    initialDate: '01/07/2026',
    durationDays: 48,
    totalSubtasks: 4,
    completedSubtasks: 4,
    deliverablesSummary: 'Modelos de dados homologados com reconciliação contábil automatizada.',
    impactHighlight: 'Decisões executivas com dados em tempo real e eliminação de relatórios manuais.',
    members: [
      {
        id: 'usr-2',
        name: 'Lucas Costa',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'usr-9',
        name: 'Ana Souza',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'usr-renan',
        name: 'Renan Rodrigues',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
      },
    ],
    subtasks: [
      {
        id: 'cst-5-1',
        title: 'Ingestão contínua de eventos com Kafka e CDC de bancos',
        completedAt: '14/07/2026',
        responsibleName: 'Lucas Costa',
        responsibleAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-5-2',
        title: 'Modelagem dimensional de métricas de receita (ARR e LTV)',
        completedAt: '27/07/2026',
        responsibleName: 'Ana Souza',
        responsibleAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-5-3',
        title: 'Criação dos dashboards operacionais de squads no Metabase',
        completedAt: '08/08/2026',
        responsibleName: 'Renan Rodrigues',
        responsibleAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
      },
      {
        id: 'cst-5-4',
        title: 'Validação cruzada de consistência com o balanço fiscal',
        completedAt: '18/08/2026',
        responsibleName: 'Ana Souza',
        responsibleAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80',
      },
    ],
  },
];

export const useCompletedGoals = () => {
  const [goals] = useState<CompletedGoalItem[]>(INITIAL_COMPLETED_GOALS);
  const [selectedGoal, setSelectedGoal] = useState<CompletedGoalItem | null>(null);
  const [filters, setFilters] = useState<CompletedGoalsFiltersState>({
    searchQuery: '',
    selectedCategory: 'all',
    sortBy: 'recent',
  });

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
      onTimeSuccessRate: 96,
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
    handleSearchChange,
    handleCategoryChange,
    handleSortChange,
    handleOpenDetail,
    handleCloseDetail,
  };
};
