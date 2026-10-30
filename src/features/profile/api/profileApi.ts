import { httpClient } from '../../shared/api/httpClient';
import type { UserProfile, UpdateProfilePayload } from '../types';

export const profileApi = {
  getProfile: async (): Promise<UserProfile> => {
    return httpClient<UserProfile>('/users/me', {
      method: 'GET',
    });
  },

  updateProfile: async (payload: UpdateProfilePayload): Promise<UserProfile> => {
    return httpClient<UserProfile>('/users/me', {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },
};

