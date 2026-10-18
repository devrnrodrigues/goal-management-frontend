import React from 'react';
import type { CategoryDistributionItem } from '../types';
import {
  CategoryCard,
  CategoryHeader,
  CategoryTitle,
  CategoryList,
  CategoryItemRow,
  CategoryItemHeader,
  CategoryName,
  CategoryMeta,
  ProgressBarTrack,
  ProgressBarFill,
} from '../styles/ReportsCategoryDistribution.styles';

interface ReportsCategoryDistributionProps {
  categories: CategoryDistributionItem[];
}

export const ReportsCategoryDistribution: React.FC<ReportsCategoryDistributionProps> = ({
  categories,
}) => {
  return (
    <CategoryCard>
      <CategoryHeader>
        <CategoryTitle>Metas por categoria</CategoryTitle>
      </CategoryHeader>

      <CategoryList>
        {categories.map((item) => (
          <CategoryItemRow key={item.id}>
            <CategoryItemHeader>
              <CategoryName>{item.category}</CategoryName>
              <CategoryMeta>
                {item.goalsCount} {item.goalsCount === 1 ? 'meta' : 'metas'} ({item.percentage}%)
              </CategoryMeta>
            </CategoryItemHeader>

            <ProgressBarTrack>
              <ProgressBarFill $percentage={item.percentage} $color={item.color} />
            </ProgressBarTrack>
          </CategoryItemRow>
        ))}
      </CategoryList>
    </CategoryCard>
  );
};
