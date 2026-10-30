import styled from 'styled-components';

export const HeroContainer = styled.section`
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: 18px;
  padding: 16px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 14px 16px;
    border-radius: 14px;
    gap: 8px;
  }
`;

export const HeroTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
`;

export const GoalTitle = styled.h1`
  font-size: clamp(20px, 1.2vw + 14px, 25px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.4px;
  margin: 0;
  line-height: 1.25;
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 4px 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateX(-2px);
  }
`;

export const HeroMainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 20px;
  align-items: center;
  width: 100%;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const HeroLeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

export const GoalDescription = styled.p`
  font-size: 13px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

export const MetaFooterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 2px;
  padding-top: 6px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`;

export const MetaBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};

  svg {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const AvatarGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const MemberAvatarImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  margin-left: -5px;
  object-fit: cover;

  &:first-child {
    margin-left: 0;
  }
`;

export const AvatarFallback = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  margin-left: -5px;
  background: #f1f5f9;
  color: #334155;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;

  &:first-child {
    margin-left: 0;
  }
`;

export const ProgressCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(0, 168, 107, 0.04);
`;

export const ProgressTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const ProgressLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const ProgressPercentage = styled.span`
  font-size: 18px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ProgressTrack = styled.div`
  width: 100%;
  height: 6px;
  background: ${({ theme }) => theme.colors.borderLight};
  border-radius: 9999px;
  overflow: hidden;
`;

export const ProgressFillBar = styled.div<{ $percent: number }>`
  width: ${({ $percent }) => Math.min(Math.max($percent, 0), 100)}%;
  height: 100%;
  background: linear-gradient(90deg, #00a86b 0%, #34d399 100%);
  border-radius: 9999px;
  transition: width 0.4s ease;
`;

