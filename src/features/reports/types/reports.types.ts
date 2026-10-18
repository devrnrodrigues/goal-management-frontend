export type ReportPeriod = '30_days' | 'quarter' | 'year';

export interface ReportOverviewMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  subtitle: string;
}

export interface MonthlyVelocityItem {
  id: string;
  monthLabel: string;
  completedTasks: number;
  createdTasks: number;
}

export interface CategoryDistributionItem {
  id: string;
  category: string;
  goalsCount: number;
  percentage: number;
  color: string;
}

export interface TeamMemberReport {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  initials: string;
  completedTasks: number;
  activeTasks: number;
  onTimePercentage: number;
}

export interface GoalHealthReportItem {
  id: string;
  goalTitle: string;
  category: string;
  progress: number;
  completedTasks: number;
  totalTasks: number;
  deadline: string;
  healthStatus: 'on_track' | 'attention' | 'completed';
}

export interface ReportFiltersState {
  period: ReportPeriod;
  selectedCategory: string;
}
