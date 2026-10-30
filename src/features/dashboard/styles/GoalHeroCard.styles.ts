import styled from 'styled-components';

export const HeroCardContainer = styled.section`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 38px 28px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  min-width: 0;
  box-sizing: border-box;
`;

export const HeroHeader = styled.div`
  text-align: center;
  margin-bottom: 8px;
`;

export const HeroBadge = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.2px;
  display: block;
`;

export const HeroSubtitle = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 11px;
  font-weight: 500;
`;

export const CarouselSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin: 20px 0;
`;

export const CarouselNavButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  opacity: 0.75;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
    opacity: 1;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const GoalAvatarWrapper = styled.div`
  width: 104px;
  height: 104px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primaryLight} 0%, rgba(0, 168, 107, 0.15) 100%);
  border: 2px solid ${({ theme }) => theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 auto;
`;

export const GoalInfoSection = styled.div`
  text-align: center;
  margin-bottom: 8px;
`;

export const GoalTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const GoalMetaText = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

export const ProgressWrapper = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ProgressBarTrack = styled.div`
  width: 100%;
  height: 7px;
  background-color: ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.radii.full};
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ $progress: number }>`
  width: ${({ $progress }) => `${$progress}%`};
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.full};
  transition: width 0.4s ease-in-out;
`;

export const StepNotice = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
