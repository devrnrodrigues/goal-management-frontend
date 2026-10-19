import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

interface UseLoginFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export const useLoginForm = ({ onSubmit }: UseLoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRememberMeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(event);
  };

  return {
    email,
    password,
    showPassword,
    rememberMe,
    handleEmailChange,
    handlePasswordChange,
    handleTogglePasswordVisibility,
    handleRememberMeChange,
    handleSubmit,
  };
};
