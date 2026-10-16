import React from 'react';
import type { MetricsGridProps } from './MetricsGrid.types';
import { MetricCard } from './MetricCard';
import { GridContainer } from '../styles/MetricsGrid.styles';

export const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics }) => {
  return (
    <GridContainer>
      {metrics.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </GridContainer>
  );
};
