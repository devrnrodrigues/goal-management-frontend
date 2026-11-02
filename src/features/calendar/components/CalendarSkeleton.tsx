import React from 'react';
import {
  CalendarSkeletonPulse,
  CalendarGridSkeletonWrapper,
  WeekdaysRowSkeleton,
  WeekdayHeaderSkeleton,
  DaysGridSkeleton,
  DayCellSkeleton,
} from '../styles/CalendarSkeleton.styles';

const WEEKDAYS = [
  'cal-wd-1',
  'cal-wd-2',
  'cal-wd-3',
  'cal-wd-4',
  'cal-wd-5',
  'cal-wd-6',
  'cal-wd-7',
];

const DAYS_CELLS = Array.from({ length: 35 }, (_, index) => {
  const isCurrent = index >= 3 && index <= 33;
  const hasTasks = isCurrent && (index % 4 === 0 || index % 7 === 2 || index % 5 === 1);
  const taskCount = index % 4 === 0 ? 2 : 1;

  return {
    id: `cal-day-cell-${index + 1}`,
    isCurrent,
    hasTasks,
    taskCount,
  };
});

export const CalendarSkeleton: React.FC = () => {
  return (
    <CalendarGridSkeletonWrapper>
      <WeekdaysRowSkeleton>
        {WEEKDAYS.map((wd) => (
          <WeekdayHeaderSkeleton key={wd}>
            <CalendarSkeletonPulse $width="28px" $height="12px" $radius="4px" />
          </WeekdayHeaderSkeleton>
        ))}
      </WeekdaysRowSkeleton>

      <DaysGridSkeleton>
        {DAYS_CELLS.map((cell) => (
          <DayCellSkeleton key={cell.id} $isCurrentMonth={cell.isCurrent}>
            <CalendarSkeletonPulse $width="20px" $height="14px" $radius="4px" />
            {cell.hasTasks &&
              Array.from({ length: cell.taskCount }, (_, tIdx) => (
                <CalendarSkeletonPulse
                  key={`${cell.id}-t-${tIdx + 1}`}
                  $width={tIdx === 0 ? '90%' : '75%'}
                  $height="18px"
                  $radius="4px"
                />
              ))}
          </DayCellSkeleton>
        ))}
      </DaysGridSkeleton>
    </CalendarGridSkeletonWrapper>
  );
};

