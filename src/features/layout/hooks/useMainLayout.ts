import { useState } from 'react';

export const useMainLayout = (defaultActiveItem = 'dashboard') => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentNavItemId, setCurrentNavItemId] = useState(defaultActiveItem);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSelectNavItem = (id: string) => {
    setCurrentNavItemId(id);
    setIsSidebarOpen(false);
  };

  return {
    isSidebarOpen,
    currentNavItemId,
    handleToggleSidebar,
    handleCloseSidebar,
    handleSelectNavItem,
  };
};
