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

export const TaskBoardSkeletonPulse = styled.div<{
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

export const MotionBoardContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const BoardHeaderSkeletonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
`;

export const HeaderLeftSkeleton = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const HeaderRightSkeleton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const BoardColumnsRowSkeleton = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 24px;
  min-height: calc(100vh - 220px);
  width: 100%;
  box-sizing: border-box;
`;

export const ColumnSkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f6f8fa;
  border-radius: 16px;
  width: 385px;
  min-width: 360px;
  max-width: 420px;
  padding: 0 14px 14px 14px;
  flex-shrink: 0;
  border: 2px solid rgba(226, 232, 240, 0.6);
  overflow: hidden;
  box-sizing: border-box;
`;

export const ColumnTopBarSkeleton = styled.div`
  height: 4px;
  margin: 0 -14px 14px -14px;
  background-color: #e2e8f0;
  flex-shrink: 0;
`;

export const ColumnHeaderSkeleton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 4px 14px 4px;
`;

export const ColumnTitleAreaSkeleton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ColumnActionsSkeleton = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const CardsListSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 2px 2px;
  flex: 1;
`;

export const TaskCardSkeletonContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.02);
  padding: 16px 16px 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;
`;

export const TaskCardHeaderSkeleton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const TaskCardBodySkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const TaskCardFooterSkeleton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
  padding-top: 10px;
  border-top: 1px solid #f1f5f9;
`;

export const TaskAvatarsGroupSkeleton = styled.div`
  display: flex;
  align-items: center;
`;

export const TaskMemberAvatarSkeleton = styled(TaskBoardSkeletonPulse)`
  border: 2px solid #ffffff;
  margin-left: -7px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);

  &:first-child {
    margin-left: 0;
  }
`;

