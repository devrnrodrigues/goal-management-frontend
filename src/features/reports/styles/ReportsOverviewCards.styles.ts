import styled from 'styled-components';

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const MetricCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:hover {
    border-color: rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
`;

export const CardHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const CardLabel = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
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
  font-size: 26px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.5px;
  line-height: 1.1;
`;

export const CardFooterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  flex-wrap: wrap;
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
  color: ${({ theme, $isPositive }) =>
    $isPositive ? theme.colors.statusSuccess : theme.colors.statusDanger};
`;

export const SubtitleText = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 11px;
`;
