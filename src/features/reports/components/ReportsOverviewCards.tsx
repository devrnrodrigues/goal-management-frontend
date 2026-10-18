import React from 'react';
import { Target, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import type { ReportOverviewMetric } from '../types';
import {
  CardsGrid,
  MetricCard,
  CardHeaderRow,
  CardLabel,
  CardIconBox,
  CardValue,
  CardFooterRow,
  ChangeTag,
  SubtitleText,
} from '../styles/ReportsOverviewCards.styles';

interface ReportsOverviewCardsProps {
  metrics: ReportOverviewMetric[];
}

export const ReportsOverviewCards: React.FC<ReportsOverviewCardsProps> = ({ metrics }) => {
  const getIconForIndex = (index: number) => {
    switch (index) {
      case 0:
        return <CheckCircle2 size={18} />;
      case 1:
        return <Clock size={18} />;
      case 2:
        return <Target size={18} />;
      case 3:
      default:
        return <TrendingUp size={18} />;
    }
  };

  return (
    <CardsGrid>
      {metrics.map((metric, index) => (
        <MetricCard key={metric.id}>
          <CardHeaderRow>
            <CardLabel>{metric.label}</CardLabel>
            <CardIconBox>{getIconForIndex(index)}</CardIconBox>
          </CardHeaderRow>

          <CardValue>{metric.value}</CardValue>

          <CardFooterRow>
            <ChangeTag $isPositive={metric.isPositive}>{metric.change}</ChangeTag>
            <SubtitleText>{metric.subtitle}</SubtitleText>
          </CardFooterRow>
        </MetricCard>
      ))}
    </CardsGrid>
  );
};
