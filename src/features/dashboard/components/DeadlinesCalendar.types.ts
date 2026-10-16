import type { CalendarDeadline } from '../types/dashboard.types';

export interface DeadlinesCalendarProps {
  selectedDay: number;
  onSelectDay: (day: number) => void;
  deadlines: CalendarDeadline[];
}
