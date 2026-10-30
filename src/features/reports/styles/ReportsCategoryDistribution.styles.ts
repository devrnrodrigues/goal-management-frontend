import styled from 'styled-components';

export const CategoryCard = styled.div`
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

export const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const CategoryTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
`;

export const CategoryItemRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

export const CategoryItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
`;

export const CategoryName = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const CategoryMeta = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 500;
`;

export const ProgressBarTrack = styled.div`
  width: 100%;
  height: 6px;
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 9999px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ $percentage: number; $color?: string }>`
  width: ${({ $percentage }) => `${$percentage}%`};
  height: 100%;
  background-color: ${({ $color }) => $color || 'rgba(0, 0, 0, 0.3)'};
  border-radius: 9999px;
  transition: width 0.3s ease;
`;
