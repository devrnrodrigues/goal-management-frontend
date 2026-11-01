import React from 'react';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import type { RegisterFormProps } from '../types';
import { useRegisterForm } from '../hooks/useRegisterForm';
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
  TermsRow,
  StyledCheckbox,
  TermsText,
  SubmitButton,
  SwitchModeRow,
  SwitchModeButton,
  DividerRow,
  DividerLine,
  DividerText,
} from '../styles/RegisterForm.styles';

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onRegisterSuccess,
  onGoogleRegister,
  onSwitchToLogin,
  externalError,
}) => {
  const {
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
  } = useRegisterForm({ onRegisterSuccess });

  const activeError = errorMessage || externalError;

  return (
    <FormContainer noValidate onSubmit={handleSubmit}>
      <FormHeader>
        <FormTitle>Criar conta</FormTitle>
        <FormSubtitle>Preencha os campos para começar</FormSubtitle>
      </FormHeader>

      <InputGroup>
        <InputLabel htmlFor="register-name">Nome completo</InputLabel>
        <InputFieldWrapper>
          <InputIconWrapper>
            <User size={18} />
          </InputIconWrapper>
          <StyledInput
            id="register-name"
            type="text"
            placeholder="Nome"
            value={name}
            onChange={handleNameChange}
            $hasError={Boolean(errors.name)}
          />
        </InputFieldWrapper>
        {errors.name && (
          <FieldError>
            <AlertCircle size={13} />
            <span>{errors.name}</span>
          </FieldError>
        )}
      </InputGroup>

      <InputGroup>
        <InputLabel htmlFor="register-email">E-mail</InputLabel>
        <InputFieldWrapper>
          <InputIconWrapper>
            <Mail size={18} />
          </InputIconWrapper>
          <StyledInput
            id="register-email"
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
        <InputLabel htmlFor="register-password">Senha</InputLabel>
        <InputFieldWrapper>
          <InputIconWrapper>
            <Lock size={18} />
          </InputIconWrapper>
          <StyledInput
            id="register-password"
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

      <InputGroup>
        <InputLabel htmlFor="register-confirm-password">Confirmar senha</InputLabel>
        <InputFieldWrapper>
          <InputIconWrapper>
            <Lock size={18} />
          </InputIconWrapper>
          <StyledInput
            id="register-confirm-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            $hasError={Boolean(errors.confirmPassword)}
          />
        </InputFieldWrapper>
        {errors.confirmPassword && (
          <FieldError>
            <AlertCircle size={13} />
            <span>{errors.confirmPassword}</span>
          </FieldError>
        )}
      </InputGroup>

      <div>
        <TermsRow>
          <StyledCheckbox
            id="terms-checkbox"
            type="checkbox"
            checked={agreeTerms}
            onChange={handleAgreeTermsChange}
          />
          <TermsText>
            Concordo com os termos de uso e política de privacidade.
          </TermsText>
        </TermsRow>
        {errors.agreeTerms && (
          <FieldError style={{ marginTop: '6px' }}>
            <AlertCircle size={13} />
            <span>{errors.agreeTerms}</span>
          </FieldError>
        )}
      </div>

      <SubmitButton type="submit" disabled={isLoading}>
        {isLoading ? 'Criando conta...' : 'Criar conta'}
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
        label="Cadastrar com Google"
        onClick={onGoogleRegister}
      />

      <SwitchModeRow>
        <span>Já tem uma conta?</span>
        <SwitchModeButton type="button" onClick={onSwitchToLogin}>
          Entrar
        </SwitchModeButton>
      </SwitchModeRow>
    </FormContainer>
  );
};
