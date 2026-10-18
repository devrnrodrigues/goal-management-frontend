import React from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import type { ActivityCategory, ActivityFiltersState, GoalFilterOption } from '../types';
import {
  FiltersContainer,
  FiltersTopRow,
  SearchInputWrapper,
  SearchInput,
  FilterActionsWrapper,
  SelectWrapper,
  GoalSelect,
  CategoryChipsRow,
  CategoryChip,
  ChipBadge,
  ClearFilterButton,
} from '../styles/ActivityFilters.styles';

interface CategoryTabOption {
  id: ActivityCategory;
  label: string;
  count: number;
}

interface ActivityFiltersProps {
  filters: ActivityFiltersState;
  categoryCounts: Record<ActivityCategory, number>;
  goalOptions: GoalFilterOption[];
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onCategoryChange: (category: ActivityCategory) => void;
  onGoalChange: (goalId: string) => void;
  onResetFilters: () => void;
}

export const ActivityFilters: React.FC<ActivityFiltersProps> = ({
  filters,
  categoryCounts,
  goalOptions,
  hasActiveFilters,
  onSearchChange,
  onCategoryChange,
  onGoalChange,
  onResetFilters,
}) => {
  const categoryTabs: CategoryTabOption[] = [
    { id: 'all', label: 'Todas', count: categoryCounts.all },
    { id: 'moved', label: 'Movimentações', count: categoryCounts.moved },
    { id: 'created', label: 'Criações', count: categoryCounts.created },
    { id: 'updated', label: 'Edições', count: categoryCounts.updated },
    { id: 'completed', label: 'Conclusões', count: categoryCounts.completed },
  ];

  return (
    <FiltersContainer>
      <FiltersTopRow>
        <SearchInputWrapper>
          <Search size={16} />
          <SearchInput
            type="text"
            placeholder="Buscar atividades..."
            value={filters.search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </SearchInputWrapper>

        <FilterActionsWrapper>
          <SelectWrapper>
            <GoalSelect
              value={filters.selectedGoal}
              onChange={(e) => onGoalChange(e.target.value)}
            >
              <option value="all">Todas as metas</option>
              {goalOptions.map((goal) => (
                <option key={goal.id} value={goal.id}>
                  {goal.title}
                </option>
              ))}
            </GoalSelect>
            <ChevronDown size={14} />
          </SelectWrapper>

          {hasActiveFilters && (
            <ClearFilterButton type="button" onClick={onResetFilters}>
              <X size={14} />
              Limpar filtros
            </ClearFilterButton>
          )}
        </FilterActionsWrapper>
      </FiltersTopRow>

      <CategoryChipsRow>
        {categoryTabs.map((tab) => {
          const isActive = filters.category === tab.id;
          return (
            <CategoryChip
              key={tab.id}
              type="button"
              $isActive={isActive}
              onClick={() => onCategoryChange(tab.id)}
            >
              <span>{tab.label}</span>
              <ChipBadge $isActive={isActive}>{tab.count}</ChipBadge>
            </CategoryChip>
          );
        })}
      </CategoryChipsRow>
    </FiltersContainer>
  );
};
