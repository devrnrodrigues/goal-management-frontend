import styled from 'styled-components';
import { motion } from 'framer-motion';

export const TaskItemCard = styled.div<{ $isSelected: boolean; $isCompleted: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: 14px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all 0.2s ease;
  box-shadow: ${({ $isSelected }) =>
    $isSelected
      ? '0 4px 14px rgba(0, 0, 0, 0.08)'
      : '0 2px 6px rgba(0, 0, 0, 0.03)'};
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  }
`;

export const TaskItemMainRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
`;

export const TaskItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
`;

export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

export const CustomCheckbox = styled.div<{ $checked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 2px solid
    ${({ $checked, theme }) => ($checked ? theme.colors.primary : '#cbd5e1')};
  background: ${({ $checked, theme }) =>
    $checked ? theme.colors.primary : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &::after {
    content: '✓';
    color: #ffffff;
    font-size: 13px;
    font-weight: 700;
    display: ${({ $checked }) => ($checked ? 'block' : 'none')};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const TaskTitleText = styled.span<{ $completed: boolean }>`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme, $completed }) =>
    $completed ? theme.colors.textMuted : theme.colors.textPrimary};
  text-decoration: ${({ $completed }) => ($completed ? 'line-through' : 'none')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  transition: color 0.2s ease;
`;

export const TaskItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

export const IconButton = styled.button<{ $isDanger?: boolean }>`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ $isDanger, theme }) =>
      $isDanger ? theme.colors.statusDanger : theme.colors.primary};
    background: ${({ $isDanger }) => ($isDanger ? '#fee2e2' : '#f0fdf4')};
  }
`;

export const ExpandIconWrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
`;

export const TaskDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 32px;
  padding-top: 10px;
  border-top: 1px dashed rgba(0, 0, 0, 0.06);
`;

export const TaskDescriptionMainRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
`;

export const TaskDescriptionText = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  flex: 1;
`;

export const TaskDescriptionActions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
`;

export const InlineEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 32px;
  padding-top: 10px;
  border-top: 1px dashed rgba(0, 0, 0, 0.06);
`;

export const InlineEditTitleInput = styled.input`
  font-size: 14px;
  font-family: inherit;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 6px;
  padding: 4px 8px;
  outline: none;
  flex: 1;
  min-width: 0;
  box-sizing: border-box;

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const InlineEditTextArea = styled.textarea`
  font-size: 13px;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 8px 12px;
  outline: none;
  resize: vertical;
  min-height: 60px;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const InlineEditActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

export const InlineSaveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const InlineCancelButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const DeletePromptWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
  background: transparent;
  border: none;
  padding: 6px 0 0 0;
  box-sizing: border-box;

  @media (max-width: 520px) {
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
  }
`;

export const DeletePromptText = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.statusDanger};
  line-height: 1.3;
`;

export const DeletePromptActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

export const CancelDeleteBtn = styled.button`
  padding: 5px 10px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const ConfirmDeleteBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 12px;
  border-radius: 6px;
  border: none;
  background-color: ${({ theme }) => theme.colors.statusDanger};
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: #dc2626;
  }
`;

