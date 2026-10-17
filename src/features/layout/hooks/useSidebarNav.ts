import { useState } from 'react';
import {
  LayoutDashboard,
  Target,
  Kanban,
  CalendarDays,
  Activity,
  CheckCircle2,
  BarChart3,
} from 'lucide-react';
import type { NavItemConfig } from '../types';

export const useSidebarNav = (initialActiveId = 'dashboard') => {
  const [activeItemId, setActiveItemId] = useState(initialActiveId);

  const navItems: NavItemConfig[] = [
    {
      id: 'dashboard',
      label: 'Visão geral',
      icon: LayoutDashboard,
    },
    {
      id: 'goals',
      label: 'Minhas metas',
      icon: Target,
    },
    {
      id: 'task-board',
      label: 'Quadro de tarefas',
      icon: Kanban,
    },
    {
      id: 'recent-activity',
      label: 'Atividades recentes',
      icon: Activity,
    },
    {
      id: 'calendar',
      label: 'Calendário',
      icon: CalendarDays,
    },
    {
      id: 'completed-goals',
      label: 'Concluídas',
      icon: CheckCircle2,
    },
    {
      id: 'reports',
      label: 'Relatórios',
      icon: BarChart3,
    },
  ];

  const handleSelectItem = (id: string) => {
    setActiveItemId(id);
  };

  return {
    navItems,
    activeItemId,
    handleSelectItem,
  };
};
