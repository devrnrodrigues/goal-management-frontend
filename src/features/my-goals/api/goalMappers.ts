import type {
  GoalSummaryApiResponse,
  GoalDetailApiResponse,
  GoalMemberApiResponse,
  GoalPriorityApi,
  GoalStatusApi,
  Task,
} from '../types';
import type { MemberAvatar, MemberRole } from '../constants/members';

export const formatDateToDisplay = (isoDate?: string): string => {
  if (!isoDate) return '';
  const parts = isoDate.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return isoDate;
};

export const formatDateToApi = (displayDate?: string): string | undefined => {
  if (!displayDate) return undefined;
  const parts = displayDate.split('/');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return displayDate;
};

export const mapPriorityToApi = (priority?: string): GoalPriorityApi => {
  const p = (priority || '').toLowerCase();
  if (p.includes('urgente')) return 'URGENT';
  if (p.includes('alta')) return 'HIGH';
  if (p.includes('baix')) return 'LOW';
  return 'MEDIUM';
};

export const mapPriorityToDisplay = (priority?: GoalPriorityApi): string => {
  switch (priority) {
    case 'URGENT':
      return 'Alta prioridade';
    case 'HIGH':
      return 'Alta prioridade';
    case 'LOW':
      return 'Baixa prioridade';
    default:
      return 'Média prioridade';
  }
};

export const mapStatusToApi = (status?: string): GoalStatusApi => {
  const s = (status || '').toLowerCase();
  if (s.includes('conclu')) return 'COMPLETED';
  if (s.includes('revis') || s.includes('homolog') || s.includes('desenvolvimento')) return 'UNDER_REVIEW';
  if (s.includes('cancel')) return 'CANCELLED';
  if (s.includes('não') || s.includes('nao')) return 'NOT_STARTED';
  return 'IN_PROGRESS';
};

export const mapStatusToDisplay = (status?: GoalStatusApi): string => {
  switch (status) {
    case 'COMPLETED':
      return 'Concluído';
    case 'UNDER_REVIEW':
      return 'Em revisão';
    case 'CANCELLED':
      return 'Cancelado';
    case 'NOT_STARTED':
      return 'Não iniciada';
    default:
      return 'Em progresso';
  }
};

export const mapMemberToAvatar = (member: GoalMemberApiResponse): MemberAvatar => {
  return {
    id: member.userId,
    name: member.name,
    avatarUrl: member.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
    role: member.role.toLowerCase() as MemberRole,
  };
};

export const mapSummaryToTask = (summary: GoalSummaryApiResponse): Task => {
  return {
    id: summary.id,
    title: summary.title,
    description: summary.description || '',
    category: summary.category,
    progress: summary.progress ?? 0,
    status: mapStatusToDisplay(summary.status),
    priority: mapPriorityToDisplay(summary.priority),
    deadline: summary.deadline ? formatDateToDisplay(summary.deadline) : undefined,
    members: [],
    subtasks: [],
  };
};

export const mapDetailToTask = (detail: GoalDetailApiResponse): Task => {
  return {
    id: detail.id,
    title: detail.title,
    description: detail.description || '',
    category: detail.category,
    progress: detail.progress ?? 0,
    status: mapStatusToDisplay(detail.status),
    priority: mapPriorityToDisplay(detail.priority),
    deadline: detail.deadline ? formatDateToDisplay(detail.deadline) : undefined,
    members: (detail.members || []).map(mapMemberToAvatar),
    subtasks: [],
  };
};
