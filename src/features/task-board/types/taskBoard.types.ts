export type TaskPriority = 'Alta' | 'Média' | 'Baixa';

export interface TaskMember {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface BoardTask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: TaskPriority;
  columnId: string;
  goalId?: string;
  deadline?: string;
  attachmentsCount?: number;
  commentsCount?: number;
  members?: TaskMember[];
}

export interface BoardColumn {
  id: string;
  title: string;
  color?: string;
}

export interface ActiveGoalInfo {
  id: string;
  title: string;
  category: string;
  deadline?: string;
  progress: number;
}

export type TaskPriorityApi = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface BoardColumnApiResponse {
  id: string;
  goalId: string;
  title: string;
  color?: string;
  position: number;
}

export interface CreateBoardColumnApiRequest {
  title: string;
  color?: string;
}

export interface UpdateBoardColumnApiRequest {
  title: string;
  color?: string;
}

export interface TaskMemberSummaryApiResponse {
  userId: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface TaskApiResponse {
  id: string;
  goalId: string;
  columnId: string;
  columnTitle: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: TaskPriorityApi;
  deadline?: string;
  position: number;
  attachmentsCount?: number;
  commentsCount?: number;
  members?: TaskMemberSummaryApiResponse[];
  createdAt: string;
  updatedAt?: string;
}

export interface CreateTaskApiRequest {
  columnId?: string;
  title: string;
  description?: string;
  priority?: TaskPriorityApi;
  deadline?: string;
  assignedMemberIds?: string[];
}

export interface UpdateTaskApiRequest {
  title: string;
  description?: string;
  priority?: TaskPriorityApi;
  deadline?: string;
  columnId?: string;
  assignedMemberIds?: string[];
}

export interface MoveTaskApiRequest {
  targetColumnId: string;
  targetPosition?: number;
}
