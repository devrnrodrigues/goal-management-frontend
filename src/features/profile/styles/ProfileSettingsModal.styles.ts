import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
  box-sizing: border-box;
  animation: fadeIn 0.15s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 540px;
  max-height: 88vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: none;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
`;

export const HeaderTitleCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ModalTitle = styled.h2`
  font-size: 17px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  letter-spacing: -0.3px;
`;

export const ModalSubtitle = styled.span`
  font-size: 12.5px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const TabNavRow = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  padding: 0 24px;
  gap: 16px;
  background-color: rgba(0, 0, 0, 0.01);
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 4px;
  border: none;
  background: none;
  font-size: 13.5px;
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '500')};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primaryDark : theme.colors.textSecondary};
  position: relative;
  cursor: pointer;
  transition: color 0.15s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${({ $isActive, theme }) =>
      $isActive ? theme.colors.primary : 'transparent'};
    border-radius: 2px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 22px 24px;
  overflow-y: auto;
  box-sizing: border-box;
`;

export const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 8px;
`;

export const AvatarPreview = styled.img`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
`;

export const AvatarInitialsBox = styled.div`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background-color: #f1f5f9;
  color: #334155;
  border: 2px solid #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const AvatarInfoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  flex: 1;
`;

export const AvatarTitle = styled.span`
  font-size: 13.5px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const AvatarHelper = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 12.5px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Input = styled.input`
  width: 100%;
  height: 38px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13.5px;
  box-sizing: border-box;
  transition: border-color 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: none;
  }

  &:disabled {
    background-color: rgba(0, 0, 0, 0.03);
    color: ${({ theme }) => theme.colors.textMuted};
    cursor: not-allowed;
  }
`;

export const SectionDivider = styled.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.05);
  width: 100%;
  margin: 4px 0;
`;

export const SubSectionTitle = styled.h3`
  font-size: 13.5px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const ProviderBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  padding: 3px 8px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.04);
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: fit-content;
`;

export const PreferencesCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 14px 16px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background-color: rgba(0, 0, 0, 0.01);
`;

export const PreferenceItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const PreferenceTextCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const PreferenceLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const PreferenceDescription = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SwitchToggle = styled.button<{ $checked: boolean }>`
  width: 40px;
  height: 22px;
  border-radius: 9999px;
  border: none;
  background-color: ${({ $checked, theme }) =>
    $checked ? theme.colors.primary : 'rgba(0, 0, 0, 0.15)'};
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;
  flex-shrink: 0;
  padding: 0;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ $checked }) => ($checked ? '20px' : '2px')};
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #ffffff;
    transition: left 0.2s ease;
  }
`;

export const ThemeOptionsGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: 100%;
`;

export const ThemeOptionButton = styled.button<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid
    ${({ $isSelected, theme }) =>
      $isSelected ? theme.colors.primary : 'rgba(0, 0, 0, 0.08)'};
  background-color: ${({ $isSelected }) =>
    $isSelected ? 'rgba(0, 168, 107, 0.06)' : 'transparent'};
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primaryDark : theme.colors.textPrimary};
  font-size: 12.5px;
  font-weight: ${({ $isSelected }) => ($isSelected ? '600' : '500')};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Banner = styled.div<{ $type: 'error' | 'success' }>`
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${({ $type }) =>
    $type === 'error' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(0, 168, 107, 0.08)'};
  border: 1px solid
    ${({ $type, theme }) =>
      $type === 'error' ? theme.colors.statusDanger : theme.colors.primary};
  color: ${({ $type, theme }) =>
    $type === 'error' ? theme.colors.statusDanger : theme.colors.primaryDark};
`;

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
`;

export const CancelButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const SaveButton = styled.button`
  padding: 8px 20px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

