import type { GoalRoleApi } from '../../my-goals/types';

export interface GoalPermissions {
  isOwner: boolean;
  isAdmin: boolean;
  isViewer: boolean;
  canEditDetails: boolean;
  canDeleteGoal: boolean;
  canManageTasks: boolean;
  canAddMembers: boolean;
  canRemoveMembers: boolean;
  canChangeRoles: boolean;
}

export const getGoalPermissions = (role?: GoalRoleApi | string): GoalPermissions => {
  const normalized = (role || 'VIEWER').toUpperCase();
  const isOwner = normalized === 'OWNER';
  const isAdmin = normalized === 'ADMIN';
  const isViewer = normalized === 'VIEWER';

  return {
    isOwner,
    isAdmin,
    isViewer,
    canEditDetails: isOwner || isAdmin,
    canDeleteGoal: isOwner,
    canManageTasks: isOwner || isAdmin,
    canAddMembers: isOwner || isAdmin,
    canRemoveMembers: isOwner,
    canChangeRoles: isOwner || isAdmin,
  };
};

