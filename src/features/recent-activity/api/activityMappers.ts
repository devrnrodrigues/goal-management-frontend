import type {
  ActivityApiResponse,
  ActivityItem,
  ActivityActionType,
  DateGroupLabel,
} from '../types';

export const getInitials = (name?: string): string => {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return parts[0].slice(0, 2).toUpperCase();
};

export const calculateDateGroup = (date: Date): DateGroupLabel => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const itemDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffTime = today.getTime() - itemDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return 'Hoje';
  if (diffDays === 1) return 'Ontem';
  if (diffDays < 7) return 'Esta semana';
  return 'Anterior';
};

export const formatRelativeTime = (isoString: string): string => {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);

  if (diffMinutes < 1) return 'Agora mesmo';
  if (diffMinutes < 60) return `Há ${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''}`;
  if (diffHours < 24) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `Hoje às ${hours}:${minutes}`;
  }
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month} às ${hours}:${minutes}`;
};

export const mapActivityToItem = (api: ActivityApiResponse): ActivityItem => {
  const dateObj = new Date(api.createdAt);
  const actionType = api.actionType.toLowerCase() as ActivityActionType;

  return {
    id: api.id,
    actionType,
    author: {
      id: api.authorId,
      name: api.authorName,
      avatarUrl: api.authorAvatarUrl,
      initials: getInitials(api.authorName),
      role: 'Membro',
    },
    title: api.title,
    goalTitle: api.goalTitle,
    timestamp: formatRelativeTime(api.createdAt),
    dateGroup: calculateDateGroup(dateObj),
    metadata: {
      fromColumn: api.fromColumn,
      toColumn: api.toColumn,
    },
    changes:
      api.fromColumn && api.toColumn
        ? [
            {
              id: `${api.id}-col`,
              label: 'Coluna',
              from: api.fromColumn,
              to: api.toColumn,
            },
          ]
        : undefined,
  };
};
