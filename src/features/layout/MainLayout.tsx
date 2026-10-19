import React from 'react';
import type { MainLayoutProps } from './types';
import { useMainLayout } from './hooks/useMainLayout';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import {
  LayoutRoot,
  MainContentArea,
  PageContentContainer,
} from './styles/MainLayout.styles';

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  activeNavItemId,
  onSelectNavItem,
  searchQuery,
  onSearchChange,
  onLogout,
}) => {
  const {
    isSidebarOpen,
    currentNavItemId,
    handleToggleSidebar,
    handleCloseSidebar,
    handleSelectNavItem,
  } = useMainLayout();

  const effectiveActiveId = activeNavItemId ?? currentNavItemId;
  const effectiveSelectHandler = onSelectNavItem ?? handleSelectNavItem;

  return (
    <LayoutRoot>
      <Sidebar
        isOpen={isSidebarOpen}
        activeItemId={effectiveActiveId}
        onSelectItem={effectiveSelectHandler}
        onClose={handleCloseSidebar}
      />
      <Header
        onToggleSidebar={handleToggleSidebar}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onLogout={onLogout}
      />
      <MainContentArea>
        <PageContentContainer>{children}</PageContentContainer>
      </MainContentArea>
    </LayoutRoot>
  );
};
