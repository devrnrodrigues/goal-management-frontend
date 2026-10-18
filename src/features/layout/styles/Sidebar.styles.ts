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
  padding: 28px 22px 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-height: 720px) {
    padding: 20px 20px 14px 22px;
    gap: 12px;
  }

  @media (min-width: 1720px) and (min-height: 900px) {
    padding: 36px 24px 26px 28px;
    gap: 20px;
  }

  @media (min-width: 2100px) and (min-height: 1000px) {
    padding: 42px 26px 30px 30px;
    gap: 22px;
  }
`;

export const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const BrandLogoWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.sidebarText};

  @media (max-height: 720px) {
    width: 36px;
    height: 36px;
  }

  @media (min-width: 1720px) {
    width: 44px;
    height: 44px;
  }

  @media (min-width: 2100px) {
    width: 48px;
    height: 48px;
  }
`;

export const BrandTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.3px;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.sidebarText};

  @media (max-height: 720px) {
    font-size: 17px;
  }

  @media (min-width: 1720px) {
    font-size: 20px;
  }

  @media (min-width: 2100px) {
    font-size: 22px;
  }
`;

export const SectionBadge = styled.span`
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.8px;
  color: ${({ theme }) => theme.colors.sidebarTextMuted};
  padding-left: 4px;

  @media (min-width: 1720px) {
    font-size: 12px;
  }
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  padding-left: 16px;
  margin-bottom: 20px;

  @media (max-height: 720px) {
    gap: 10px;
    margin-bottom: 12px;
  }

  @media (min-width: 1720px) and (min-height: 900px) {
    gap: 14px;
    margin-bottom: 28px;
  }

  @media (min-width: 2100px) and (min-height: 1000px) {
    gap: 16px;
    margin-bottom: 32px;
  }

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
  border-radius: 32px 0 0 32px;
  background-color: ${({ theme }) => theme.colors.sidebarActiveBg};
  z-index: 1;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    right: 0;
    top: -16px;
    width: 16px;
    height: 16px;
    background: transparent;
    border-bottom-right-radius: 16px;
    box-shadow: 5px 5px 0 5px ${({ theme }) => theme.colors.sidebarActiveBg};
    pointer-events: none;

    @media (min-width: 1720px) and (min-height: 900px) {
      top: -24px;
      width: 24px;
      height: 24px;
      border-bottom-right-radius: 24px;
      box-shadow: 8px 8px 0 8px ${({ theme }) => theme.colors.sidebarActiveBg};
    }
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: -16px;
    width: 16px;
    height: 16px;
    background: transparent;
    border-top-right-radius: 16px;
    box-shadow: 5px -5px 0 5px ${({ theme }) => theme.colors.sidebarActiveBg};
    pointer-events: none;

    @media (min-width: 1720px) and (min-height: 900px) {
      bottom: -24px;
      width: 24px;
      height: 24px;
      border-top-right-radius: 24px;
      box-shadow: 8px -8px 0 8px ${({ theme }) => theme.colors.sidebarActiveBg};
    }
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
  padding: 13px 18px;
  border-radius: 32px 0 0 32px;
  background-color: transparent;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.sidebarActiveText : theme.colors.sidebarText};
  font-size: 15px;
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '500')};
  transition: color 0.2s ease-in-out;
  position: relative;
  z-index: 2;

  @media (max-height: 720px) {
    padding: 12px 16px;
    font-size: 14.5px;
  }

  @media (min-width: 1720px) and (min-height: 900px) {
    padding: 18px 22px;
    font-size: 16px;
  }

  @media (min-width: 2100px) and (min-height: 1000px) {
    padding: 22px 24px;
    font-size: 17px;
  }

  &:hover {
    background-color: ${({ $isActive, theme }) =>
      $isActive ? 'transparent' : theme.colors.sidebarItemHover};
    color: ${({ $isActive, theme }) =>
      $isActive ? theme.colors.sidebarActiveText : theme.colors.sidebarText};
  }

  @media (max-width: 900px) {
    border-radius: ${({ theme }) => theme.radii.full};
    padding: 13px 18px;
  }
`;

export const NavItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;

  @media (min-width: 1720px) {
    gap: 15px;
  }
`;

export const NavIconWrapper = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.sidebarActiveText : theme.colors.sidebarText};

  svg {
    width: 21px;
    height: 21px;
    transition: width 0.2s ease, height 0.2s ease;

    @media (max-height: 720px) {
      width: 20px;
      height: 20px;
    }

    @media (min-width: 1720px) and (min-height: 900px) {
      width: 24px;
      height: 24px;
    }

    @media (min-width: 2100px) and (min-height: 1000px) {
      width: 26px;
      height: 26px;
    }
  }
`;

export const NavLabel = styled.span`
  letter-spacing: -0.2px;
  white-space: nowrap;
`;

export const ChevronWrapper = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.6;

  svg {
    width: 16px;
    height: 16px;
    transition: width 0.2s ease, height 0.2s ease;

    @media (min-width: 1720px) {
      width: 18px;
      height: 18px;
    }

    @media (min-width: 2100px) {
      width: 20px;
      height: 20px;
    }
  }
`;

export const FooterSection = styled.div`
  padding: 20px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-height: 820px) {
    padding: 14px 20px;
    gap: 8px;
  }

  @media (min-width: 1720px) {
    padding: 26px 28px;
    gap: 14px;
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.sidebarTextMuted};

  @media (max-height: 820px) {
    font-size: 11px;
  }

  @media (min-width: 1720px) {
    font-size: 13px;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.sidebarText};
  }
`;

export const AppVersion = styled.span`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;

  @media (min-width: 1720px) {
    font-size: 12px;
  }
`;