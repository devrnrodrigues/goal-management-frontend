import React from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import type { LoginFormProps } from '../types';
import { useLoginForm } from '../hooks/useLoginForm';
import { GoogleAuthButton } from './GoogleAuthButton';
import {
  FormContainer,
  FormHeader,
  FormTitle,
  FormSubtitle,
  ErrorMessageBox,
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
}) => {
  const {
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
  } = useLoginForm({ onLoginSuccess });

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormHeader>
        <FormTitle>Acessar plataforma</FormTitle>
        <FormSubtitle>Entre com seus dados para continuar</FormSubtitle>
      </FormHeader>

      {errorMessage && <ErrorMessageBox>{errorMessage}</ErrorMessageBox>}

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
            required
          />
        </InputFieldWrapper>
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
            required
          />
          <PasswordVisibilityButton
            type="button"
            onClick={handleTogglePasswordVisibility}
            aria-label="Alternar visibilidade da senha"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </PasswordVisibilityButton>
        </InputFieldWrapper>
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
