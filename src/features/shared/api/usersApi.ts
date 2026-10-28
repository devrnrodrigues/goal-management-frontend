import { httpClient } from './httpClient';
import type { PageApiResponse } from '../../my-goals/types';

export interface UserSummaryApiResponse {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export const usersApi = {
  searchUsers: async (search?: string, page = 0, size = 20): Promise<PageApiResponse<UserSummaryApiResponse>> => {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('size', String(size));
    if (search && search.trim()) {
      params.set('search', search.trim());
    }
    return httpClient<PageApiResponse<UserSummaryApiResponse>>(`/users?${params.toString()}`, {
      method: 'GET',
    });
  },
};
