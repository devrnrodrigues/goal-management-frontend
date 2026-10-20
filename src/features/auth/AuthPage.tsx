import React from 'react';
import { Compass } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import type { AuthPageProps } from './types';
import { useAuth } from './useAuth';
import { AuthBrandPanel } from './components/AuthBrandPanel';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import {
  AuthRootContainer,
  AuthCardWrapper,
  FormSectionWrapper,
  MobileBrandHeader,
  MobileBrandLogoBox,
  MobileBrandTitle,
  MotionFormContainer,
} from './AuthPage.styles';

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'login',
  onLoginSuccess,
}) => {
  const {
    authMode,
    handleSwitchToLogin,
    handleSwitchToRegister,
    handleGoogleAuth,
  } = useAuth({ initialMode, onLoginSuccess });

  return (
    <AuthRootContainer>
      <AuthCardWrapper>
        <AuthBrandPanel />

        <FormSectionWrapper>
          <MobileBrandHeader>
            <MobileBrandLogoBox>
              <Compass size={20} />
            </MobileBrandLogoBox>
            <MobileBrandTitle>Gestão de metas</MobileBrandTitle>
          </MobileBrandHeader>

          <AnimatePresence mode="wait">
            {authMode === 'login' ? (
              <MotionFormContainer
                key="login-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <LoginForm
                  onLoginSuccess={onLoginSuccess}
                  onGoogleLogin={handleGoogleAuth}
                  onSwitchToRegister={handleSwitchToRegister}
                />
              </MotionFormContainer>
            ) : (
              <MotionFormContainer
                key="register-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <RegisterForm
                  onRegisterSuccess={onLoginSuccess}
                  onGoogleRegister={handleGoogleAuth}
                  onSwitchToLogin={handleSwitchToLogin}
                />
              </MotionFormContainer>
            )}
          </AnimatePresence>
        </FormSectionWrapper>
      </AuthCardWrapper>
    </AuthRootContainer>
  );
};
