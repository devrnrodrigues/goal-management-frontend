import { useState } from 'react';
import type { AuthMode } from './types';
import { setMockSession } from '../shared/api/httpClient';

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

  const handleGoogleAuth = () => {
    setMockSession({
      id: 'mock-user-1',
      name: 'Desenvolvedor Mock',
      email: 'dev@exemplo.com',
      avatarUrl: '',
      provider: 'GOOGLE',
    });
    onLoginSuccess();
  };

  return {
    authMode,
    handleSwitchToLogin,
    handleSwitchToRegister,
    handleGoogleAuth,
  };
};
