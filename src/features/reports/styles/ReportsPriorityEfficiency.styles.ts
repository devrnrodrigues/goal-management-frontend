import styled from 'styled-components';

export const PriorityCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 16px 14px;
  }
`;

export const PriorityHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const PriorityTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const PriorityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const PriorityRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: rgba(0, 0, 0, 0.02);
  transition: all 0.15s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const PriorityTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const PriorityBadge = styled.span<{ $priority: string }>`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 4px;
  color: #ffffff;
  background-color: ${({ $priority, theme }) => {
    switch ($priority.toUpperCase()) {
      case 'HIGH':
        return theme.colors.statusDanger;
      case 'MEDIUM':
        return theme.colors.statusWarning;
      case 'LOW':
        return theme.colors.statusInfo;
      default:
        return theme.colors.primary;
    }
  }};
`;

export const PriorityStats = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
`;

export const StatPill = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: rgba(0, 0, 0, 0.04);
  padding: 2px 7px;
  border-radius: 4px;
`;

export const OnTimeBarTrack = styled.div`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

export const OnTimeBarFill = styled.div<{ $percentage: number; $priority: string }>`
  width: ${({ $percentage }) => Math.min(100, Math.max(0, $percentage))}%;
  height: 100%;
  border-radius: 3px;
  background-color: ${({ $priority, theme }) => {
    switch ($priority.toUpperCase()) {
      case 'HIGH':
        return theme.colors.statusDanger;
      case 'MEDIUM':
        return theme.colors.statusWarning;
      case 'LOW':
        return theme.colors.statusInfo;
      default:
        return theme.colors.primary;
    }
  }};
  transition: width 0.3s ease;
`;

export const EmptyMessage = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
  text-align: center;
  padding: 16px 0;
`;
