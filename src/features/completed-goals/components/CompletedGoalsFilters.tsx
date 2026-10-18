import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import type { CompletedGoalsSortOption } from '../types';
import {
  FiltersContainer,
  SearchInputWrapper,
  SearchInput,
  FiltersActions,
  SelectWrapper,
  SelectDropdown,
} from '../styles/CompletedGoalsFilters.styles';

interface CompletedGoalsFiltersProps {
  searchQuery: string;
  selectedCategory: string;
  sortBy: CompletedGoalsSortOption;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: CompletedGoalsSortOption) => void;
}

export const CompletedGoalsFilters: React.FC<CompletedGoalsFiltersProps> = ({
  searchQuery,
  selectedCategory,
  sortBy,
  categories,
  onSearchChange,
  onCategoryChange,
  onSortChange,
}) => {
  return (
    <FiltersContainer>
      <SearchInputWrapper>
        <Search size={15} />
        <SearchInput
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar meta..."
        />
      </SearchInputWrapper>

      <FiltersActions>
        <SelectWrapper>
          <SelectDropdown
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="all">Todas as categorias</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </SelectDropdown>
          <ChevronDown size={14} />
        </SelectWrapper>

        <SelectWrapper>
          <SelectDropdown
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as CompletedGoalsSortOption)}
          >
            <option value="recent">Mais recentes</option>
            <option value="oldest">Mais antigas</option>
            <option value="tasks_count">Mais tarefas</option>
            <option value="duration">Maior duração</option>
          </SelectDropdown>
          <ChevronDown size={14} />
        </SelectWrapper>
      </FiltersActions>
    </FiltersContainer>
  );
};
