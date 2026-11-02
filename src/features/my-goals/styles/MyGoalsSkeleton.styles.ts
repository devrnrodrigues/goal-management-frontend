import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
`;

export const MyGoalsSkeletonPulse = styled.div<{
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

export const StatsSkeletonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  width: 100%;

  @media (min-width: 1720px) {
    gap: 20px;
  }

  @media (min-width: 2100px) {
    gap: 24px;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCardSkeleton = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-sizing: border-box;
`;

export const StatInfoSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

export const GoalCardSkeletonContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 350px;
  border-radius: 30px;
  padding: 38px 36px 34px 36px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  overflow: hidden;
  position: relative;
  justify-content: space-between;
  box-sizing: border-box;

  @media (min-width: 1720px) and (min-height: 900px) {
    height: clamp(360px, 33vh, 410px);
    padding: clamp(34px, 3.2vh, 42px) 38px 36px 38px;
  }

  @media (min-width: 2100px) and (min-height: 1000px) {
    height: clamp(380px, 35vh, 430px);
  }
`;

export const GoalCardHeaderSkeleton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

export const GoalCardHeaderContentSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

export const GoalCardBottomSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const GoalCardDividerSkeleton = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.borderLight};
  width: 100%;
  margin-bottom: 14px;
`;

export const GoalCardFooterSkeleton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 8px;
`;

export const AvatarGroupSkeleton = styled.div`
  display: flex;
  align-items: center;
`;

export const AvatarSkeletonItem = styled(MyGoalsSkeletonPulse)`
  border: 2px solid #ffffff;
  margin-left: -10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);

  &:first-child {
    margin-left: 0;
  }
`;

