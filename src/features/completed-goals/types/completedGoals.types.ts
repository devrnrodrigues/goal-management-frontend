import type { MemberAvatar } from '../../my-goals/constants/members';

export interface CompletedSubTask {
  id: string;
  title: string;
  completedAt: string;
  responsibleName?: string;
  responsibleAvatar?: string;
}

export interface CompletedGoalItem {
  id: string;
  title: string;
  category: string;
  description: string;
  completedDate: string;
  initialDate: string;
  durationDays: number;
  totalSubtasks: number;
  completedSubtasks: number;
  members: MemberAvatar[];
  deliverablesSummary: string;
  impactHighlight: string;
  subtasks: CompletedSubTask[];
}

export type CompletedGoalsSortOption = 'recent' | 'oldest' | 'tasks_count' | 'duration';

export interface CompletedGoalsFiltersState {
  searchQuery: string;
  selectedCategory: string;
  sortBy: CompletedGoalsSortOption;
}

export interface CompletedGoalsOverviewStats {
  totalCompletedGoals: number;
  totalDeliveredTasks: number;
  avgDurationDays: number;
  onTimeSuccessRate: number;
}
