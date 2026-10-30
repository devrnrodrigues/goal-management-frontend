import { useState } from 'react';
import type { AuthMode, GoogleTokenResponse } from './types';
import { authApi } from './api/authApi';
import { setAuthSession } from '../shared/api/httpClient';
import type { ApiError } from '../shared/api/httpClient';

const DEFAULT_GOOGLE_CLIENT_ID =
  '914972024799-lovtg5j5ig9c5ld95s42hb9fk1mdm4p4.apps.googleusercontent.com';

interface UseAuthProps {
  initialMode?: AuthMode;
  onLoginSuccess: () => void;
}

export const useAuth = ({ initialMode = 'login', onLoginSuccess }: UseAuthProps) => {
  const [authMode, setAuthMode] = useState<AuthMode>(initialMode);
  const [googleError, setGoogleError] = useState<string | null>(null);

  const handleSwitchToLogin = () => {
    setGoogleError(null);
    setAuthMode('login');
  };

  const handleSwitchToRegister = () => {
    setGoogleError(null);
    setAuthMode('register');
  };

  const handleGoogleAuth = () => {
    setGoogleError(null);

    const oauth2 = window.google?.accounts?.oauth2;
    if (!oauth2) {
      setGoogleError('O serviço de autenticação do Google ainda está carregando. Tente novamente.');
      return;
    }

    const clientId =
      (import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined) || DEFAULT_GOOGLE_CLIENT_ID;

    const tokenClient = oauth2.initTokenClient({
      client_id: clientId,
      scope: 'openid email profile',
      callback: async (tokenResponse: GoogleTokenResponse) => {
        if (tokenResponse.error || !tokenResponse.access_token) {
          setGoogleError('Não foi possível concluir a autenticação com o Google.');
          return;
        }

        try {
          const response = await authApi.googleLogin(tokenResponse.access_token);
          setAuthSession(response.token, response.user, response.refreshToken);
          onLoginSuccess();
        } catch (error) {
          const apiError = error as ApiError;
          setGoogleError(apiError.message || 'Falha ao validar sua conta Google no servidor.');
        }
      },
      error_callback: () => {
        setGoogleError('Autenticação com o Google cancelada ou interrompida.');
      },
    });

    tokenClient.requestAccessToken();
  };

  return {
    authMode,
    googleError,
    handleSwitchToLogin,
    handleSwitchToRegister,
    handleGoogleAuth,
  };
};
