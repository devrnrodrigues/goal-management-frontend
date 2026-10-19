import styled from 'styled-components';

export const BrandPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(145deg, #00a86b 0%, #008f5a 60%, #006d44 100%);
  padding: 56px 48px;
  color: ${({ theme }) => theme.colors.sidebarText};
  position: relative;
  overflow: hidden;

  @media (max-width: 960px) {
    display: none;
  }
`;

export const BrandGlowDeco = styled.div`
  position: absolute;
  top: -120px;
  right: -120px;
  width: 320px;
  height: 320px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: radial-gradient(circle, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 70%);
  pointer-events: none;
`;

export const BrandHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 1;
`;

export const BrandLogoBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.sidebarText};
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

export const BrandTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.4px;
  color: ${({ theme }) => theme.colors.sidebarText};
`;

export const BrandMainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 1;
  max-width: 420px;
`;

export const BrandHeadline = styled.h1`
  font-size: clamp(28px, 2vw + 16px, 38px);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.6px;
  color: #ffffff;
`;

export const BrandDescription = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.sidebarTextMuted};
`;

export const BrandQuoteWrapper = styled.div`
  border-left: 3px solid rgba(255, 255, 255, 0.4);
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const BrandQuoteText = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.9);
  font-style: italic;
`;

export const BrandSupportingText = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
`;

export const BrandFooter = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
  z-index: 1;
`;
