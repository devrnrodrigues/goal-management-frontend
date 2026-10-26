import { useState, useEffect, useCallback } from 'react';
import {
  isMockSession,
  getAuthToken,
  setDevMode,
  toggleDevModeSession,
} from '../api/httpClient';

export const useDevMode = () => {
  const [isDev, setIsDev] = useState<boolean>(() => isMockSession());

  useEffect(() => {
    const handleDevModeChange = () => {
      setIsDev(isMockSession());
    };

    window.addEventListener('dev-mode-change', handleDevModeChange);
    window.addEventListener('storage', handleDevModeChange);

    return () => {
      window.removeEventListener('dev-mode-change', handleDevModeChange);
      window.removeEventListener('storage', handleDevModeChange);
    };
  }, []);

  const toggleDevMode = useCallback(() => {
    toggleDevModeSession();
  }, []);

  const isMock = isDev || !getAuthToken();

  return {
    isDevMode: isDev,
    isMock,
    toggleDevMode,
    setDevMode,
  };
};
