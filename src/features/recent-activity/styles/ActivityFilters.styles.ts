import styled from 'styled-components';

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
`;

export const FiltersTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 240px;
  max-width: 380px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    min-width: 0;
    max-width: 100%;
    width: 100%;
  }

  svg {
    position: absolute;
    left: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
    pointer-events: none;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px 14px 8px 38px;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid rgba(0, 0, 0, 0.08);
  background-color: rgba(255, 255, 255, 0.75);
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
  outline: none;
  transition: all 0.15s ease;
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.surface};
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: none;
  }
`;

export const FilterActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 576px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 576px) {
    flex: 1;
    min-width: 0;
  }

  svg {
    position: absolute;
    right: 12px;
    color: ${({ theme }) => theme.colors.textSecondary};
    pointer-events: none;
  }
`;

export const GoalSelect = styled.select`
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
  max-width: 100%;

  @media (max-width: 576px) {
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
    border-color: rgba(0, 0, 0, 0.14);
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.surface};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CategoryChipsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
  overflow-x: auto;
  padding-bottom: 4px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CategoryChip = styled.button<{ $isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  border: none;
  background-color: ${({ $isActive }) =>
    $isActive ? 'rgba(0, 0, 0, 0.07)' : 'transparent'};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.textPrimary : theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;

  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 12px;
  }

  &:hover {
    background-color: ${({ $isActive }) =>
      $isActive ? 'rgba(0, 0, 0, 0.09)' : 'rgba(0, 0, 0, 0.04)'};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const ChipBadge = styled.span<{ $isActive: boolean }>`
  padding: 1px 6px;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: 11px;
  font-weight: 700;
  background-color: ${({ $isActive }) =>
    $isActive ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.04)'};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.textPrimary : theme.colors.textMuted};
`;

export const ClearFilterButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.statusDanger};
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;

  &:hover {
    background-color: rgba(239, 68, 68, 0.08);
  }
`;
