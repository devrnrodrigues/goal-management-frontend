import type { FocusGoal } from '../types/dashboard.types';

export interface GoalHeroCardProps {
  goal: FocusGoal;
  currentIndex: number;
  totalGoals: number;
  onPrev: () => void;
  onNext: () => void;
  onViewDetails?: (id: string) => void;
}
