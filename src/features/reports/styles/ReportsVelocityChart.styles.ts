import styled from 'styled-components';

export const ChartCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 16px 14px;
  }
`;

export const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

export const ChartTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ChartTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const ChartSubtitle = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const LegendRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const LegendDot = styled.span<{ $variant: 'completed' | 'created' }>`
  width: 8px;
  height: 8px;
  border-radius: 2px;
  background-color: ${({ theme, $variant }) =>
    $variant === 'completed' ? theme.colors.primaryDark : 'rgba(0, 0, 0, 0.2)'};
`;

export const BarsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  height: 180px;
  padding-top: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  min-width: 0;
  overflow: hidden;
`;

export const BarColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
  height: 100%;
  justify-content: flex-end;
  min-width: 0;
`;

export const BarsPair = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 4px;
  height: 100%;
  width: 100%;
  justify-content: center;
`;

export const BarFill = styled.div<{ $heightPercent: number; $variant: 'completed' | 'created' }>`
  width: clamp(8px, 2vw, 24px);
  height: ${({ $heightPercent }) => `${$heightPercent}%`};
  border-radius: 4px 4px 0 0;
  background-color: ${({ theme, $variant }) =>
    $variant === 'completed' ? theme.colors.primaryDark : 'rgba(0, 0, 0, 0.12)'};
  transition: height 0.3s ease;
  position: relative;

  &:hover {
    opacity: 0.85;
  }
`;

export const MonthAxisLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  white-space: nowrap;
`;
