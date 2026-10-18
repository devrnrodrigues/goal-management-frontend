import styled from 'styled-components';

export const FiltersRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`;

export const PeriodSelectorGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: rgba(0, 0, 0, 0.03);
  padding: 3px;
  border-radius: ${({ theme }) => theme.radii.full};
  width: fit-content;

  @media (max-width: 480px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const PeriodOptionButton = styled.button<{ $isActive: boolean }>`
  padding: 6px 14px;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: 13px;
  font-weight: 600;
  border: none;
  background-color: ${({ $isActive }) =>
    $isActive ? 'rgba(0, 0, 0, 0.08)' : 'transparent'};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.textPrimary : theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;

  @media (max-width: 480px) {
    flex: 1;
    padding: 6px 8px;
    font-size: 12px;
    text-align: center;
  }

  &:hover {
    background-color: ${({ $isActive }) =>
      $isActive ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.04)'};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const ActionsRightCol = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const CategorySelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    right: 12px;
    color: ${({ theme }) => theme.colors.textSecondary};
    pointer-events: none;
  }
`;

export const CategorySelect = styled.select`
  appearance: none;
  background-color: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: ${({ theme }) => theme.radii.full};
  padding: 8px 34px 8px 14px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  outline: none;
  transition: all 0.15s ease;
  box-sizing: border-box;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
    border-color: rgba(0, 0, 0, 0.14);
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.surface};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ExportButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: rgba(0, 0, 0, 0.05);
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.09);
  }
`;
