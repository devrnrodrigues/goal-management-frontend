import styled from 'styled-components';

export const CalendarCardContainer = styled.section`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 24px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  @media (min-width: 1720px) and (min-height: 900px) {
    padding: clamp(24px, 2.8vh, 36px);
  }
`;

export const CalendarTopSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: clamp(16px, 1.8vh, 22px);
`;

export const MonthTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};

  @media (min-width: 1720px) {
    font-size: 16px;
  }
`;

export const CalendarNavArrow = styled.button`
  width: 30px;
  height: 30px;
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
  margin-bottom: clamp(8px, 1.2vh, 14px);
`;

export const WeekDayLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};

  @media (min-width: 1720px) {
    font-size: 12px;
  }
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 8px;

  @media (min-width: 1720px) {
    row-gap: clamp(8px, 1.3vh, 14px);
  }
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

  @media (min-width: 1720px) {
    width: 38px;
    height: 38px;
    font-size: 13px;
  }

  @media (min-width: 2100px) {
    width: 44px;
    height: 44px;
    font-size: 14px;
  }

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
  margin-top: clamp(14px, 2vh, 22px);
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  padding-top: clamp(12px, 1.8vh, 18px);
`;

export const UpcomingHeader = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 8px;

  @media (min-width: 1720px) {
    font-size: 13px;
  }
`;

export const DeadlineItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 12px;

  @media (min-width: 1720px) {
    padding: clamp(8px, 1.1vh, 12px) 0;
    font-size: 13px;
  }
`;

export const DeadlineTitle = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 230px;

  @media (min-width: 1720px) {
    max-width: 300px;
  }

  @media (min-width: 2100px) {
    max-width: 380px;
  }
`;

export const DeadlineBadge = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.primaryLight};
  padding: 3px 10px;
  border-radius: ${({ theme }) => theme.radii.full};

  @media (min-width: 1720px) {
    font-size: 11px;
  }
`;
