import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 260px;
  height: 76px;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  z-index: 100;
  transition: left 0.3s ease-in-out;

  @media (max-width: 900px) {
    left: 0;
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex: 1;
  max-width: 480px;
`;

export const MenuToggleButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  box-shadow: ${({ theme }) => theme.shadows.card};

  @media (max-width: 900px) {
    display: flex;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
  padding: 8px 16px;
  gap: 10px;
  width: 100%;
  max-width: 380px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const SearchIconWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const SearchInput = styled.input`
  border: none;
  background: transparent;
  width: 100%;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 600px) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const PeriodSelectorButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NotificationButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: 6px;
  right: 6px;
  min-width: 16px;
  height: 16px;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ theme }) => theme.colors.badge};
  color: ${({ theme }) => theme.colors.badgeText};
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  border: 2px solid ${({ theme }) => theme.colors.surface};
`;

export const UserProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.radii.full};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }
`;

export const UserAvatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: ${({ theme }) => theme.radii.full};
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.primaryLight};
`;

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.2;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const UserNameText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const UserRoleText = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
`;