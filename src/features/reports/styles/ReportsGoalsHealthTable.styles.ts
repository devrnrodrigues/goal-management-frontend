import styled from 'styled-components';

export const HealthCard = styled.div`
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

export const HealthHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const HealthTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

export const GoalsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 13px;
`;

export const TableHead = styled.thead`
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  th {
    padding: 10px 12px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.colors.textMuted};
    white-space: nowrap;
  }
`;

export const TableBody = styled.tbody`
  tr {
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
    transition: background-color 0.15s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.02);
    }

    &:last-child {
      border-bottom: none;
    }
  }

  td {
    padding: 12px;
    vertical-align: middle;
    white-space: nowrap;
  }
`;

export const GoalNamePill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: ${({ theme }) => theme.colors.primaryDark};
  background-color: rgba(0, 168, 107, 0.08);
  padding: 3px 9px;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: 12px;
  font-weight: 600;
  max-width: 260px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 120px;
`;

export const MiniTrack = styled.div`
  flex: 1;
  height: 6px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 9999px;
  overflow: hidden;
`;

export const MiniFill = styled.div<{ $progress: number }>`
  width: ${({ $progress }) => `${$progress}%`};
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primaryDark};
  border-radius: 9999px;
`;

export const ProgressText = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  min-width: 32px;
`;

export const HealthBadge = styled.span<{ $status: 'on_track' | 'attention' | 'completed' }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 7px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background-color: rgba(0, 0, 0, 0.04);

  color: ${({ theme, $status }) => {
    switch ($status) {
      case 'completed':
        return theme.colors.primaryDark;
      case 'on_track':
        return theme.colors.statusSuccess;
      case 'attention':
      default:
        return theme.colors.statusWarning;
    }
  }};
`;
