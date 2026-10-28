import { httpClient } from '../../shared/api/httpClient';
import type { ReportApiResponse } from '../types';

export const reportsApi = {
  getReport: async (period = '30_days', category = 'all'): Promise<ReportApiResponse> => {
    const params = new URLSearchParams({ period, category });
    return httpClient<ReportApiResponse>(`/reports?${params.toString()}`, {
      method: 'GET',
    });
  },
};
