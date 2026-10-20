import React, { useState, useRef, useEffect } from 'react';
import {
  Plus,
  SlidersHorizontal,
  Check,
} from 'lucide-react';
import type { Task } from '../../my-goals/types';
import type { ActiveGoalInfo } from '../types';
import { GoalSelector } from './GoalSelector';
import {
  HeaderWrapper,
  BrandAndGoalGroup,
  ToolbarActions,
  OutlineBtn,
  FilterDropdown,
  FilterOption,
} from '../styles/TaskBoardHeader.styles';

interface TaskBoardHeaderProps {
  availableGoals: Task[];
  activeGoal: ActiveGoalInfo | null;
  priorityFilter: string;
  onPriorityFilterChange: (val: string) => void;
  onSelectGoal: (goal: string | Task) => void;
  onOpenAddColumnModal: () => void;
}

export const TaskBoardHeader: React.FC<TaskBoardHeaderProps> = ({
  availableGoals,
  activeGoal,
  priorityFilter,
  onPriorityFilterChange,
  onSelectGoal,
  onOpenAddColumnModal,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <HeaderWrapper>
      <BrandAndGoalGroup>
        <GoalSelector
          availableGoals={availableGoals}
          activeGoal={activeGoal}
          onSelectGoal={onSelectGoal}
        />
      </BrandAndGoalGroup>

      <ToolbarActions>
        <OutlineBtn type="button" onClick={onOpenAddColumnModal}>
          <Plus size={14} /> Novo quadro
        </OutlineBtn>

        <div style={{ position: 'relative' }} ref={filterRef}>
          <OutlineBtn
            type="button"
            $active={priorityFilter !== 'all'}
            onClick={() => setIsFilterOpen((prev) => !prev)}
          >
            <SlidersHorizontal size={13} /> Filtrar
          </OutlineBtn>

          {isFilterOpen && (
            <FilterDropdown>
              <FilterOption
                type="button"
                $selected={priorityFilter === 'all'}
                onClick={() => {
                  onPriorityFilterChange('all');
                  setIsFilterOpen(false);
                }}
              >
                Todas prioridades
                {priorityFilter === 'all' && <Check size={12} color="#00a86b" />}
              </FilterOption>
              <FilterOption
                type="button"
                $selected={priorityFilter === 'Alta'}
                onClick={() => {
                  onPriorityFilterChange('Alta');
                  setIsFilterOpen(false);
                }}
              >
                Alta prioridade
                {priorityFilter === 'Alta' && <Check size={12} color="#ef4444" />}
              </FilterOption>
              <FilterOption
                type="button"
                $selected={priorityFilter === 'Média'}
                onClick={() => {
                  onPriorityFilterChange('Média');
                  setIsFilterOpen(false);
                }}
              >
                Média prioridade
                {priorityFilter === 'Média' && <Check size={12} color="#d97706" />}
              </FilterOption>
              <FilterOption
                type="button"
                $selected={priorityFilter === 'Baixa'}
                onClick={() => {
                  onPriorityFilterChange('Baixa');
                  setIsFilterOpen(false);
                }}
              >
                Baixa prioridade
                {priorityFilter === 'Baixa' && <Check size={12} color="#16a34a" />}
              </FilterOption>
            </FilterDropdown>
          )}
        </div>
      </ToolbarActions>
    </HeaderWrapper>
  );
};
