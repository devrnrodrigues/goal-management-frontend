import React, { useState, useMemo } from 'react';
import { isSameDay } from 'date-fns';
import { useCalendar } from './useCalendar';
import {
  CalendarHeader,
  CalendarGrid,
  CalendarDayDetailsModal,
} from './components';
import {
  CalendarPageContainer,
  CalendarContentLayout,
  ErrorMessageBanner,
} from './CalendarPage.styles';

export const CalendarPage: React.FC = () => {
  const {
    currentMonthDate,
    calendarDays,
    errorMessage,
    handlePrevMonth,
    handleNextMonth,
    handleToday,
    handleSelectDay,
  } = useCalendar();

  const [activeModalDate, setActiveModalDate] = useState<Date | null>(null);

  const selectedDayInfo = useMemo(() => {
    if (!activeModalDate) return null;
    return calendarDays.find((day) => isSameDay(day.date, activeModalDate)) || null;
  }, [calendarDays, activeModalDate]);

  const onSelectDay = (date: Date) => {
    handleSelectDay(date);
    setActiveModalDate(date);
  };

  const handleCloseModal = () => {
    setActiveModalDate(null);
  };

  return (
    <CalendarPageContainer>
      {errorMessage && <ErrorMessageBanner>{errorMessage}</ErrorMessageBanner>}

      <CalendarContentLayout>
        <CalendarHeader
          currentMonthDate={currentMonthDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onToday={handleToday}
        />

        <CalendarGrid
          days={calendarDays}
          onSelectDay={onSelectDay}
        />
      </CalendarContentLayout>

      <CalendarDayDetailsModal
        dayInfo={selectedDayInfo}
        onClose={handleCloseModal}
      />
    </CalendarPageContainer>
  );
};
