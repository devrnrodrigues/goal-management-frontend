import React from 'react';
import type { MetricCardProps } from './MetricCard.types';
import {
  CardContainer,
  MetricInfo,
  MetricValue,
  MetricTitle,
  MetricSubtitle,
  IconCircle,
} from '../styles/MetricCard.styles';

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const IconComponent = metric.icon;

  return (
    <CardContainer>
      <MetricInfo>
        <MetricValue>{metric.value}</MetricValue>
        <MetricTitle>{metric.title}</MetricTitle>
        <MetricSubtitle>{metric.subtitle}</MetricSubtitle>
      </MetricInfo>

      <IconCircle $variant={metric.variant}>
        <IconComponent size={26} />
      </IconCircle>
    </CardContainer>
  );
};
