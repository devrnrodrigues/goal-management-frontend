import styled from 'styled-components';

export const HeroCardContainer = styled.section`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 28px 24px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  min-height: 300px;

  @media (min-width: 1720px) {
    padding: 32px 28px;
    min-height: 328px;
  }
`;

export const HeroHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const HeroBadge = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: clamp(12px, 0.2vw + 11px, 15px);
  font-weight: 700;
  letter-spacing: 0.2px;
  display: block;
`;

export const HeroSubtitle = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: clamp(11px, 0.15vw + 10px, 13px);
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
  width: 32px;
  height: 32px;
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
  width: 92px;
  height: 92px;
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
  font-size: clamp(16px, 0.3vw + 14px, 20px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const GoalMetaText = styled.span`
  font-size: clamp(11px, 0.15vw + 10px, 13px);
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
  font-size: clamp(11px, 0.1vw + 10px, 12px);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ProgressBarTrack = styled.div`
  width: 100%;
  height: 8px;
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
  font-size: clamp(11px, 0.1vw + 10px, 12px);
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
