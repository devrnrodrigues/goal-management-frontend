import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { authApi } from '../api/authApi';
import { setAuthSession } from '../../shared/api/httpClient';
import type { ApiError } from '../../shared/api/httpClient';

interface UseRegisterFormProps {
  onRegisterSuccess: () => void;
}

export interface RegisterFormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeTerms?: string;
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
  const [errors, setErrors] = useState<RegisterFormErrors>({});

  const validate = (): boolean => {
    const newErrors: RegisterFormErrors = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      newErrors.name = 'Informe seu nome completo';
    }

    if (!trimmedEmail) {
      newErrors.email = 'Informe seu e-mail';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = 'Informe um e-mail válido';
    }

    if (!password) {
      newErrors.password = 'Informe sua senha';
    } else if (password.length < 6) {
      newErrors.password = 'A senha deve conter no mínimo 6 caracteres';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirme sua senha';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = 'Você deve aceitar os termos de uso para continuar';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (errorMessage) {
      setErrorMessage(null);
    }
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
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

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    if (errorMessage) {
      setErrorMessage(null);
    }
    if (errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
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
    if (errors.agreeTerms) {
      setErrors((prev) => ({ ...prev, agreeTerms: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await authApi.register({
        name: name.trim(),
        email: email.trim(),
        password,
      });
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
    errors,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleTogglePasswordVisibility,
    handleAgreeTermsChange,
    handleSubmit,
  };
};
