import React from 'react';
import { DashboardOverview } from './DashboardOverview';
import { DashboardContainer } from './DashboardPage.styles';

export const DashboardPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardOverview />
    </DashboardContainer>
  );
};

