import type { MemberAvatar } from '../constants/members';

export interface SubTask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
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
