import styled from 'styled-components';

export const CalendarCardContainer = styled.section`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 24px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const MonthTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
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
  width: 32px;
  height: 32px;
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
  margin-top: 18px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  padding-top: 14px;
`;

export const UpcomingHeader = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 8px;
`;

export const DeadlineItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
  font-size: 11px;
`;

export const DeadlineTitle = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 170px;
`;

export const DeadlineBadge = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.primaryLight};
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.radii.full};
`;
