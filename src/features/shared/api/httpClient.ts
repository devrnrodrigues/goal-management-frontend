const BASE_URL = 'http://localhost:8080/api';

export const TOKEN_STORAGE_KEY = '@goal_management:token';
export const REFRESH_TOKEN_STORAGE_KEY = '@goal_management:refresh_token';
export const USER_STORAGE_KEY = '@goal_management:user';
export const MOCK_MODE_STORAGE_KEY = '@goal_management:mock_mode';

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string>;
}

export interface StoredUser {
  id?: string;
  name?: string;
  email?: string;
  avatarUrl?: string;
  provider?: 'LOCAL' | 'GOOGLE';
}

interface RefreshAuthResponse {
  token: string;
  refreshToken: string;
  tokenType: string;
  user: StoredUser;
}

let refreshPromise: Promise<boolean> | null = null;

export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
};

export const getStoredUser = (): StoredUser | null => {
  const user = localStorage.getItem(USER_STORAGE_KEY);
  if (!user) return null;
  try {
    return JSON.parse(user) as StoredUser;
  } catch {
    return null;
  }
};

export const updateStoredUser = (updatedUser: Partial<StoredUser>): StoredUser => {
  const current = getStoredUser() || {};
  const merged: StoredUser = { ...current, ...updatedUser };
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(merged));
  window.dispatchEvent(new Event('user-profile-change'));
  return merged;
};

export const setAuthSession = (token: string, user: StoredUser, refreshToken?: string): void => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
  }
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  localStorage.removeItem(MOCK_MODE_STORAGE_KEY);
  window.dispatchEvent(new Event('dev-mode-change'));
};

export const setMockSession = (user: StoredUser): void => {
  localStorage.setItem(MOCK_MODE_STORAGE_KEY, 'true');
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  window.dispatchEvent(new Event('dev-mode-change'));
};

export const setDevMode = (enabled: boolean): void => {
  if (enabled) {
    localStorage.setItem(MOCK_MODE_STORAGE_KEY, 'true');
  } else {
    localStorage.removeItem(MOCK_MODE_STORAGE_KEY);
  }
  window.dispatchEvent(new Event('dev-mode-change'));
};

export const toggleDevModeSession = (): boolean => {
  const current = isMockSession();
  const next = !current;
  setDevMode(next);
  return next;
};

export const clearAuthSession = (): void => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
  localStorage.removeItem(MOCK_MODE_STORAGE_KEY);
  window.dispatchEvent(new Event('dev-mode-change'));
};

export const isMockSession = (): boolean => {
  return localStorage.getItem(MOCK_MODE_STORAGE_KEY) === 'true';
};

const attemptTokenRefresh = async (): Promise<boolean> => {
  const currentRefreshToken = getRefreshToken();
  if (!currentRefreshToken) {
    return false;
  }

  try {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken: currentRefreshToken }),
    });

    if (!response.ok) {
      return false;
    }

    const data = (await response.json()) as RefreshAuthResponse;
    setAuthSession(data.token, data.user, data.refreshToken);
    return true;
  } catch {
    return false;
  }
};

const refreshSessionOnce = async (): Promise<boolean> => {
  if (!refreshPromise) {
    refreshPromise = attemptTokenRefresh().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
};

const isAuthRoute = (path: string): boolean => {
  return path.startsWith('/auth/');
};

export const httpClient = async <T>(
  path: string,
  options: RequestInit = {},
  isRetry = false
): Promise<T> => {
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

  if (response.status === 401 && !isRetry && !isAuthRoute(path)) {
    const refreshed = await refreshSessionOnce();
    if (refreshed) {
      return httpClient<T>(path, options, true);
    }
    clearAuthSession();
    window.dispatchEvent(new Event('auth-session-expired'));
  }

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
