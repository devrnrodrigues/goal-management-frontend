import styled from 'styled-components';

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  width: 100%;

  @media (min-width: 1720px) {
    gap: 20px;
  }

  @media (min-width: 2100px) {
    gap: 24px;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const StatIconWrapper = styled.div<{ $variant: 'primary' | 'info' | 'urgent' | 'warning' }>`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.md};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  background-color: ${({ $variant, theme }) => {
    switch ($variant) {
      case 'primary':
        return theme.colors.iconBackground;
      case 'info':
        return 'rgba(59, 130, 246, 0.1)';
      case 'urgent':
        return '#fee2e2';
      case 'warning':
        return 'rgba(245, 158, 11, 0.1)';
    }
  }};

  color: ${({ $variant, theme }) => {
    switch ($variant) {
      case 'primary':
        return theme.colors.primary;
      case 'info':
        return '#2563eb';
      case 'urgent':
        return '#dc2626';
      case 'warning':
        return '#d97706';
    }
  }};
`;

export const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const StatValue = styled.span`
  font-size: clamp(20px, 0.4vw + 18px, 26px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.2;
`;

export const StatLabel = styled.span`
  font-size: clamp(12px, 0.1vw + 11px, 14px);
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;
