import { DayCell } from '../styles/DeadlinesCalendar.styles';

interface CalendarDayItemProps {
  day: number;
  isCurrentMonth: boolean;
  isSelected: boolean;
  hasDeadline: boolean;
  onSelect: (day: number) => void;
}

export const CalendarDayItem: React.FC<CalendarDayItemProps> = ({
  day,
  isCurrentMonth,
  isSelected,
  hasDeadline,
  onSelect,
}) => {
  const handleClick = () => {
    if (isCurrentMonth) {
      onSelect(day);
    }
  };

  return (
    <DayCell
      type="button"
      $isCurrentMonth={isCurrentMonth}
      $isSelected={isSelected}
      $hasDeadline={hasDeadline}
      onClick={handleClick}
      disabled={!isCurrentMonth}
    >
      {day}
    </DayCell>
  );
};
