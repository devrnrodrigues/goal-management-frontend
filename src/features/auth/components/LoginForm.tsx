import React from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import type { LoginFormProps } from '../types';
import { useLoginForm } from '../hooks/useLoginForm';
import { GoogleAuthButton } from './GoogleAuthButton';
import {
  FormContainer,
  FormHeader,
  FormTitle,
  FormSubtitle,
  ErrorMessageBox,
  FieldError,
  InputGroup,
  InputLabel,
  InputFieldWrapper,
  InputIconWrapper,
  StyledInput,
  PasswordVisibilityButton,
  ActionsRow,
  RememberMeLabel,
  StyledCheckbox,
  ForgotPasswordLink,
  SubmitButton,
  SwitchModeRow,
  SwitchModeButton,
  DividerRow,
  DividerLine,
  DividerText,
} from '../styles/LoginForm.styles';

export const LoginForm: React.FC<LoginFormProps> = ({
  onLoginSuccess,
  onGoogleLogin,
  onSwitchToRegister,
  externalError,
}) => {
  const {
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
  } = useLoginForm({ onLoginSuccess });

  const activeError = errorMessage || externalError;

  return (
    <FormContainer noValidate onSubmit={handleSubmit}>
      <FormHeader>
        <FormTitle>Acessar plataforma</FormTitle>
        <FormSubtitle>Entre com seus dados para continuar</FormSubtitle>
      </FormHeader>

      <InputGroup>
        <InputLabel htmlFor="login-email">E-mail</InputLabel>
        <InputFieldWrapper>
          <InputIconWrapper>
            <Mail size={18} />
          </InputIconWrapper>
          <StyledInput
            id="login-email"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={handleEmailChange}
            $hasError={Boolean(errors.email)}
          />
        </InputFieldWrapper>
        {errors.email && (
          <FieldError>
            <AlertCircle size={13} />
            <span>{errors.email}</span>
          </FieldError>
        )}
      </InputGroup>

      <InputGroup>
        <InputLabel htmlFor="login-password">Senha</InputLabel>
        <InputFieldWrapper>
          <InputIconWrapper>
            <Lock size={18} />
          </InputIconWrapper>
          <StyledInput
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Senha"
            value={password}
            onChange={handlePasswordChange}
            $hasError={Boolean(errors.password)}
          />
          <PasswordVisibilityButton
            type="button"
            onClick={handleTogglePasswordVisibility}
            aria-label="Alternar visibilidade da senha"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </PasswordVisibilityButton>
        </InputFieldWrapper>
        {errors.password && (
          <FieldError>
            <AlertCircle size={13} />
            <span>{errors.password}</span>
          </FieldError>
        )}
      </InputGroup>

      <ActionsRow>
        <RememberMeLabel>
          <StyledCheckbox
            type="checkbox"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          Lembrar de mim
        </RememberMeLabel>

        <ForgotPasswordLink type="button">
          Esqueceu a senha?
        </ForgotPasswordLink>
      </ActionsRow>

      <SubmitButton type="submit" disabled={isLoading}>
        <span>{isLoading ? 'Entrando...' : 'Entrar'}</span>
        <ArrowRight size={18} />
      </SubmitButton>

      {activeError && (
        <ErrorMessageBox>
          <AlertCircle size={16} />
          <span>{activeError}</span>
        </ErrorMessageBox>
      )}

      <DividerRow>
        <DividerLine />
        <DividerText>ou</DividerText>
        <DividerLine />
      </DividerRow>

      <GoogleAuthButton
        label="Continuar com Google"
        onClick={onGoogleLogin}
      />

      <SwitchModeRow>
        <span>Não tem uma conta?</span>
        <SwitchModeButton type="button" onClick={onSwitchToRegister}>
          Cadastre-se
        </SwitchModeButton>
      </SwitchModeRow>
    </FormContainer>
  );
};
