import styled from 'styled-components';

export const HeroCardContainer = styled.section`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  min-height: 250px;
`;

export const HeroHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
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
  font-size: 12px;
  font-weight: 500;
`;

export const CarouselSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

export const CarouselNavButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const GoalAvatarWrapper = styled.div`
  width: 76px;
  height: 76px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primaryLight} 0%, rgba(0, 168, 107, 0.15) 100%);
  border: 3px solid ${({ theme }) => theme.colors.surface};
  box-shadow: 0 4px 12px rgba(0, 168, 107, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 auto;
`;

export const GoalInfoSection = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const GoalTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const GoalMetaText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

export const ProgressWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  display: flex;
  flex-direction: column;
  gap: 6px;
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
  height: 6px;
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
