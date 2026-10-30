import styled from 'styled-components';
import { motion } from 'framer-motion';

export const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  width: 280px;
  background-color: ${({ theme }) => theme.colors.sidebarBg};
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100vh;
  z-index: 200;
  transition: transform 0.3s ease-in-out;
  user-select: none;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: ${({ theme }) => theme.radii.full};
  }

  @media (max-width: 900px) {
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    box-shadow: ${({ $isOpen }) => ($isOpen ? '8px 0 24px rgba(0, 0, 0, 0.15)' : 'none')};
  }
`;

export const SidebarOverlay = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  z-index: 150;
`;

export const HeaderSection = styled.div`
  padding: 32px 22px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const BrandLogoWrapper = styled.div`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.sidebarText};
  flex-shrink: 0;
`;

export const BrandTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.3px;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.sidebarText};
`;

export const SectionBadge = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.8px;
  color: ${({ theme }) => theme.colors.sidebarTextMuted};
  padding-left: 4px;
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex: 1;
  padding-left: 14px;
  margin-bottom: 24px;

  @media (max-width: 900px) {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

export const NavListItem = styled.li`
  position: relative;
`;

export const ActiveNavIndicator = styled(motion.div)`
  position: absolute;
  inset: 0;
  border-radius: 36px 0 0 36px;
  background-color: ${({ theme }) => theme.colors.sidebarActiveBg};
  z-index: 1;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    right: 0;
    top: -24px;
    width: 24px;
    height: 24px;
    background: transparent;
    border-bottom-right-radius: 24px;
    box-shadow: 8px 8px 0 8px ${({ theme }) => theme.colors.sidebarActiveBg};
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: -24px;
    width: 24px;
    height: 24px;
    background: transparent;
    border-top-right-radius: 24px;
    box-shadow: 8px -8px 0 8px ${({ theme }) => theme.colors.sidebarActiveBg};
    pointer-events: none;
  }

  @media (max-width: 900px) {
    border-radius: ${({ theme }) => theme.radii.full};

    &::before,
    &::after {
      display: none;
    }
  }
`;

export const NavButton = styled.button<{ $isActive: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 21px 16px 21px 18px;
  border-radius: 36px 0 0 36px;
  background-color: transparent;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.sidebarActiveText : theme.colors.sidebarText};
  font-size: 16px;
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '500')};
  transition: color 0.2s ease-in-out;
  position: relative;
  z-index: 2;

  &:hover {
    background-color: ${({ $isActive, theme }) =>
      $isActive ? 'transparent' : theme.colors.sidebarItemHover};
    color: ${({ $isActive, theme }) =>
      $isActive ? theme.colors.sidebarActiveText : theme.colors.sidebarText};
  }

  @media (max-width: 900px) {
    border-radius: ${({ theme }) => theme.radii.full};
    padding: 19px 18px;
  }
`;

export const NavItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

export const NavIconWrapper = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.sidebarActiveText : theme.colors.sidebarText};

  svg {
    width: 23px;
    height: 23px;
  }
`;

export const NavLabel = styled.span`
  letter-spacing: -0.2px;
  white-space: nowrap;
`;

export const ChevronWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  opacity: 0.6;

  svg {
    width: 17px;
    height: 17px;
  }
`;

export const FooterSection = styled.div`
  padding: 22px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FooterLinks = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12.5px;
  color: ${({ theme }) => theme.colors.sidebarTextMuted};

  a:hover {
    color: ${({ theme }) => theme.colors.sidebarText};
  }
`;

export const AppVersion = styled.span`
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
`;
