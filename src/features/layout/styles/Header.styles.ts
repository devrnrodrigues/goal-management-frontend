import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 280px;
  height: 76px;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  z-index: 100;
  transition: left 0.3s ease-in-out;

  @media (min-width: 1720px) {
    padding: 0 40px;
  }

  @media (min-width: 2100px) {
    padding: 0 48px;
  }

  @media (max-width: 900px) {
    left: 0;
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

export const HeaderContentWrapper = styled.div`
  width: 100%;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex: 1;
  min-width: 0;
  max-width: 600px;
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
  min-width: 0;
  max-width: 380px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  @media (min-width: 1720px) {
    max-width: 440px;
  }

  @media (min-width: 2100px) {
    max-width: 500px;
  }

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
  font-size: clamp(13px, 0.15vw + 12px, 15px);
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

export const AddGoalHeaderButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
  padding: 8px 16px;
  font-size: clamp(12px, 0.15vw + 11px, 14px);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  box-shadow: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }

  @media (max-width: 600px) {
    padding: 8px 12px;
  }
`;

export const PeriodSelectorButton = AddGoalHeaderButton;

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
  font-size: clamp(9px, 0.1vw + 9px, 11px);
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
  border: 2px solid #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const UserAvatarInitials = styled.div`
  width: 38px;
  height: 38px;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: #f1f5f9;
  color: #334155;
  border: 2px solid #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
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
  font-size: clamp(13px, 0.15vw + 12px, 15px);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ProfileDropdownContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const ProfileChevron = styled.span<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: transform 0.2s ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0)')};
`;

export const ProfileDropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 210px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.dropdown};
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  z-index: 100;
`;

export const ProfileDropdownItem = styled.button<{ $isDanger?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 9px 12px;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme, $isDanger }) => ($isDanger ? theme.colors.statusDanger : theme.colors.textPrimary)};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: ${({ theme, $isDanger }) =>
      $isDanger ? 'rgba(239, 68, 68, 0.08)' : theme.colors.surfaceHover};
  }
`;

export const ProfileItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ProfileDropdownDivider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.borderLight};
  margin: 4px 6px;
`;

export const DevModeBadge = styled.span<{ $isActive: boolean }>`
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: ${({ $isActive }) => ($isActive ? '#dcfce7' : '#f1f5f9')};
  color: ${({ $isActive }) => ($isActive ? '#16a34a' : '#64748b')};
`;