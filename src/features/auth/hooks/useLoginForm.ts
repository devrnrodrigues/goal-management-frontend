import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { authApi } from '../api/authApi';
import { setAuthSession } from '../../shared/api/httpClient';
import type { ApiError } from '../../shared/api/httpClient';

interface UseLoginFormProps {
  onLoginSuccess: () => void;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
}

export const useLoginForm = ({ onLoginSuccess }: UseLoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<LoginFormErrors>({});

  const validate = (): boolean => {
    const newErrors: LoginFormErrors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      newErrors.email = 'Informe seu e-mail';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = 'Informe um e-mail válido';
    }

    if (!password) {
      newErrors.password = 'Informe sua senha';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (errorMessage) {
      setErrorMessage(null);
    }
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (errorMessage) {
      setErrorMessage(null);
    }
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: undefined }));
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

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await authApi.login({ email: email.trim(), password });
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
    errors,
    handleEmailChange,
    handlePasswordChange,
    handleTogglePasswordVisibility,
    handleRememberMeChange,
    handleSubmit,
  };
};
