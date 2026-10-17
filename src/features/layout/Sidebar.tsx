import React, { useState } from 'react';
import { Compass } from 'lucide-react';
import type { SidebarProps } from './types';
import { useSidebarNav } from './hooks/useSidebarNav';
import { SidebarNavItem } from './SidebarNavItem';
import {
  SidebarContainer,
  SidebarOverlay,
  HeaderSection,
  BrandContainer,
  BrandLogoWrapper,
  BrandTitle,
  SectionBadge,
  NavList,
  FooterSection,
  FooterLinks,
  AppVersion,
} from './styles/Sidebar.styles';

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  activeItemId,
  onSelectItem,
  onClose,
}) => {
  const [internalActiveId, setInternalActiveId] = useState('dashboard');
  const currentActiveId = activeItemId ?? internalActiveId;

  const { navItems } = useSidebarNav(currentActiveId);

  const handleItemSelect = (id: string) => {
    if (onSelectItem) {
      onSelectItem(id);
    } else {
      setInternalActiveId(id);
    }
  };

  return (
    <>
      <SidebarOverlay $isOpen={isOpen} onClick={onClose} />
      <SidebarContainer $isOpen={isOpen}>
        <HeaderSection>
          <BrandContainer>
            <BrandLogoWrapper>
              <Compass size={24} />
            </BrandLogoWrapper>
            <BrandTitle>Gestão de metas</BrandTitle>
          </BrandContainer>
          <SectionBadge>Painel de gestão</SectionBadge>
        </HeaderSection>

        <NavList>
          {navItems.map((item) => (
            <SidebarNavItem
              key={item.id}
              item={item}
              isActive={currentActiveId === item.id}
              onSelect={handleItemSelect}
            />
          ))}
        </NavList>

        <FooterSection>
          <FooterLinks>
            <a href="#">Ajuda</a>
            <a href="#">Privacidade</a>
            <a href="#">Termos</a>
          </FooterLinks>
          <AppVersion>Gestão de Metas v1.0 &copy; 2026</AppVersion>
        </FooterSection>
      </SidebarContainer>
    </>
  );
};