import React from 'react';
import { useCalendar } from './useCalendar';
import {
  CalendarHeader,
  CalendarGrid,
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
          onSelectDay={handleSelectDay}
        />
      </CalendarContentLayout>
    </CalendarPageContainer>
  );
};
