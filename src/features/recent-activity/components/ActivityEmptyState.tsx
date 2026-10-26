import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import {
  EmptyContainer,
  EmptyIconCircle,
  EmptyTitle,
  EmptyDescription,
  ResetFiltersButton,
} from '../styles/ActivityEmptyState.styles';

interface ActivityEmptyStateProps {
  hasFilters?: boolean;
  onResetFilters?: () => void;
}

export const ActivityEmptyState: React.FC<ActivityEmptyStateProps> = ({
  hasFilters = false,
  onResetFilters,
}) => {
  return (
    <EmptyContainer>
      <EmptyIconCircle>
        <SearchX size={26} />
      </EmptyIconCircle>
      <EmptyTitle>Nenhuma atividade encontrada</EmptyTitle>
      <EmptyDescription>
        {hasFilters
          ? 'Não encontramos nenhum registro correspondente aos filtros aplicados.'
          : 'Ainda não há atividades ou movimentações registradas na sua conta.'}
      </EmptyDescription>
      {hasFilters && onResetFilters && (
        <ResetFiltersButton type="button" onClick={onResetFilters}>
          <RotateCcw size={14} />
          Redefinir filtros
        </ResetFiltersButton>
      )}
    </EmptyContainer>
  );
};
