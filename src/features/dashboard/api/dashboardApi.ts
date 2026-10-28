import { httpClient } from '../../shared/api/httpClient';
import type { DashboardOverviewApiResponse } from '../types/dashboard.types';

export const dashboardApi = {
  getOverview: async (): Promise<DashboardOverviewApiResponse> => {
    return httpClient<DashboardOverviewApiResponse>('/dashboard', {
      method: 'GET',
    });
  },
};
