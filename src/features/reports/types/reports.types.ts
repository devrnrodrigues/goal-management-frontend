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

export interface PriorityEfficiencyItem {
  priority: string;
  label: string;
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
  healthStatus: 'on_track' | 'at_risk' | 'delayed' | 'attention' | 'completed';
}

export interface ReportFiltersState {
  period: ReportPeriod;
  selectedCategory: string;
}

export interface ReportApiResponse {
  metrics: ReportOverviewMetric[];
  velocityData: MonthlyVelocityItem[];
  categoryDistribution: CategoryDistributionItem[];
  priorityEfficiencies: PriorityEfficiencyItem[];
  goalsHealth: {
    id: string;
    goalTitle: string;
    category: string;
    progress: number;
    completedTasks: number;
    totalTasks: number;
    deadline: string;
    healthStatus: string;
  }[];
  availableCategories: string[];
}
