import styled from 'styled-components';

export const GroupContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-bottom: 8px;
`;

export const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0 4px 0;
`;

export const GroupTitle = styled.h3`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const GroupCountBadge = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 1px 7px;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: rgba(0, 0, 0, 0.05);
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const GroupDivider = styled.div`
  flex: 1;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.05);
`;

export const GroupItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
