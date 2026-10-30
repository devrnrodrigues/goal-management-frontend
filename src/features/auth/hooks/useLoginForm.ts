import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { authApi } from '../api/authApi';
import { setAuthSession } from '../../shared/api/httpClient';
import type { ApiError } from '../../shared/api/httpClient';

interface UseLoginFormProps {
  onLoginSuccess: () => void;
}

export const useLoginForm = ({ onLoginSuccess }: UseLoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRememberMeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await authApi.login({ email, password });
      setAuthSession(response.token, response.user, response.refreshToken);
      onLoginSuccess();
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(apiError.message || 'Falha ao autenticar. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    password,
    showPassword,
    rememberMe,
    isLoading,
    errorMessage,
    handleEmailChange,
    handlePasswordChange,
    handleTogglePasswordVisibility,
    handleRememberMeChange,
    handleSubmit,
  };
};
