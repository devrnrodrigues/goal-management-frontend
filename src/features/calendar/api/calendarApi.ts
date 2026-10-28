import { httpClient } from '../../shared/api/httpClient';
import type { CalendarTask } from '../types';

export const calendarApi = {
  getCalendarTasks: async (year: number, month: number): Promise<CalendarTask[]> => {
    const params = new URLSearchParams({
      year: String(year),
      month: String(month),
    });
    return httpClient<CalendarTask[]>(`/calendar?${params.toString()}`, {
      method: 'GET',
    });
  },
};
