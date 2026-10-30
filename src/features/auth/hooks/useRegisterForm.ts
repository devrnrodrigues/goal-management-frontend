import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { authApi } from '../api/authApi';
import { setAuthSession } from '../../shared/api/httpClient';
import type { ApiError } from '../../shared/api/httpClient';

interface UseRegisterFormProps {
  onRegisterSuccess: () => void;
}

export const useRegisterForm = ({ onRegisterSuccess }: UseRegisterFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

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

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleAgreeTermsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAgreeTerms(event.target.checked);
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem.');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('Você deve concordar com os termos de uso para continuar.');
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await authApi.register({ name, email, password });
      setAuthSession(response.token, response.user, response.refreshToken);
      onRegisterSuccess();
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(apiError.message || 'Falha ao criar conta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    name,
    email,
    password,
    confirmPassword,
    showPassword,
    agreeTerms,
    isLoading,
    errorMessage,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleTogglePasswordVisibility,
    handleAgreeTermsChange,
    handleSubmit,
  };
};
