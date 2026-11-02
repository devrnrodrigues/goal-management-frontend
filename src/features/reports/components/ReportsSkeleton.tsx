import React from 'react';
import {
  TwoColumnsGrid,
  ReportsBottomGrid,
} from '../ReportsPage.styles';
import {
  ReportsSkeletonPulse,
  MetricCardsGridSkeleton,
  MetricCardSkeleton,
  CardHeaderRowSkeleton,
  CardFooterRowSkeleton,
  ChartCardSkeleton,
  ChartHeaderSkeleton,
  ChartBarsAreaSkeleton,
  BarColumnSkeleton,
  BarPairSkeleton,
  CategoryListSkeleton,
  CategoryRowSkeleton,
  CategoryRowHeaderSkeleton,
  PriorityListSkeleton,
  PriorityRowSkeleton,
  PriorityRowHeaderSkeleton,
  TableCardSkeleton,
  TableHeaderSkeleton,
  TableRowsSkeleton,
  TableRowSkeletonItem,
} from '../styles/ReportsSkeleton.styles';

const METRIC_CARD_IDS = [
  'rep-metric-1',
  'rep-metric-2',
  'rep-metric-3',
  'rep-metric-4',
];

const VELOCITY_MONTHS = [
  { id: 'v-m1', height1: '65%', height2: '45%' },
  { id: 'v-m2', height1: '78%', height2: '55%' },
  { id: 'v-m3', height1: '90%', height2: '70%' },
  { id: 'v-m4', height1: '72%', height2: '50%' },
  { id: 'v-m5', height1: '85%', height2: '60%' },
  { id: 'v-m6', height1: '95%', height2: '80%' },
];

const CATEGORY_ROW_IDS = [
  { id: 'rep-cat-1', width: '75%', percent: '68%' },
  { id: 'rep-cat-2', width: '60%', percent: '52%' },
  { id: 'rep-cat-3', width: '85%', percent: '80%' },
  { id: 'rep-cat-4', width: '50%', percent: '40%' },
];

const PRIORITY_ROW_IDS = [
  { id: 'rep-prio-1', labelWidth: '55px', barWidth: '85%' },
  { id: 'rep-prio-2', labelWidth: '65px', barWidth: '70%' },
  { id: 'rep-prio-3', labelWidth: '60px', barWidth: '60%' },
];

const TABLE_ROW_IDS = [
  { id: 'rep-tbl-1', titleWidth: '180px' },
  { id: 'rep-tbl-2', titleWidth: '150px' },
  { id: 'rep-tbl-3', titleWidth: '210px' },
  { id: 'rep-tbl-4', titleWidth: '165px' },
];

export const ReportsSkeleton: React.FC = () => {
  return (
    <>
      <MetricCardsGridSkeleton>
        {METRIC_CARD_IDS.map((cardId) => (
          <MetricCardSkeleton key={cardId}>
            <CardHeaderRowSkeleton>
              <ReportsSkeletonPulse $width="110px" $height="14px" />
              <ReportsSkeletonPulse $width="34px" $height="34px" $radius="8px" />
            </CardHeaderRowSkeleton>
            <ReportsSkeletonPulse $width="75px" $height="26px" $radius="6px" />
            <CardFooterRowSkeleton>
              <ReportsSkeletonPulse $width="45px" $height="16px" $radius="4px" />
              <ReportsSkeletonPulse $width="90px" $height="12px" />
            </CardFooterRowSkeleton>
          </MetricCardSkeleton>
        ))}
      </MetricCardsGridSkeleton>

      <TwoColumnsGrid>
        <ChartCardSkeleton>
          <ChartHeaderSkeleton>
            <div>
              <ReportsSkeletonPulse $width="150px" $height="18px" $margin="0 0 4px" />
              <ReportsSkeletonPulse $width="110px" $height="12px" />
            </div>
            <ReportsSkeletonPulse $width="130px" $height="14px" />
          </ChartHeaderSkeleton>

          <ChartBarsAreaSkeleton>
            {VELOCITY_MONTHS.map((col) => (
              <BarColumnSkeleton key={col.id}>
                <BarPairSkeleton>
                  <ReportsSkeletonPulse
                    $width="14px"
                    $height={col.height1}
                    $radius="4px 4px 0 0"
                  />
                  <ReportsSkeletonPulse
                    $width="14px"
                    $height={col.height2}
                    $radius="4px 4px 0 0"
                  />
                </BarPairSkeleton>
                <ReportsSkeletonPulse $width="24px" $height="12px" />
              </BarColumnSkeleton>
            ))}
          </ChartBarsAreaSkeleton>
        </ChartCardSkeleton>

        <ChartCardSkeleton>
          <ChartHeaderSkeleton>
            <ReportsSkeletonPulse $width="160px" $height="18px" />
          </ChartHeaderSkeleton>

          <CategoryListSkeleton>
            {CATEGORY_ROW_IDS.map((cat) => (
              <CategoryRowSkeleton key={cat.id}>
                <CategoryRowHeaderSkeleton>
                  <ReportsSkeletonPulse $width={cat.width} $height="14px" />
                  <ReportsSkeletonPulse $width="35px" $height="14px" />
                </CategoryRowHeaderSkeleton>
                <ReportsSkeletonPulse $width="100%" $height="8px" $radius="9999px" />
              </CategoryRowSkeleton>
            ))}
          </CategoryListSkeleton>
        </ChartCardSkeleton>
      </TwoColumnsGrid>

      <ReportsBottomGrid>
        <ChartCardSkeleton>
          <ChartHeaderSkeleton>
            <ReportsSkeletonPulse $width="145px" $height="18px" />
          </ChartHeaderSkeleton>

          <PriorityListSkeleton>
            {PRIORITY_ROW_IDS.map((prio) => (
              <PriorityRowSkeleton key={prio.id}>
                <PriorityRowHeaderSkeleton>
                  <ReportsSkeletonPulse $width={prio.labelWidth} $height="18px" $radius="6px" />
                  <ReportsSkeletonPulse $width="40px" $height="14px" />
                </PriorityRowHeaderSkeleton>
                <ReportsSkeletonPulse $width={prio.barWidth} $height="6px" $radius="9999px" />
              </PriorityRowSkeleton>
            ))}
          </PriorityListSkeleton>
        </ChartCardSkeleton>

        <TableCardSkeleton>
          <TableHeaderSkeleton>
            <ReportsSkeletonPulse $width="155px" $height="18px" />
          </TableHeaderSkeleton>

          <TableRowsSkeleton>
            {TABLE_ROW_IDS.map((row) => (
              <TableRowSkeletonItem key={row.id}>
                <ReportsSkeletonPulse $width={row.titleWidth} $height="15px" />
                <ReportsSkeletonPulse $width="80px" $height="14px" />
                <ReportsSkeletonPulse $width="100px" $height="8px" $radius="9999px" />
                <ReportsSkeletonPulse $width="65px" $height="20px" $radius="9999px" />
              </TableRowSkeletonItem>
            ))}
          </TableRowsSkeleton>
        </TableCardSkeleton>
      </ReportsBottomGrid>
    </>
  );
};

