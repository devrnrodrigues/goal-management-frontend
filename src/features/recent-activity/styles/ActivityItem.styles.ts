import styled from 'styled-components';

export const ItemCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 18px 20px;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: box-shadow 0.15s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.dropdown};
  }

  @media (max-width: 640px) {
    padding: 14px 16px;
    gap: 12px;
  }

  @media (max-width: 480px) {
    padding: 12px 14px;
    gap: 10px;
  }
`;

export const AuthorAvatarWrapper = styled.div`
  width: 38px;
  height: 38px;
  border-radius: ${({ theme }) => theme.radii.full};
  flex-shrink: 0;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
  font-weight: 700;

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    font-size: 11px;
  }
`;

export const AuthorAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radii.full};
`;

export const ItemBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: 480px) {
    gap: 6px;
  }
`;

export const ItemSentence = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin: 0;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  word-break: break-word;
  overflow-wrap: anywhere;

  strong {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-weight: 600;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    line-height: 1.5;
  }
`;

export const TargetTaskText = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 600;
  word-break: break-word;
  overflow-wrap: anywhere;
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};

  @media (max-width: 480px) {
    gap: 6px;
    font-size: 11px;
  }
`;

export const GoalContextPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.primaryDark};
  background-color: rgba(0, 168, 107, 0.08);
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: 11px;
  font-weight: 600;
  max-width: 100%;
  word-break: break-word;

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 1px 6px;
  }
`;

export const DotSeparator = styled.span`
  color: rgba(0, 0, 0, 0.2);
  font-size: 10px;
`;

export const TimestampText = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

export const ChangesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 2px;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
`;

export const ChangeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  flex-wrap: wrap;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 480px) {
    font-size: 11px;
    gap: 4px;
  }
`;

export const ChangeLabel = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 11px;
  font-weight: 500;
`;

export const ChangeFrom = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: line-through;
  background-color: rgba(0, 0, 0, 0.04);
  padding: 1px 6px;
  border-radius: 4px;
  word-break: break-word;
`;

export const ChangeTo = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  background-color: rgba(0, 0, 0, 0.04);
  padding: 1px 6px;
  border-radius: 4px;
  word-break: break-word;
`;

export const ChangeArrow = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  display: inline-flex;
  align-items: center;
`;
