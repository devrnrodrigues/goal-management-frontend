import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 20px 22px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  }
`;

export const MetricInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MetricValue = styled.span`
  font-size: 26px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.5px;
  line-height: 1.1;
`;

export const MetricTitle = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 4px;
`;

export const MetricSubtitle = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 4px;
`;

export const IconCircle = styled.div<{ $variant?: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ theme, $variant }) => {
    switch ($variant) {
      case 'warning':
        return theme.colors.statusWarning;
      case 'info':
        return theme.colors.statusInfo;
      default:
        return theme.colors.primary;
    }
  }};
  color: ${({ theme }) => theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(0, 168, 107, 0.25);
`;
