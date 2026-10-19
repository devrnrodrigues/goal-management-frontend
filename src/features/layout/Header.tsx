import React, { useState } from 'react';
import { Search, Bell, Menu, ChevronDown, Code2, Settings, LogOut } from 'lucide-react';
import type { HeaderProps } from './types';
import { useProfileDropdown } from './hooks/useProfileDropdown';
import {
  HeaderContainer,
  HeaderContentWrapper,
  HeaderLeft,
  MenuToggleButton,
  SearchWrapper,
  SearchIconWrapper,
  SearchInput,
  HeaderRight,
  PeriodSelectorButton,
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
} from './styles/Header.styles';

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  searchQuery,
  onSearchChange,
  notificationCount = 2,
  userName = 'Renan Rodrigues',
  avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  onLogout,
}) => {
  const [internalQuery, setInternalQuery] = useState('');
  const {
    isOpen,
    isDevMode,
    dropdownRef,
    toggleDropdown,
    closeDropdown,
    toggleDevMode,
  } = useProfileDropdown();

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
          <PeriodSelectorButton type="button">
            <span>Este mês</span>
            <ChevronDown size={14} />
          </PeriodSelectorButton>

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
              <UserAvatar src={avatarUrl} alt={userName} />
              <UserInfoContainer>
                <UserNameText>{userName}</UserNameText>
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

                <ProfileDropdownItem type="button" onClick={closeDropdown}>
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
    </HeaderContainer>
  );
};