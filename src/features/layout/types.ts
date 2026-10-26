import type { ChangeEvent, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface HeaderProps {
  onToggleSidebar: () => void;
  searchQuery?: string;
  onSearchChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  notificationCount?: number;
  userName?: string;
  avatarUrl?: string;
  onLogout?: () => void;
  onOpenAddGoal?: () => void;
}

export interface NavItemConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  badgeCount?: number;
}

export interface SidebarProps {
  isOpen: boolean;
  activeItemId?: string;
  onSelectItem?: (id: string) => void;
  onClose: () => void;
}

export interface SidebarNavItemProps {
  item: NavItemConfig;
  isActive: boolean;
  onSelect: (id: string) => void;
}

export interface MainLayoutProps {
  children: ReactNode;
  activeNavItemId?: string;
  onSelectNavItem?: (id: string) => void;
  searchQuery?: string;
  onSearchChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onLogout?: () => void;
  onOpenAddGoal?: () => void;
}
