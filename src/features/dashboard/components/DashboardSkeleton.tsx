import React from 'react';
import {
  TopSectionGrid,
  BottomSectionGrid,
} from '../DashboardOverview.styles';
import {
  SkeletonPulse,
  HeroCardSkeletonContainer,
  HeroHeaderSkeleton,
  HeroCarouselSkeleton,
  HeroInfoSkeleton,
  HeroProgressSkeleton,
  HeroProgressHeaderSkeleton,
  MetricsGridSkeletonContainer,
  MetricCardSkeletonContainer,
  MetricInfoSkeleton,
  ChartCardSkeletonContainer,
  ChartHeaderSkeleton,
  ChartLegendSkeleton,
  ChartBarsAreaSkeleton,
  ChartBarColumnSkeleton,
  CalendarCardSkeletonContainer,
  CalendarHeaderSkeleton,
  WeekDaysRowSkeleton,
  DaysGridSkeleton,
  UpcomingSectionSkeleton,
  UpcomingItemSkeleton,
} from '../styles/DashboardSkeleton.styles';

const METRIC_CARD_IDS = [
  'metric-skel-1',
  'metric-skel-2',
  'metric-skel-3',
  'metric-skel-4',
  'metric-skel-5',
  'metric-skel-6',
];

const CHART_BAR_DATA = [
  { id: 'bar-skel-jan', height: '45%' },
  { id: 'bar-skel-fev', height: '65%' },
  { id: 'bar-skel-mar', height: '80%' },
  { id: 'bar-skel-abr', height: '55%' },
  { id: 'bar-skel-mai', height: '90%' },
  { id: 'bar-skel-jun', height: '70%' },
];

const WEEKDAY_IDS = [
  'wd-skel-dom',
  'wd-skel-seg',
  'wd-skel-ter',
  'wd-skel-qua',
  'wd-skel-qui',
  'wd-skel-sex',
  'wd-skel-sab',
];

const CALENDAR_DAY_IDS = Array.from({ length: 35 }, (_, index) => `cday-skel-${index + 1}`);

const UPCOMING_DEADLINE_IDS = [
  'upcoming-skel-1',
  'upcoming-skel-2',
  'upcoming-skel-3',
];

export const DashboardSkeleton: React.FC = () => {
  return (
    <>
      <TopSectionGrid>
        <HeroCardSkeletonContainer>
          <HeroHeaderSkeleton>
            <SkeletonPulse $width="116px" $height="18px" $radius="9999px" />
            <SkeletonPulse $width="142px" $height="14px" $margin="8px 0 0" />
          </HeroHeaderSkeleton>

          <HeroCarouselSkeleton>
            <SkeletonPulse $width="34px" $height="34px" $radius="9999px" />
            <SkeletonPulse $width="104px" $height="104px" $radius="9999px" />
            <SkeletonPulse $width="34px" $height="34px" $radius="9999px" />
          </HeroCarouselSkeleton>

          <HeroInfoSkeleton>
            <SkeletonPulse $width="190px" $height="20px" $margin="0 0 6px" />
            <SkeletonPulse $width="120px" $height="14px" />
          </HeroInfoSkeleton>

          <HeroProgressSkeleton>
            <HeroProgressHeaderSkeleton>
              <SkeletonPulse $width="64px" $height="14px" />
              <SkeletonPulse $width="32px" $height="14px" />
            </HeroProgressHeaderSkeleton>
            <SkeletonPulse $width="100%" $height="7px" $radius="9999px" />
          </HeroProgressSkeleton>
        </HeroCardSkeletonContainer>

        <MetricsGridSkeletonContainer>
          {METRIC_CARD_IDS.map((cardId) => (
            <MetricCardSkeletonContainer key={cardId}>
              <MetricInfoSkeleton>
                <SkeletonPulse $width="72px" $height="28px" $radius="6px" />
                <SkeletonPulse $width="110px" $height="16px" $margin="8px 0 0" />
                <SkeletonPulse $width="135px" $height="13px" $margin="6px 0 0" />
              </MetricInfoSkeleton>
              <SkeletonPulse $width="58px" $height="58px" $radius="9999px" />
            </MetricCardSkeletonContainer>
          ))}
        </MetricsGridSkeletonContainer>
      </TopSectionGrid>

      <BottomSectionGrid>
        <ChartCardSkeletonContainer>
          <ChartHeaderSkeleton>
            <div>
              <SkeletonPulse $width="175px" $height="17px" />
              <SkeletonPulse $width="230px" $height="12px" $margin="5px 0 0" />
            </div>
            <ChartLegendSkeleton>
              <SkeletonPulse $width="75px" $height="14px" />
              <SkeletonPulse $width="75px" $height="14px" />
            </ChartLegendSkeleton>
          </ChartHeaderSkeleton>

          <ChartBarsAreaSkeleton>
            {CHART_BAR_DATA.map((bar) => (
              <ChartBarColumnSkeleton key={bar.id}>
                <SkeletonPulse
                  $width="36px"
                  $height={bar.height}
                  $radius="8px 8px 0 0"
                />
                <SkeletonPulse $width="30px" $height="12px" />
              </ChartBarColumnSkeleton>
            ))}
          </ChartBarsAreaSkeleton>
        </ChartCardSkeletonContainer>

        <CalendarCardSkeletonContainer>
          <div>
            <CalendarHeaderSkeleton>
              <SkeletonPulse $width="120px" $height="20px" />
            </CalendarHeaderSkeleton>

            <WeekDaysRowSkeleton>
              {WEEKDAY_IDS.map((weekdayId) => (
                <SkeletonPulse
                  key={weekdayId}
                  $width="18px"
                  $height="12px"
                  $margin="0 auto"
                />
              ))}
            </WeekDaysRowSkeleton>

            <DaysGridSkeleton>
              {CALENDAR_DAY_IDS.map((dayId) => (
                <SkeletonPulse
                  key={dayId}
                  $width="30px"
                  $height="30px"
                  $radius="9999px"
                  $margin="0 auto"
                />
              ))}
            </DaysGridSkeleton>
          </div>

          <UpcomingSectionSkeleton>
            <SkeletonPulse $width="120px" $height="15px" $margin="0 0 10px" />
            {UPCOMING_DEADLINE_IDS.map((deadlineId) => (
              <UpcomingItemSkeleton key={deadlineId}>
                <SkeletonPulse $width="150px" $height="14px" />
                <SkeletonPulse $width="52px" $height="20px" $radius="9999px" />
              </UpcomingItemSkeleton>
            ))}
          </UpcomingSectionSkeleton>
        </CalendarCardSkeletonContainer>
      </BottomSectionGrid>
    </>
  );
};

