import React from 'react';
import { useReports } from './useReports';
import {
  ReportsFilters,
  ReportsOverviewCards,
  ReportsVelocityChart,
  ReportsCategoryDistribution,
  ReportsPriorityEfficiency,
  ReportsGoalsHealthTable,
} from './components';
import {
  ReportsContainer,
  ReportsContentLayout,
  TwoColumnsGrid,
} from './ReportsPage.styles';

export const ReportsPage: React.FC = () => {
  const {
    filters,
    metrics,
    velocityData,
    categoryDistribution,
    priorityEfficiencies,
    goalsHealth,
    availableCategories,
    handlePeriodChange,
    handleCategoryChange,
    handleExport,
  } = useReports();

  return (
    <ReportsContainer>
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
          <ReportsPriorityEfficiency items={priorityEfficiencies} />
          <ReportsGoalsHealthTable goals={goalsHealth} />
        </TwoColumnsGrid>
      </ReportsContentLayout>
    </ReportsContainer>
  );
};
