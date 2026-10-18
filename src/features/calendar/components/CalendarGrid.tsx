import React from 'react';
import type { CalendarDayInfo } from '../types';
import { CalendarDayCell } from './CalendarDayCell';
import {
  GridWrapper,
  WeekdaysRow,
  WeekdayHeader,
  DaysGrid,
} from '../styles/CalendarGrid.styles';

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

interface CalendarGridProps {
  days: CalendarDayInfo[];
  onSelectDay: (date: Date) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  days,
  onSelectDay,
}) => {
  return (
    <GridWrapper>
      <WeekdaysRow>
        {WEEKDAYS.map((weekday) => (
          <WeekdayHeader key={weekday}>{weekday}</WeekdayHeader>
        ))}
      </WeekdaysRow>

      <DaysGrid>
        {days.map((day) => (
          <CalendarDayCell
            key={day.dateKey}
            day={day}
            onSelectDay={onSelectDay}
          />
        ))}
      </DaysGrid>
    </GridWrapper>
  );
};
