import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { NavItemConfig } from './types';
import {
  NavListItem,
  ActiveNavIndicator,
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
      {isActive && (
        <ActiveNavIndicator
          layoutId="activeNavIndicator"
          transition={{
            type: 'spring',
            stiffness: 350,
            damping: 30,
          }}
        />
      )}
      <NavButton
        type="button"
        $isActive={isActive}
        onClick={handleClick}
        aria-current={isActive ? 'page' : undefined}
      >
        <NavItemLeft>
          <NavIconWrapper $isActive={isActive}>
            <IconComponent size={23} />
          </NavIconWrapper>
          <NavLabel>{item.label}</NavLabel>
        </NavItemLeft>
        {!isActive && (
          <ChevronWrapper>
            <ChevronRight size={19} />
          </ChevronWrapper>
        )}
      </NavButton>
    </NavListItem>
  );
};
