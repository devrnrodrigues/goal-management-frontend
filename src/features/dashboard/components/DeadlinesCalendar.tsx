import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { DeadlinesCalendarProps } from './DeadlinesCalendar.types';
import { CalendarDayItem } from './CalendarDayItem';
import {
  CalendarCardContainer,
  CalendarTopSection,
  CalendarHeader,
  MonthTitle,
  CalendarNavArrow,
  WeekDaysRow,
  WeekDayLabel,
  DaysGrid,
  UpcomingSection,
  UpcomingHeader,
  DeadlineItem,
  DeadlineTitle,
  DeadlineBadge,
} from '../styles/DeadlinesCalendar.styles';

export const DeadlinesCalendar: React.FC<DeadlinesCalendarProps> = ({
  selectedDay,
  onSelectDay,
  deadlines,
}) => {
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const daysInGrid = [
    { day: 28, isCurrent: false },
    { day: 29, isCurrent: false },
    { day: 30, isCurrent: false },
    { day: 1, isCurrent: true },
    { day: 2, isCurrent: true },
    { day: 3, isCurrent: true },
    { day: 4, isCurrent: true },
    { day: 5, isCurrent: true },
    { day: 6, isCurrent: true },
    { day: 7, isCurrent: true },
    { day: 8, isCurrent: true },
    { day: 9, isCurrent: true },
    { day: 10, isCurrent: true },
    { day: 11, isCurrent: true },
    { day: 12, isCurrent: true },
    { day: 13, isCurrent: true },
    { day: 14, isCurrent: true },
    { day: 15, isCurrent: true },
    { day: 16, isCurrent: true },
    { day: 17, isCurrent: true },
    { day: 18, isCurrent: true },
    { day: 19, isCurrent: true },
    { day: 20, isCurrent: true },
    { day: 21, isCurrent: true },
    { day: 22, isCurrent: true },
    { day: 23, isCurrent: true },
    { day: 24, isCurrent: true },
    { day: 25, isCurrent: true },
    { day: 26, isCurrent: true },
    { day: 27, isCurrent: true },
    { day: 28, isCurrent: true },
    { day: 29, isCurrent: true },
    { day: 30, isCurrent: true },
    { day: 31, isCurrent: true },
    { day: 1, isCurrent: false },
  ];

  const deadlineDays = new Set(deadlines.map((d) => d.day));

  return (
    <CalendarCardContainer>
      <CalendarTopSection>
        <CalendarHeader>
          <CalendarNavArrow type="button" aria-label="Mês anterior">
            <ChevronLeft size={16} />
          </CalendarNavArrow>
          <MonthTitle>Outubro 2026</MonthTitle>
          <CalendarNavArrow type="button" aria-label="Próximo mês">
            <ChevronRight size={16} />
          </CalendarNavArrow>
        </CalendarHeader>

        <WeekDaysRow>
          {weekDays.map((wd) => (
            <WeekDayLabel key={wd}>{wd}</WeekDayLabel>
          ))}
        </WeekDaysRow>

        <DaysGrid>
          {daysInGrid.map((cell, idx) => (
            <CalendarDayItem
              key={`${cell.day}-${idx}`}
              day={cell.day}
              isCurrentMonth={cell.isCurrent}
              isSelected={cell.isCurrent && cell.day === selectedDay}
              hasDeadline={cell.isCurrent && deadlineDays.has(cell.day)}
              onSelect={onSelectDay}
            />
          ))}
        </DaysGrid>
      </CalendarTopSection>

      <UpcomingSection>
        <UpcomingHeader>Prazos próximos</UpcomingHeader>
        {deadlines.length === 0 ? (
          <DeadlineItem>
            <DeadlineTitle title="Nenhum prazo próximo">Nenhum prazo próximo</DeadlineTitle>
          </DeadlineItem>
        ) : (
          deadlines.map((item) => (
            <DeadlineItem key={item.id}>
              <DeadlineTitle title={item.title}>{item.title}</DeadlineTitle>
              <DeadlineBadge>{item.day}/{String(item.month).padStart(2, '0')}</DeadlineBadge>
            </DeadlineItem>
          ))
        )}
      </UpcomingSection>
    </CalendarCardContainer>
  );
};
