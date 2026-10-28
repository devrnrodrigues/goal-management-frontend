import type { MemberAvatar } from '../constants/members';

export type SubTaskPriority = 'Alta' | 'Média' | 'Baixa';

export interface SubTask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority?: SubTaskPriority;
  deadline?: string;
  members?: MemberAvatar[];
  columnTitle?: string;
  status?: string;
}

export interface Task {
  id?: string;
  category: string;
  title: string;
  progress: number;
  description: string;
  deadline?: string;
  status?: string;
  priority?: string;
  members?: MemberAvatar[];
  subtasks?: SubTask[];
}

export type TaskFilterStatus = 'all' | 'pending' | 'completed';

export type GoalPriorityApi = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type GoalStatusApi = 'NOT_STARTED' | 'IN_PROGRESS' | 'UNDER_REVIEW' | 'COMPLETED' | 'CANCELLED';
export type GoalRoleApi = 'OWNER' | 'ADMIN' | 'VIEWER';

export interface GoalMemberApiResponse {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: GoalRoleApi;
}

export interface GoalSummaryApiResponse {
  id: string;
  title: string;
  description?: string;
  category: string;
  status: GoalStatusApi;
  priority: GoalPriorityApi;
  deadline?: string;
  progress: number;
  memberCount: number;
  userRole: GoalRoleApi;
  createdAt: string;
  members?: GoalMemberApiResponse[];
}

export interface GoalDetailApiResponse {
  id: string;
  title: string;
  description?: string;
  category: string;
  status: GoalStatusApi;
  priority: GoalPriorityApi;
  deadline?: string;
  progress: number;
  userRole: GoalRoleApi;
  members: GoalMemberApiResponse[];
  createdAt: string;
  updatedAt?: string;
}

export interface CreateGoalApiRequest {
  title: string;
  description?: string;
  category: string;
  priority: GoalPriorityApi;
  deadline?: string;
}

export interface UpdateGoalApiRequest {
  title: string;
  description?: string;
  category: string;
  priority: GoalPriorityApi;
  status: GoalStatusApi;
  deadline?: string;
}

export interface PageApiResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
