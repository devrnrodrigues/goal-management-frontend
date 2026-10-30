import styled from 'styled-components';

export const CalendarCardContainer = styled.section`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 22px 24px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
  box-sizing: border-box;
`;

export const CalendarTopSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const MonthTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

export const CalendarNavArrow = styled.button`
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const WeekDaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 8px;
`;

export const WeekDayLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 6px;
`;

export const DayCell = styled.button<{
  $isSelected?: boolean;
  $isCurrentMonth?: boolean;
  $hasDeadline?: boolean;
}>`
  width: 30px;
  height: 30px;
  margin: 0 auto;
  border-radius: ${({ theme }) => theme.radii.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: ${({ $isSelected }) => ($isSelected ? '700' : '500')};
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary : 'transparent'};
  color: ${({ $isSelected, $isCurrentMonth, theme }) => {
    if ($isSelected) return theme.colors.surface;
    if (!$isCurrentMonth) return theme.colors.border;
    return theme.colors.textPrimary;
  }};
  position: relative;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ $isSelected, theme }) =>
      $isSelected ? theme.colors.primary : theme.colors.primaryLight};
    color: ${({ $isSelected, theme }) =>
      $isSelected ? theme.colors.surface : theme.colors.primary};
  }

  ${({ $hasDeadline, $isSelected, theme }) =>
    $hasDeadline &&
    !$isSelected &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: 2px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: ${theme.colors.primary};
    }
  `}
`;

export const UpcomingSection = styled.div`
  margin-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  padding-top: 12px;
`;

export const UpcomingHeader = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 6px;
`;

export const DeadlineItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 0;
  font-size: 12px;
  min-width: 0;
`;

export const DeadlineTitle = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
  font-size: 12px;
`;

export const DeadlineBadge = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.primaryLight};
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.radii.full};
  flex-shrink: 0;
`;
