import styled from 'styled-components';

export const ToolbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 16px 20px;
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

export const ToolbarTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
  padding: 8px 16px;
  flex: 1;
  max-width: 380px;
  min-width: 240px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
  }

  svg {
    color: ${({ theme }) => theme.colors.textMuted};
    flex-shrink: 0;
  }

  input {
    border: none;
    background: transparent;
    outline: none;
    font-size: clamp(12px, 0.15vw + 11px, 14px);
    color: ${({ theme }) => theme.colors.textPrimary};
    width: 100%;

    &::placeholder {
      color: ${({ theme }) => theme.colors.textMuted};
    }
  }
`;

export const ResultsCountText = styled.span`
  font-size: clamp(12px, 0.15vw + 11px, 14px);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const FilterChipsList = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 2px;

  &::-webkit-scrollbar {
    height: 4px;
  }
`;

export const FilterChip = styled.button<{ $isActive: boolean }>`
  border: 1px solid ${({ $isActive, theme }) => ($isActive ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ $isActive, theme }) => ($isActive ? theme.colors.primaryLight : 'transparent')};
  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.primaryDark : theme.colors.textSecondary)};
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '500')};
  font-size: clamp(11px, 0.15vw + 10px, 13px);
  padding: 6px 14px;
  border-radius: ${({ theme }) => theme.radii.full};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;
