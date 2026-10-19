import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

export const ModalContainer = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.dropdown};
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  form {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }

  .modal-body {
    overflow-y: auto;
    max-height: 60vh;
    padding: 20px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

  div {
    p {
      font-size: 13px;
      color: ${({ theme }) => theme.colors.textSecondary};
      margin-top: 4px;
    }
  }
`;

export const ModalTitle = styled.h2`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 700;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  width: 28px;
  height: 28px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .tasks-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

export const Label = styled.label`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Input = styled.input`
  padding: 9px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textPrimary};
  outline: none;
  background-color: ${({ theme }) => theme.colors.surface};
  transition: border-color 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const TextArea = styled.textarea`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textPrimary};
  outline: none;
  background-color: ${({ theme }) => theme.colors.surface};
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const TaskInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

export const TaskRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  background: ${({ theme }) => theme.colors.surfaceHover || '#f8fafc'};
  padding: 12px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  background-color: rgba(244, 247, 246, 0.6);
`;

export const CancelButton = styled.button`
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const SubmitButton = styled.button`
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;