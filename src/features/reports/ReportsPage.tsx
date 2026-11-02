import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useReports } from './useReports';
import {
  ReportsFilters,
  ReportsOverviewCards,
  ReportsVelocityChart,
  ReportsCategoryDistribution,
  ReportsPriorityEfficiency,
  ReportsGoalsHealthTable,
  ReportsSkeleton,
} from './components';
import {
  ReportsContainer,
  TwoColumnsGrid,
  ReportsBottomGrid,
} from './ReportsPage.styles';
import { MotionReportsLayout } from './styles/ReportsSkeleton.styles';

const fadeTransitionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const ReportsPage: React.FC = () => {
  const {
    isLoading,
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

      <AnimatePresence mode="wait">
        {isLoading ? (
          <MotionReportsLayout
            key="reports-skeleton-view"
            variants={fadeTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.16, ease: 'easeOut' }}
          >
            <ReportsSkeleton />
          </MotionReportsLayout>
        ) : (
          <MotionReportsLayout
            key="reports-loaded-view"
            variants={fadeTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <ReportsOverviewCards metrics={metrics} />

            <TwoColumnsGrid>
              <ReportsVelocityChart data={velocityData} />
              <ReportsCategoryDistribution categories={categoryDistribution} />
            </TwoColumnsGrid>

            <ReportsBottomGrid>
              <ReportsPriorityEfficiency items={priorityEfficiencies} />
              <ReportsGoalsHealthTable goals={goalsHealth} />
            </ReportsBottomGrid>
          </MotionReportsLayout>
        )}
      </AnimatePresence>
    </ReportsContainer>
  );
};
