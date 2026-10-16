import { useState } from 'react';
import {
  LayoutDashboard,
  Target,
  CheckCircle2,
  FolderKanban,
  CalendarDays,
  ListTodo,
  BarChart3,
  Trophy,
} from 'lucide-react';
import type { NavItemConfig } from '../types';

export const useSidebarNav = (initialActiveId = 'dashboard') => {
  const [activeItemId, setActiveItemId] = useState(initialActiveId);

  const navItems: NavItemConfig[] = [
    {
      id: 'dashboard',
      label: 'Visão Geral',
      icon: LayoutDashboard,
    },
    {
      id: 'goals',
      label: 'Minhas Metas',
      icon: Target,
    },
    {
      id: 'completed',
      label: 'Concluídas',
      icon: CheckCircle2,
    },
    {
      id: 'categories',
      label: 'Categorias',
      icon: FolderKanban,
    },
    {
      id: 'calendar',
      label: 'Prazos & Agenda',
      icon: CalendarDays,
    },
    {
      id: 'habits',
      label: 'Hábitos diários',
      icon: ListTodo,
    },
    {
      id: 'reports',
      label: 'Evolução',
      icon: BarChart3,
    },
    {
      id: 'achievements',
      label: 'Conquistas',
      icon: Trophy,
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
