import React from 'react';
import { Search } from 'lucide-react';
import {
  ToolbarContainer,
  ToolbarTopRow,
  SearchBox,
  ResultsCountText,
  FilterChipsList,
  FilterChip,
} from './GoalFilterToolbar.styles';

export type GoalStatusFilter = 'all' | 'in_progress' | 'development' | 'homologation' | 'review' | 'planning' | 'urgent';

interface GoalFilterToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeStatus: GoalStatusFilter;
  onSelectStatus: (status: GoalStatusFilter) => void;
  totalFiltered: number;
}

const statusOptions: { id: GoalStatusFilter; label: string }[] = [
  { id: 'all', label: 'Todas as metas' },
  { id: 'in_progress', label: 'Em progresso' },
  { id: 'development', label: 'Em desenvolvimento' },
  { id: 'homologation', label: 'Homologação' },
  { id: 'review', label: 'Revisão final' },
  { id: 'urgent', label: 'Prazo final' },
  { id: 'planning', label: 'Planejamento' },
];

export const GoalFilterToolbar: React.FC<GoalFilterToolbarProps> = ({
  searchQuery,
  onSearchChange,
  activeStatus,
  onSelectStatus,
  totalFiltered,
}) => {
  return (
    <ToolbarContainer>
      <ToolbarTopRow>
        <SearchBox>
          <Search size={16} />
          <input
            type="text"
            placeholder="Buscar por meta, squad ou categoria..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </SearchBox>
        <ResultsCountText>
          {totalFiltered === 1 ? '1 meta encontrada' : `${totalFiltered} metas encontradas`}
        </ResultsCountText>
      </ToolbarTopRow>

      <FilterChipsList>
        {statusOptions.map((opt) => (
          <FilterChip
            key={opt.id}
            type="button"
            $isActive={activeStatus === opt.id}
            onClick={() => onSelectStatus(opt.id)}
          >
            {opt.label}
          </FilterChip>
        ))}
      </FilterChipsList>
    </ToolbarContainer>
  );
};
