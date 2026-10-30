import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu, ChevronDown, Code2, Settings, LogOut, Plus } from 'lucide-react';
import type { HeaderProps } from './types';
import { useProfileDropdown } from './hooks/useProfileDropdown';
import { getStoredUser, type StoredUser } from '../shared';
import { ProfileSettingsModal } from '../profile';
import {
  HeaderContainer,
  HeaderContentWrapper,
  HeaderLeft,
  MenuToggleButton,
  SearchWrapper,
  SearchIconWrapper,
  SearchInput,
  HeaderRight,
  AddGoalHeaderButton,
  NotificationButton,
  NotificationBadge,
  UserProfileWrapper,
  UserAvatar,
  UserInfoContainer,
  UserNameText,
  ProfileDropdownContainer,
  ProfileChevron,
  ProfileDropdownMenu,
  ProfileDropdownItem,
  ProfileItemLeft,
  ProfileDropdownDivider,
  DevModeBadge,
  UserAvatarInitials,
} from './styles/Header.styles';
import { getInitials } from '../shared/utils/avatarUtils';

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  searchQuery,
  onSearchChange,
  notificationCount = 2,
  userName,
  avatarUrl,
  onLogout,
  onOpenAddGoal,
}) => {
  const [internalQuery, setInternalQuery] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [localUser, setLocalUser] = useState<StoredUser | null>(() => getStoredUser());
  const {
    isOpen,
    isDevMode,
    dropdownRef,
    toggleDropdown,
    closeDropdown,
    toggleDevMode,
  } = useProfileDropdown();

  useEffect(() => {
    const handleProfileChange = () => {
      setLocalUser(getStoredUser());
    };
    window.addEventListener('user-profile-change', handleProfileChange);
    return () => {
      window.removeEventListener('user-profile-change', handleProfileChange);
    };
  }, []);

  const displayName = userName || localUser?.name || (isDevMode ? 'Renan Rodrigues' : 'Usuário');
  const displayAvatar =
    avatarUrl ||
    localUser?.avatarUrl ||
    (isDevMode ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' : '');

  useEffect(() => {
    setAvatarError(false);
  }, [displayAvatar]);

  const isControlled = searchQuery !== undefined && onSearchChange !== undefined;
  const currentQuery = isControlled ? searchQuery : internalQuery;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalQuery(event.target.value);
    }
    onSearchChange?.(event);
  };

  const handleLogoutClick = () => {
    closeDropdown();
    onLogout?.();
  };

  return (
    <HeaderContainer>
      <HeaderContentWrapper>
        <HeaderLeft>
          <MenuToggleButton
            type="button"
            onClick={onToggleSidebar}
            aria-label="Alternar menu lateral"
          >
            <Menu size={20} />
          </MenuToggleButton>

          <SearchWrapper>
            <SearchIconWrapper>
              <Search size={18} />
            </SearchIconWrapper>
            <SearchInput
              type="text"
              placeholder="Pesquisar"
              value={currentQuery}
              onChange={handleInputChange}
            />
          </SearchWrapper>
        </HeaderLeft>

        <HeaderRight>
          <AddGoalHeaderButton type="button" onClick={onOpenAddGoal}>
            <Plus size={16} />
            <span>Adicionar meta</span>
          </AddGoalHeaderButton>

          <NotificationButton
            type="button"
            aria-label={`Notificações: ${notificationCount} não lidas`}
          >
            <Bell size={18} />
            {notificationCount > 0 && (
              <NotificationBadge>{notificationCount}</NotificationBadge>
            )}
          </NotificationButton>

          <ProfileDropdownContainer ref={dropdownRef}>
            <UserProfileWrapper onClick={toggleDropdown} role="button" tabIndex={0}>
              {displayAvatar && !avatarError ? (
                <UserAvatar
                  src={displayAvatar}
                  alt={displayName}
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <UserAvatarInitials>{getInitials(displayName)}</UserAvatarInitials>
              )}
              <UserInfoContainer>
                <UserNameText>{displayName}</UserNameText>
              </UserInfoContainer>
              <ProfileChevron $isOpen={isOpen}>
                <ChevronDown size={14} />
              </ProfileChevron>
            </UserProfileWrapper>

            {isOpen && (
              <ProfileDropdownMenu>
                <ProfileDropdownItem type="button" onClick={toggleDevMode}>
                  <ProfileItemLeft>
                    <Code2 size={16} />
                    <span>Modo desenvolvedor</span>
                  </ProfileItemLeft>
                  <DevModeBadge $isActive={isDevMode}>
                    {isDevMode ? 'Ativo' : 'Inativo'}
                  </DevModeBadge>
                </ProfileDropdownItem>

                <ProfileDropdownItem
                  type="button"
                  onClick={() => {
                    closeDropdown();
                    setIsSettingsOpen(true);
                  }}
                >
                  <ProfileItemLeft>
                    <Settings size={16} />
                    <span>Configurações</span>
                  </ProfileItemLeft>
                </ProfileDropdownItem>

                <ProfileDropdownDivider />

                <ProfileDropdownItem
                  type="button"
                  $isDanger
                  onClick={handleLogoutClick}
                >
                  <ProfileItemLeft>
                    <LogOut size={16} />
                    <span>Sair</span>
                  </ProfileItemLeft>
                </ProfileDropdownItem>
              </ProfileDropdownMenu>
            )}
          </ProfileDropdownContainer>
        </HeaderRight>
      </HeaderContentWrapper>

      <ProfileSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </HeaderContainer>
  );
};