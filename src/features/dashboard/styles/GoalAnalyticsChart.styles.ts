import styled from 'styled-components';

export const ChartCardContainer = styled.section`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 24px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

export const ChartTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const LegendContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const LegendItem = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: ${({ theme }) => theme.radii.full};
    background-color: ${({ $color }) => $color};
  }
`;

export const SvgContainer = styled.div`
  width: 100%;
  flex: 1;
  min-height: 220px;
  position: relative;
`;
