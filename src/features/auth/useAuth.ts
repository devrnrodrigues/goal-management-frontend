import { useState } from 'react';
import type { FormEvent } from 'react';
import type { AuthMode } from './types';

interface UseAuthProps {
  initialMode?: AuthMode;
  onLoginSuccess: () => void;
}

export const useAuth = ({ initialMode = 'login', onLoginSuccess }: UseAuthProps) => {
  const [authMode, setAuthMode] = useState<AuthMode>(initialMode);

  const handleSwitchToLogin = () => {
    setAuthMode('login');
  };

  const handleSwitchToRegister = () => {
    setAuthMode('register');
  };

  const handleSubmitAuth = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLoginSuccess();
  };

  return {
    authMode,
    handleSwitchToLogin,
    handleSwitchToRegister,
    handleSubmitAuth,
  };
};
