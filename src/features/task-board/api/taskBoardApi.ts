import { httpClient } from '../../shared/api/httpClient';
import type {
  BoardColumnApiResponse,
  CreateBoardColumnApiRequest,
  UpdateBoardColumnApiRequest,
  TaskApiResponse,
  CreateTaskApiRequest,
  UpdateTaskApiRequest,
  MoveTaskApiRequest,
} from '../types';

export const taskBoardApi = {
  listColumns: async (goalId: string): Promise<BoardColumnApiResponse[]> => {
    return httpClient<BoardColumnApiResponse[]>(`/goals/${goalId}/columns`, {
      method: 'GET',
    });
  },

  createColumn: async (goalId: string, data: CreateBoardColumnApiRequest): Promise<BoardColumnApiResponse> => {
    return httpClient<BoardColumnApiResponse>(`/goals/${goalId}/columns`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateColumn: async (columnId: string, data: UpdateBoardColumnApiRequest): Promise<BoardColumnApiResponse> => {
    return httpClient<BoardColumnApiResponse>(`/columns/${columnId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteColumn: async (columnId: string): Promise<void> => {
    return httpClient<void>(`/columns/${columnId}`, {
      method: 'DELETE',
    });
  },

  listTasks: async (goalId: string): Promise<TaskApiResponse[]> => {
    return httpClient<TaskApiResponse[]>(`/goals/${goalId}/tasks`, {
      method: 'GET',
    });
  },

  createTask: async (goalId: string, data: CreateTaskApiRequest): Promise<TaskApiResponse> => {
    return httpClient<TaskApiResponse>(`/goals/${goalId}/tasks`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateTask: async (taskId: string, data: UpdateTaskApiRequest): Promise<TaskApiResponse> => {
    return httpClient<TaskApiResponse>(`/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  moveTask: async (taskId: string, data: MoveTaskApiRequest): Promise<TaskApiResponse> => {
    return httpClient<TaskApiResponse>(`/tasks/${taskId}/move`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  toggleComplete: async (taskId: string): Promise<TaskApiResponse> => {
    return httpClient<TaskApiResponse>(`/tasks/${taskId}/toggle-complete`, {
      method: 'PATCH',
    });
  },

  deleteTask: async (taskId: string): Promise<void> => {
    return httpClient<void>(`/tasks/${taskId}`, {
      method: 'DELETE',
    });
  },
};
