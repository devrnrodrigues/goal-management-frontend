import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;
  padding: 24px 0 24px 0;
  flex: 1;
  justify-content: space-between;

  @media (min-width: 1720px) and (min-height: 900px) {
    gap: clamp(24px, 2.8vh, 36px);
  }

  @media (max-width: 900px) {
    padding: 16px 0 24px 0;
    justify-content: flex-start;
  }
`;

export const DashboardHeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

export const DashboardGreetingTitle = styled.h1`
  font-size: clamp(20px, 1.2vw + 16px, 28px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 4px;
  letter-spacing: -0.5px;
`;

export const DashboardGreetingSubtitle = styled.p`
  font-size: clamp(13px, 0.2vw + 12px, 15px);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const QuickGoToButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.sidebarText};
  padding: 10px 22px;
  border-radius: ${({ theme }) => theme.radii.full};
  cursor: pointer;
  font-size: clamp(13px, 0.2vw + 12px, 15px);
  font-weight: 600;
  border: none;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 14px rgba(0, 168, 107, 0.25);

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(0, 168, 107, 0.35);
  }
`;
