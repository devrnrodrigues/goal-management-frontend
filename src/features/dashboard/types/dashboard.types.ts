import type { LucideIcon } from 'lucide-react';

export interface DashboardMetric {
  id: string;
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  variant?: 'primary' | 'warning' | 'success' | 'info';
}

export interface FocusGoal {
  id: string;
  title: string;
  category: string;
  progress: number;
  deadline: string;
  currentStep: string;
  priority: 'Alta' | 'Média' | 'Normal';
}

export interface MonthlyGoalData {
  month: string;
  planned: number;
  completed: number;
}

export interface CalendarDeadline {
  day: number;
  month: number;
  year: number;
  title: string;
  category: string;
}
