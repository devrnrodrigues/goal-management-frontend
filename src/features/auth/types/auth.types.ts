import type { FormEvent } from 'react';

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
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onGoogleLogin: () => void;
  onSwitchToRegister: () => void;
}

export interface RegisterFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onGoogleRegister: () => void;
  onSwitchToLogin: () => void;
}
