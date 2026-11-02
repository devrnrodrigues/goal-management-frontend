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

export const ActivitySkeletonPulse = styled.div<{
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

export const MotionActivityContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;
`;

export const TimelineGroupSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const GroupHeaderSkeleton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding-bottom: 4px;
`;

export const GroupDividerSkeleton = styled.div`
  flex: 1;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.borderLight};
`;

export const ItemListSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const ActivityItemSkeletonCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 18px 20px;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: ${({ theme }) => theme.radii.lg};

  @media (max-width: 640px) {
    padding: 14px 16px;
    gap: 12px;
  }

  @media (max-width: 480px) {
    padding: 12px 14px;
    gap: 10px;
  }
`;

export const ActivityItemBodySkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 0;
`;

export const ActivityMetaRowSkeleton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

