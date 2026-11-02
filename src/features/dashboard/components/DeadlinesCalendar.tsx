import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { DeadlinesCalendarProps } from './DeadlinesCalendar.types';
import { CalendarDayItem } from './CalendarDayItem';
import {
  CalendarCardContainer,
  CalendarTopSection,
  CalendarHeader,
  MonthTitle,
  WeekDaysRow,
  WeekDayLabel,
  DaysGrid,
  UpcomingSection,
  UpcomingHeaderRow,
  UpcomingHeader,
  UpcomingPagination,
  PaginationArrow,
  PaginationText,
  DeadlinesList,
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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(deadlines.length / itemsPerPage) || 1;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const currentDeadlines = deadlines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <CalendarCardContainer>
      <CalendarTopSection>
        <CalendarHeader>
          <MonthTitle>Outubro 2026</MonthTitle>
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
        <UpcomingHeaderRow>
          <UpcomingHeader>Prazos próximos</UpcomingHeader>
          {totalPages > 1 && (
            <UpcomingPagination>
              <PaginationArrow
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Página anterior"
              >
                <ChevronLeft size={13} />
              </PaginationArrow>
              <PaginationText>{currentPage}/{totalPages}</PaginationText>
              <PaginationArrow
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                aria-label="Próxima página"
              >
                <ChevronRight size={13} />
              </PaginationArrow>
            </UpcomingPagination>
          )}
        </UpcomingHeaderRow>

        <DeadlinesList>
          {currentDeadlines.length === 0 ? (
            <DeadlineItem>
              <DeadlineTitle title="Nenhum prazo próximo">Nenhum prazo próximo</DeadlineTitle>
            </DeadlineItem>
          ) : (
            currentDeadlines.map((item) => (
              <DeadlineItem key={item.id}>
                <DeadlineTitle title={item.title}>{item.title}</DeadlineTitle>
                <DeadlineBadge>{item.day}/{String(item.month).padStart(2, '0')}</DeadlineBadge>
              </DeadlineItem>
            ))
          )}
        </DeadlinesList>
      </UpcomingSection>
    </CalendarCardContainer>
  );
};
