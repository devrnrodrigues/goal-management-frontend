import React from 'react';
import { useCalendar } from './useCalendar';
import {
  CalendarHeader,
  CalendarGrid,
} from './components';
import {
  CalendarPageContainer,
  CalendarHeaderWrapper,
  HeaderTitlesCol,
  CalendarTitle,
  CalendarSubtitle,
  CalendarContentLayout,
} from './CalendarPage.styles';

export const CalendarPage: React.FC = () => {
  const {
    currentMonthDate,
    calendarDays,
    handlePrevMonth,
    handleNextMonth,
    handleToday,
    handleSelectDay,
  } = useCalendar();

  return (
    <CalendarPageContainer>
      <CalendarHeaderWrapper>
        <HeaderTitlesCol>
          <CalendarTitle>Calendário</CalendarTitle>
          <CalendarSubtitle>
            Visualização das metas criadas e planejadas organizadas por data.
          </CalendarSubtitle>
        </HeaderTitlesCol>
      </CalendarHeaderWrapper>

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
