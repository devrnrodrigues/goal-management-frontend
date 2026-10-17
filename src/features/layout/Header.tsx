import React from 'react';
import { Search, Bell, Menu, ChevronDown } from 'lucide-react';
import type { HeaderProps } from './types';
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
  UserRoleText,
} from './styles/Header.styles';

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  searchQuery = '',
  onSearchChange,
  notificationCount = 2,
  userName = 'Renan Rodrigues',
  userRole = 'Gestor de metas',
  avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
}) => {
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
              placeholder="Pesquisar metas, categorias ou prazos..."
              value={searchQuery}
              onChange={onSearchChange}
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

          <UserProfileWrapper>
            <UserAvatar src={avatarUrl} alt={userName} />
            <UserInfoContainer>
              <UserNameText>{userName}</UserNameText>
              <UserRoleText>{userRole}</UserRoleText>
            </UserInfoContainer>
          </UserProfileWrapper>
        </HeaderRight>
      </HeaderContentWrapper>
    </HeaderContainer>
  );
};