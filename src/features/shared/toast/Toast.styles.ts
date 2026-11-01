import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { ToastType } from './toast.types';

export const ToastContainerWrapper = styled.div`
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  pointer-events: none;
  max-width: 460px;
  width: calc(100% - 48px);
`;

const getTypeIconColor = (type: ToastType, theme: any) => {
  switch (type) {
    case 'success':
      return theme.colors.statusSuccess;
    case 'error':
      return theme.colors.statusDanger;
    case 'warning':
      return theme.colors.statusWarning;
    case 'info':
    default:
      return theme.colors.statusInfo;
  }
};

export const ToastCard = styled(motion.div)<{ $type?: ToastType }>`
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 12px 16px;
  width: 100%;
`;

export const ToastIconBox = styled.div<{ $type: ToastType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ $type, theme }) => getTypeIconColor($type, theme)};
`;

export const ToastMessage = styled.p`
  flex: 1;
  font-size: 13.5px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.4;
  margin: 0;
  word-break: break-word;
`;

export const ToastCloseBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 4px;
  border-radius: 6px;
  flex-shrink: 0;
  transition: all 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
