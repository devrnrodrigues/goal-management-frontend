import styled from 'styled-components';

export const ViewContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
`;

export const WorkspaceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 24px;
  align-items: start;
  width: 100%;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr 320px;
    gap: 18px;
  }

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const TaskListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
`;

export const ControlsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  background: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: 16px;
  padding: 10px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
`;

export const FilterTabsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`;

export const FilterTabButton = styled.button<{ $isActive: boolean }>`
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primaryLight : 'transparent'};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primaryDark : theme.colors.textSecondary};
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: ${({ $isActive }) => ($isActive ? '700' : '500')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $isActive, theme }) =>
      $isActive ? theme.colors.primaryLight : theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const ControlsRightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: 8px;
  padding: 6px 10px;
  transition: all 0.2s ease;

  &:focus-within {
    background: #eef2f0;
  }

  svg {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const SearchInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textPrimary};
  width: 140px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ClearSearchButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const BulkActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${({ theme }) => theme.colors.background};
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const TasksListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const EmptyStateBox = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: 16px;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
`;

export const EmptyStateIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmptyStateTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const EmptyStateText = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 320px;
  margin: 0;
  line-height: 1.5;
`;