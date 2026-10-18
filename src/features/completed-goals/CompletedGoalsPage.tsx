import React from 'react';
import { Award } from 'lucide-react';
import { useCompletedGoals } from './useCompletedGoals';
import {
  CompletedGoalsFilters,
  CompletedGoalCard,
  CompletedGoalDetailModal,
} from './components';
import {
  CompletedGoalsContainer,
  HeaderWrapper,
  PageTitle,
  PageSubtitle,
  CardsList,
  EmptyState,
  EmptyTitle,
  EmptySubtitle,
} from './CompletedGoalsPage.styles';

export const CompletedGoalsPage: React.FC = () => {
  const {
    goals,
    selectedGoal,
    filters,
    availableCategories,
    handleSearchChange,
    handleCategoryChange,
    handleSortChange,
    handleOpenDetail,
    handleCloseDetail,
  } = useCompletedGoals();

  return (
    <CompletedGoalsContainer>
      <HeaderWrapper>
        <PageTitle>Metas concluídas</PageTitle>
        <PageSubtitle>
          Histórico de metas finalizadas, conquistas alcançadas e entregas realizadas com sucesso
        </PageSubtitle>
      </HeaderWrapper>

      <CompletedGoalsFilters
        searchQuery={filters.searchQuery}
        selectedCategory={filters.selectedCategory}
        sortBy={filters.sortBy}
        categories={availableCategories}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
      />

      {goals.length === 0 ? (
        <EmptyState>
          <Award size={32} />
          <EmptyTitle>Nenhuma meta concluída encontrada</EmptyTitle>
          <EmptySubtitle>
            Ajuste a busca ou o filtro de categoria para visualizar suas metas finalizadas.
          </EmptySubtitle>
        </EmptyState>
      ) : (
        <CardsList>
          {goals.map((goal) => (
            <CompletedGoalCard
              key={goal.id}
              goal={goal}
              onViewDetails={handleOpenDetail}
            />
          ))}
        </CardsList>
      )}

      <CompletedGoalDetailModal
        goal={selectedGoal}
        onClose={handleCloseDetail}
      />
    </CompletedGoalsContainer>
  );
};
