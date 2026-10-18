import React from 'react';
import type { CalendarDayInfo } from '../types';
import {
  CellWrapper,
  CellHeader,
  DayNumber,
  TasksCountBadge,
  TasksPreviewList,
  TaskMiniPill,
  PriorityDot,
  MoreTasksText,
  MobileDotsRow,
  MobileTaskDot,
} from '../styles/CalendarDayCell.styles';

interface CalendarDayCellProps {
  day: CalendarDayInfo;
  onSelectDay: (date: Date) => void;
}

export const CalendarDayCell: React.FC<CalendarDayCellProps> = ({
  day,
  onSelectDay,
}) => {
  const hasTasks = day.tasks.length > 0;
  const visibleTasks = day.tasks.slice(0, 3);
  const remainingCount = day.tasks.length - visibleTasks.length;

  const getTaskCountText = (count: number) => {
    return count === 1 ? '1 tarefa' : `${count} tarefas`;
  };

  return (
    <CellWrapper
      type="button"
      $isCurrentMonth={day.isCurrentMonth}
      $isSelected={day.isSelected}
      $isToday={day.isToday}
      $hasTasks={hasTasks}
      onClick={() => onSelectDay(day.date)}
    >
      <CellHeader>
        <DayNumber $isToday={day.isToday} $isSelected={day.isSelected}>
          {day.dayNumber}
        </DayNumber>
        {hasTasks && (
          <TasksCountBadge>
            {getTaskCountText(day.tasks.length)}
          </TasksCountBadge>
        )}
      </CellHeader>

      {hasTasks && (
        <>
          <TasksPreviewList>
            {visibleTasks.map((task) => (
              <TaskMiniPill key={task.id} $priority={task.priority} title={task.title}>
                <PriorityDot $priority={task.priority} />
                <span>{task.title}</span>
              </TaskMiniPill>
            ))}
            {remainingCount > 0 && (
              <MoreTasksText>+{remainingCount} mais</MoreTasksText>
            )}
          </TasksPreviewList>

          <MobileDotsRow>
            {day.tasks.slice(0, 3).map((task) => (
              <MobileTaskDot key={task.id} $priority={task.priority} />
            ))}
          </MobileDotsRow>
        </>
      )}
    </CellWrapper>
  );
};
