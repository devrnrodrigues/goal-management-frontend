import styled from 'styled-components';

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 56px 24px;
  background-color: transparent;
  border: none;
  text-align: center;
  gap: 14px;
  width: 100%;
`;

export const EmptyIconCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: rgba(0, 0, 0, 0.05);
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmptyTitle = styled.h4`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const EmptyDescription = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 360px;
  margin: 0;
  line-height: 1.5;
`;

export const ResetFiltersButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: rgba(0, 0, 0, 0.06);
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
