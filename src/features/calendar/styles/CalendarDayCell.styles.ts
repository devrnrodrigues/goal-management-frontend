import styled from 'styled-components';

export const CellWrapper = styled.button<{
  $isCurrentMonth: boolean;
  $isSelected: boolean;
  $isToday: boolean;
  $hasTasks: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 6px;
  min-height: clamp(105px, 8.5vw, 135px);
  padding: 10px 9px;
  background-color: ${({ $isSelected }) =>
    $isSelected ? 'rgba(0, 0, 0, 0.04)' : 'transparent'};
  border: none;
  border-right: 1px solid rgba(0, 0, 0, 0.04);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  text-align: left;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
  min-width: 0;
  box-sizing: border-box;
  overflow: hidden;
  opacity: ${({ $isCurrentMonth }) => ($isCurrentMonth ? 1 : 0.35)};

  &:nth-child(7n) {
    border-right: none;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }

  @media (max-width: 768px) {
    min-height: 64px;
    padding: 6px 4px;
    gap: 2px;
  }

  @media (max-width: 480px) {
    min-height: 48px;
    padding: 4px 2px;
    justify-content: space-between;
    align-items: center;
  }
`;

export const CellHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  width: 100%;
  min-width: 0;

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

export const DayNumber = styled.span<{ $isToday: boolean; $isSelected: boolean }>`
  font-size: 13px;
  font-weight: ${({ $isToday, $isSelected }) =>
    $isToday || $isSelected ? 700 : 500};
  color: ${({ theme, $isToday, $isSelected }) =>
    $isToday || $isSelected ? theme.colors.textPrimary : theme.colors.textSecondary};
  width: 22px;
  height: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ $isToday }) =>
    $isToday ? 'rgba(0, 0, 0, 0.08)' : 'transparent'};

  @media (max-width: 768px) {
    font-size: 12px;
    width: 20px;
    height: 20px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
    width: 18px;
    height: 18px;
  }
`;

export const TasksCountBadge = styled.span`
  font-size: 10px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: rgba(0, 0, 0, 0.06);
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: nowrap;

  @media (max-width: 680px) {
    display: none;
  }
`;

export const TasksPreviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  margin-top: auto;

  @media (max-width: 680px) {
    display: none;
  }
`;

export const TaskMiniPill = styled.div<{ $priority: string }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 5px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.04);
  font-size: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  box-sizing: border-box;
`;

export const PriorityDot = styled.span<{ $priority: string }>`
  width: 5px;
  height: 5px;
  border-radius: ${({ theme }) => theme.radii.full};
  flex-shrink: 0;
  background-color: ${({ theme, $priority }) => {
    switch ($priority) {
      case 'Alta':
        return theme.colors.statusDanger;
      case 'Média':
        return theme.colors.statusWarning;
      case 'Baixa':
      default:
        return theme.colors.statusInfo;
    }
  }};
`;

export const MoreTasksText = styled.span`
  font-size: 9px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  padding-left: 2px;
`;

export const MobileDotsRow = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  gap: 3px;
  width: 100%;
  margin-top: auto;
  padding-bottom: 2px;

  @media (max-width: 680px) {
    display: flex;
  }
`;

export const MobileTaskDot = styled.span<{ $priority: string }>`
  width: 5px;
  height: 5px;
  border-radius: 9999px;
  background-color: ${({ theme, $priority }) => {
    switch ($priority) {
      case 'Alta':
        return theme.colors.statusDanger;
      case 'Média':
        return theme.colors.statusWarning;
      case 'Baixa':
      default:
        return theme.colors.statusInfo;
    }
  }};
`;
