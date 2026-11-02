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

export const CompletedGoalsSkeletonPulse = styled.div<{
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

export const MotionCompletedGoalsLayout = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const CompletedCardSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  padding: 22px 24px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 14px;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 16px;
    gap: 14px;
  }
`;

export const CardTopRowSkeleton = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
`;

export const TitleCategoryGroupSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

export const HighlightBoxSkeleton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  box-sizing: border-box;
  width: 100%;
`;

export const CardFooterRowSkeleton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 14px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  flex-wrap: wrap;
`;

export const FooterAvatarsGroupSkeleton = styled.div`
  display: flex;
  align-items: center;
`;

export const AvatarItemSkeleton = styled(CompletedGoalsSkeletonPulse)`
  border: 2px solid #ffffff;
  margin-left: -8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

  &:first-child {
    margin-left: 0;
  }
`;

