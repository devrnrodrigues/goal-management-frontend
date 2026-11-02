import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const shimmer = keyframes`
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
`;

export const ReportsSkeletonPulse = styled.div<{
  $width?: string;
  $height?: string;
  $radius?: string;
  $margin?: string;
}>`
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '16px'};
  border-radius: ${({ $radius, theme }) => $radius || theme.radii.sm};
  margin: ${({ $margin }) => $margin || '0'};
  background: linear-gradient(
    90deg,
    #e3ece7 0%,
    #e3ece7 25%,
    #f3f8f5 50%,
    #e3ece7 75%,
    #e3ece7 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2.8s ease-in-out infinite;
  box-sizing: border-box;
`;

export const MotionReportsLayout = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const MetricCardsGridSkeleton = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const MetricCardSkeleton = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: clamp(14px, 1.2vw, 18px) clamp(14px, 1.4vw, 20px);
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
`;

export const CardHeaderRowSkeleton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const CardFooterRowSkeleton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ChartCardSkeleton = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
`;

export const ChartHeaderSkeleton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const ChartBarsAreaSkeleton = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  height: 180px;
  padding-top: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
`;

export const BarColumnSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
  height: 100%;
  justify-content: flex-end;
`;

export const BarPairSkeleton = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 4px;
  height: 100%;
  width: 100%;
  justify-content: center;
`;

export const CategoryListSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
`;

export const CategoryRowSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

export const CategoryRowHeaderSkeleton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PriorityListSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
  width: 100%;
  flex: 1;
`;

export const PriorityRowSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: rgba(0, 0, 0, 0.02);
`;

export const PriorityRowHeaderSkeleton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TableCardSkeleton = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
`;

export const TableHeaderSkeleton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const TableRowsSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const TableRowSkeletonItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  gap: 16px;
`;

