import { httpClient } from '../../shared/api/httpClient';
import type { ActivityApiResponse } from '../types';
import type { PageApiResponse } from '../../my-goals/types';

export const activityApi = {
  listUserActivities: async (page = 0, size = 50): Promise<PageApiResponse<ActivityApiResponse>> => {
    return httpClient<PageApiResponse<ActivityApiResponse>>(
      `/activities?page=${page}&size=${size}&sort=createdAt,desc`,
      { method: 'GET' }
    );
  },

  listGoalActivities: async (goalId: string, page = 0, size = 50): Promise<PageApiResponse<ActivityApiResponse>> => {
    return httpClient<PageApiResponse<ActivityApiResponse>>(
      `/activities/goals/${goalId}?page=${page}&size=${size}&sort=createdAt,desc`,
      { method: 'GET' }
    );
  },
};
