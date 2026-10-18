import React from 'react';
import { useReports } from './useReports';
import {
  ReportsFilters,
  ReportsOverviewCards,
  ReportsVelocityChart,
  ReportsCategoryDistribution,
  ReportsTeamPerformance,
  ReportsGoalsHealthTable,
} from './components';
import {
  ReportsContainer,
  ReportsHeaderWrapper,
  HeaderTitlesCol,
  ReportsTitle,
  ReportsSubtitle,
  ReportsContentLayout,
  TwoColumnsGrid,
} from './ReportsPage.styles';

export const ReportsPage: React.FC = () => {
  const {
    filters,
    metrics,
    velocityData,
    categoryDistribution,
    teamMembers,
    goalsHealth,
    availableCategories,
    handlePeriodChange,
    handleCategoryChange,
    handleExport,
  } = useReports();

  return (
    <ReportsContainer>
      <ReportsHeaderWrapper>
        <HeaderTitlesCol>
          <ReportsTitle>Relatórios e métricas</ReportsTitle>
          <ReportsSubtitle>
            Acompanhe a eficiência de entregas, velocidade e saúde de todas as metas
          </ReportsSubtitle>
        </HeaderTitlesCol>
      </ReportsHeaderWrapper>

      <ReportsFilters
        period={filters.period}
        selectedCategory={filters.selectedCategory}
        categories={availableCategories}
        onPeriodChange={handlePeriodChange}
        onCategoryChange={handleCategoryChange}
        onExport={handleExport}
      />

      <ReportsContentLayout>
        <ReportsOverviewCards metrics={metrics} />

        <TwoColumnsGrid>
          <ReportsVelocityChart data={velocityData} />
          <ReportsCategoryDistribution categories={categoryDistribution} />
        </TwoColumnsGrid>

        <TwoColumnsGrid>
          <ReportsTeamPerformance members={teamMembers} />
          <ReportsGoalsHealthTable goals={goalsHealth} />
        </TwoColumnsGrid>
      </ReportsContentLayout>
    </ReportsContainer>
  );
};
