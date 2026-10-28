import type {
  BoardColumnApiResponse,
  BoardColumn,
  TaskApiResponse,
  BoardTask,
  TaskPriority,
  TaskPriorityApi,
  TaskMember,
  TaskMemberSummaryApiResponse,
} from '../types';

export const mapPriorityToDisplay = (priority?: TaskPriorityApi): TaskPriority => {
  switch (priority) {
    case 'LOW':
      return 'Baixa';
    case 'HIGH':
    case 'URGENT':
      return 'Alta';
    default:
      return 'Média';
  }
};

export const mapPriorityToApi = (priority?: TaskPriority): TaskPriorityApi => {
  switch (priority) {
    case 'Baixa':
      return 'LOW';
    case 'Alta':
      return 'HIGH';
    default:
      return 'MEDIUM';
  }
};

export const mapColumnToDisplay = (column: BoardColumnApiResponse): BoardColumn => {
  return {
    id: column.id,
    title: column.title,
    color: column.color || '#3b82f6',
  };
};

export const mapMemberSummaryToMember = (member: TaskMemberSummaryApiResponse): TaskMember => {
  return {
    id: member.userId,
    name: member.name,
    avatarUrl: member.avatarUrl || '',
  };
};

export const mapTaskToDisplay = (task: TaskApiResponse): BoardTask => {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    completed: task.completed,
    priority: mapPriorityToDisplay(task.priority),
    columnId: task.columnId,
    goalId: task.goalId,
    deadline: task.deadline,
    attachmentsCount: task.attachmentsCount ?? 0,
    commentsCount: task.commentsCount ?? 0,
    members: (task.members || []).map(mapMemberSummaryToMember),
  };
};
