import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { NavItemConfig } from './types';
import {
  NavListItem,
  NavButton,
  NavItemLeft,
  NavIconWrapper,
  NavLabel,
  ChevronWrapper,
} from './styles/Sidebar.styles';

interface SidebarNavItemProps {
  item: NavItemConfig;
  isActive: boolean;
  onSelect: (id: string) => void;
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  item,
  isActive,
  onSelect,
}) => {
  const handleClick = () => {
    onSelect(item.id);
  };

  const IconComponent = item.icon;

  return (
    <NavListItem>
      <NavButton
        type="button"
        $isActive={isActive}
        onClick={handleClick}
        aria-current={isActive ? 'page' : undefined}
      >
        <NavItemLeft>
          <NavIconWrapper $isActive={isActive}>
            <IconComponent size={19} />
          </NavIconWrapper>
          <NavLabel>{item.label}</NavLabel>
        </NavItemLeft>
        {!isActive && (
          <ChevronWrapper>
            <ChevronRight size={16} />
          </ChevronWrapper>
        )}
      </NavButton>
    </NavListItem>
  );
};
