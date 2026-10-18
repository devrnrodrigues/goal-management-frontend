import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
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
  max-width: 440px;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

export const ModalTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const CloseBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: ${({ theme }) => theme.radii.sm};

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const ModalBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FormLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const FormInput = styled.input`
  padding: 9px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textPrimary};
  outline: none;
  background-color: ${({ theme }) => theme.colors.surface};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 168, 107, 0.15);
  }
`;

export const ColorPalette = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const ColorOption = styled.button<{ $color: string; $isSelected: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  border: 2px solid ${({ $isSelected }) => ($isSelected ? '#ffffff' : 'transparent')};
  box-shadow: ${({ $isSelected }) => ($isSelected ? '0 0 0 2px #00a86b' : 'none')};
  cursor: pointer;
  transition: transform 0.15s ease;

  &:hover {
    transform: scale(1.15);
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  background-color: rgba(244, 247, 246, 0.5);
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
