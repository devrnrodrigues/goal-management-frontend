export type ActivityCategory =
  | 'all'
  | 'moved'
  | 'created'
  | 'updated'
  | 'completed';

export type ActivityActionType =
  | 'task_moved'
  | 'task_created'
  | 'task_completed'
  | 'task_updated'
  | 'task_deleted'
  | 'goal_created'
  | 'goal_updated';

export type DateGroupLabel = 'Hoje' | 'Ontem' | 'Esta semana' | 'Anterior';

export interface ActivityAuthor {
  id: string;
  name: string;
  avatarUrl?: string;
  initials: string;
  role: string;
}

export interface ActivityChangeField {
  id: string;
  label: string;
  from?: string;
  to: string;
}

export interface ActivityItem {
  id: string;
  actionType: ActivityActionType;
  author: ActivityAuthor;
  title: string;
  goalTitle?: string;
  timestamp: string;
  dateGroup: DateGroupLabel;
  changes?: ActivityChangeField[];
  metadata?: {
    fromColumn?: string;
    toColumn?: string;
    priority?: string;
  };
}


export interface ActivityFiltersState {
  search: string;
  category: ActivityCategory;
  selectedGoal: string;
}

export interface GoalFilterOption {
  id: string;
  title: string;
}
