const BASE_URL = 'http://localhost:8080/api';

export const TOKEN_STORAGE_KEY = '@goal_management:token';
export const USER_STORAGE_KEY = '@goal_management:user';
export const MOCK_MODE_STORAGE_KEY = '@goal_management:mock_mode';

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string>;
}

export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
};

export const setAuthSession = (token: string, user: unknown): void => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  localStorage.removeItem(MOCK_MODE_STORAGE_KEY);
};

export const setMockSession = (user: unknown): void => {
  localStorage.setItem(MOCK_MODE_STORAGE_KEY, 'true');
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

export const clearAuthSession = (): void => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
  localStorage.removeItem(MOCK_MODE_STORAGE_KEY);
};

export const isMockSession = (): boolean => {
  return localStorage.getItem(MOCK_MODE_STORAGE_KEY) === 'true';
};

export const httpClient = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return {} as T;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error: ApiError = {
      status: response.status,
      message: data?.message || 'Ocorreu um erro na comunicação com o servidor.',
      errors: data?.errors,
    };
    throw error;
  }

  return data as T;
};
