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
