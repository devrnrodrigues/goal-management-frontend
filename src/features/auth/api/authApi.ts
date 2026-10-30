import { httpClient } from '../../shared/api/httpClient';
import type { AuthApiResponse, AuthUser, LoginCredentials, RegisterCredentials } from '../types';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthApiResponse> => {
    return httpClient<AuthApiResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  register: async (credentials: RegisterCredentials): Promise<AuthApiResponse> => {
    return httpClient<AuthApiResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  googleLogin: async (token: string): Promise<AuthApiResponse> => {
    return httpClient<AuthApiResponse>('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  },

  refresh: async (refreshToken: string): Promise<AuthApiResponse> => {
    return httpClient<AuthApiResponse>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  },

  logout: async (refreshToken: string): Promise<void> => {
    return httpClient<void>('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  },

  getCurrentUser: async (): Promise<AuthUser> => {
    return httpClient<AuthUser>('/users/me', {
      method: 'GET',
    });
  },
};
