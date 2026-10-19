import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

export const FormHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 4px;
`;

export const FormTitle = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.5px;
`;

export const FormSubtitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const InputLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

export const InputFieldWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const InputIconWrapper = styled.div`
  position: absolute;
  left: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMuted};
  pointer-events: none;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 12px 42px 12px 42px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const PasswordVisibilityButton = styled.button`
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 4px;
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
`;

export const RememberMeLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  user-select: none;
`;

export const StyledCheckbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

export const ForgotPasswordLink = styled.button`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 13px;
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
    text-decoration: underline;
  }
`;

export const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.sidebarText};
  padding: 12px 20px;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.15s ease, opacity 0.15s ease;
  margin-top: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:active {
    opacity: 0.95;
  }
`;

export const SwitchModeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 8px;
`;

export const SwitchModeButton = styled.button`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: 14px;
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
    text-decoration: underline;
  }
`;

export const DividerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin: 2px 0;
`;

export const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
`;

export const DividerText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.5px;
`;
