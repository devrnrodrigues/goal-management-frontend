import styled from 'styled-components';

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const MetricCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: clamp(14px, 1.2vw, 18px) clamp(14px, 1.4vw, 20px);
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
  min-width: 0;
  overflow: hidden;
`;

export const CardHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;
`;

export const CardLabel = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
`;

export const CardIconBox = styled.div`
  width: 34px;
  height: 34px;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: rgba(0, 0, 0, 0.04);
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const CardValue = styled.span`
  font-size: clamp(22px, 1vw + 16px, 26px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.5px;
  line-height: 1.1;
  white-space: nowrap;
`;

export const CardFooterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  flex-wrap: nowrap;
  min-width: 0;
  overflow: hidden;
`;

export const ChangeTag = styled.span<{ $isPositive: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-weight: 600;
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.04);
  flex-shrink: 0;
  white-space: nowrap;
  color: ${({ theme, $isPositive }) =>
    $isPositive ? theme.colors.statusSuccess : theme.colors.statusDanger};
`;

export const SubtitleText = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
`;
