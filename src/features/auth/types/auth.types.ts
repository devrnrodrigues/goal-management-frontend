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
}

export interface RegisterFormProps {
  onRegisterSuccess: () => void;
  onGoogleRegister: () => void;
  onSwitchToLogin: () => void;
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
  tokenType: string;
  user: AuthUser;
}
