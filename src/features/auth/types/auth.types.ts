export type AuthMode = 'login' | 'register';

export interface AuthPageProps {
  initialMode?: AuthMode;
  onLoginSuccess: () => void;
}

export interface GoogleAuthButtonProps {
  label: string;
  onClick: () => void;
}

export interface LoginFormProps {
  onLoginSuccess: () => void;
  onGoogleLogin: () => void;
  onSwitchToRegister: () => void;
  externalError?: string | null;
}

export interface RegisterFormProps {
  onRegisterSuccess: () => void;
  onGoogleRegister: () => void;
  onSwitchToLogin: () => void;
  externalError?: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  provider: 'LOCAL' | 'GOOGLE';
}

export interface AuthApiResponse {
  token: string;
  refreshToken: string;
  tokenType: string;
  user: AuthUser;
}

export interface GoogleTokenResponse {
  access_token?: string;
  error?: string;
}

export interface GoogleTokenClientConfig {
  client_id: string;
  scope: string;
  callback: (response: GoogleTokenResponse) => void;
  error_callback?: () => void;
}

export interface GoogleTokenClient {
  requestAccessToken: () => void;
}

declare global {
  interface Window {
    google?: {
      accounts?: {
        oauth2?: {
          initTokenClient: (config: GoogleTokenClientConfig) => GoogleTokenClient;
        };
      };
    };
  }
}
