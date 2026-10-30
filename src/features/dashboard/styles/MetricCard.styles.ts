import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 38px 28px;
  min-height: 175px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-width: 0;
  box-sizing: border-box;
`;

export const MetricInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
`;

export const MetricValue = styled.span`
  font-size: 26px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.5px;
  line-height: 1.1;
  white-space: nowrap;
`;

export const MetricTitle = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MetricSubtitle = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const IconCircle = styled.div<{ $variant?: string }>`
  width: 58px;
  height: 58px;
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
`;
