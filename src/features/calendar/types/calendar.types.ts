export type CalendarTaskPriority = 'Alta' | 'Média' | 'Baixa';

export type CalendarTaskStatus = 'pending' | 'in_progress' | 'completed';

export interface CalendarTaskAuthor {
  id: string;
  name: string;
  avatarUrl?: string;
  initials: string;
}

export interface CalendarTask {
  id: string;
  title: string;
  createdAt: string;
  formattedDate: string;
  goalTitle: string;
  priority: CalendarTaskPriority;
  status: CalendarTaskStatus;
  author: CalendarTaskAuthor;
  columnName: string;
}

export interface CalendarDayInfo {
  date: Date;
  dateKey: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  tasks: CalendarTask[];
}
