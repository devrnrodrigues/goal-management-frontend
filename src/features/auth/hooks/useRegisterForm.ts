import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

interface UseRegisterFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export const useRegisterForm = ({ onSubmit }: UseRegisterFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleAgreeTermsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAgreeTerms(event.target.checked);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(event);
  };

  return {
    name,
    email,
    password,
    confirmPassword,
    showPassword,
    agreeTerms,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleTogglePasswordVisibility,
    handleAgreeTermsChange,
    handleSubmit,
  };
};
