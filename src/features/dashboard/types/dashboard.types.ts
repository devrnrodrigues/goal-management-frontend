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
  priority: string;
}

export interface MonthlyGoalData {
  month: string;
  planned: number;
  completed: number;
}

export interface CalendarDeadline {
  id: string;
  day: number;
  month: number;
  year: number;
  title: string;
  category: string;
  priority?: string;
}

export interface ActiveGoalsMetricApi {
  total: number;
  addedThisMonth: number;
}

export interface SuccessRateMetricApi {
  currentRate: number;
  differenceFromLastMonth: number;
}

export interface TodayActionsMetricApi {
  completed: number;
  total: number;
}

export interface AttentionGoalsMetricApi {
  total: number;
  dueNext7Days: number;
}

export interface StreakMetricApi {
  currentStreak: number;
  longestStreak: number;
}

export interface CompletedGoalsMetricApi {
  total: number;
  completedThisQuarter: number;
}

export interface DashboardMetricsApiResponse {
  activeGoals: ActiveGoalsMetricApi;
  successRate: SuccessRateMetricApi;
  todayActions: TodayActionsMetricApi;
  attentionGoals: AttentionGoalsMetricApi;
  streak: StreakMetricApi;
  completedGoals: CompletedGoalsMetricApi;
}

export interface DashboardFocusGoalApiResponse {
  id: string;
  title: string;
  category: string;
  progress: number;
  deadline: string | null;
  currentStep: string;
  priority: string;
}

export interface MonthlyEvolutionApiResponse {
  month: string;
  planned: number;
  completed: number;
}

export interface UpcomingDeadlineApiResponse {
  id: string;
  title: string;
  category: string;
  deadline: string | null;
  day: number;
  month: number;
  year: number;
  priority: string;
}

export interface DashboardOverviewApiResponse {
  metrics: DashboardMetricsApiResponse;
  focusGoals: DashboardFocusGoalApiResponse[];
  monthlyEvolution: MonthlyEvolutionApiResponse[];
  upcomingDeadlines: UpcomingDeadlineApiResponse[];
}
