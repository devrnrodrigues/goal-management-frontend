import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { isSameDay } from 'date-fns';
import { useCalendar } from './useCalendar';
import {
  CalendarHeader,
  CalendarGrid,
  CalendarDayDetailsModal,
  CalendarSkeleton,
} from './components';
import {
  CalendarPageContainer,
  CalendarContentLayout,
} from './CalendarPage.styles';
import { MotionCalendarLayout } from './styles/CalendarSkeleton.styles';

const fadeTransitionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const CalendarPage: React.FC = () => {
  const {
    isLoading,
    currentMonthDate,
    calendarDays,
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
      <CalendarContentLayout>
        <CalendarHeader
          currentMonthDate={currentMonthDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onToday={handleToday}
        />

        <AnimatePresence mode="wait">
          {isLoading ? (
            <MotionCalendarLayout
              key="calendar-skeleton-view"
              variants={fadeTransitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.16, ease: 'easeOut' }}
            >
              <CalendarSkeleton />
            </MotionCalendarLayout>
          ) : (
            <MotionCalendarLayout
              key="calendar-loaded-view"
              variants={fadeTransitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <CalendarGrid
                days={calendarDays}
                onSelectDay={onSelectDay}
              />
            </MotionCalendarLayout>
          )}
        </AnimatePresence>
      </CalendarContentLayout>

      <CalendarDayDetailsModal
        dayInfo={selectedDayInfo}
        onClose={handleCloseModal}
      />
    </CalendarPageContainer>
  );
};
