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

export type ActivityActionTypeApi =
  | 'TASK_MOVED'
  | 'TASK_CREATED'
  | 'TASK_COMPLETED'
  | 'TASK_UPDATED'
  | 'TASK_DELETED'
  | 'GOAL_CREATED'
  | 'GOAL_UPDATED';

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

export interface ActivityApiResponse {
  id: string;
  actionType: ActivityActionTypeApi;
  title: string;
  authorId: string;
  authorName: string;
  authorAvatarUrl?: string;
  goalId?: string;
  goalTitle?: string;
  taskId?: string;
  fromColumn?: string;
  toColumn?: string;
  createdAt: string;
}
