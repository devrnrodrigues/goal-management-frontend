import { httpClient } from '../../shared/api/httpClient';
import type {
  GoalSummaryApiResponse,
  GoalDetailApiResponse,
  CreateGoalApiRequest,
  UpdateGoalApiRequest,
  GoalMemberApiResponse,
  PageApiResponse,
} from '../types';

export const goalsApi = {
  listGoals: async (page = 0, size = 50): Promise<PageApiResponse<GoalSummaryApiResponse>> => {
    return httpClient<PageApiResponse<GoalSummaryApiResponse>>(`/goals?page=${page}&size=${size}&sort=createdAt,desc`, {
      method: 'GET',
    });
  },

  getGoalById: async (id: string): Promise<GoalDetailApiResponse> => {
    return httpClient<GoalDetailApiResponse>(`/goals/${id}`, {
      method: 'GET',
    });
  },

  createGoal: async (data: CreateGoalApiRequest): Promise<GoalDetailApiResponse> => {
    return httpClient<GoalDetailApiResponse>('/goals', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateGoal: async (id: string, data: UpdateGoalApiRequest): Promise<GoalDetailApiResponse> => {
    return httpClient<GoalDetailApiResponse>(`/goals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteGoal: async (id: string): Promise<void> => {
    return httpClient<void>(`/goals/${id}`, {
      method: 'DELETE',
    });
  },

  addMember: async (goalId: string, userId: string, role: string): Promise<GoalMemberApiResponse> => {
    return httpClient<GoalMemberApiResponse>(`/goals/${goalId}/members`, {
      method: 'POST',
      body: JSON.stringify({ userId, role: role.toUpperCase() }),
    });
  },

  listMembers: async (goalId: string): Promise<GoalMemberApiResponse[]> => {
    return httpClient<GoalMemberApiResponse[]>(`/goals/${goalId}/members`, {
      method: 'GET',
    });
  },

  removeMember: async (goalId: string, userId: string): Promise<void> => {
    return httpClient<void>(`/goals/${goalId}/members/${userId}`, {
      method: 'DELETE',
    });
  },
};
