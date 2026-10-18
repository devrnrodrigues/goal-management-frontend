import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 22px 24px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: 14px;
  gap: 16px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  }

  @media (max-width: 600px) {
    padding: 16px;
    gap: 14px;
  }
`;

export const CardTopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 680px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const TitleCategoryGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  flex: 1;
`;

export const CategoryTag = styled.span`
  font-size: 11.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const GoalNamePill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 12px;
  border-radius: 8px;
  background-color: rgba(0, 168, 107, 0.08);
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: 15px;
  font-weight: 600;
  max-width: fit-content;
  word-break: break-word;

  svg {
    flex-shrink: 0;
  }
`;

export const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;

  svg {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const DescriptionText = styled.p`
  font-size: 13.5px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
  margin: 0;
  word-break: break-word;
`;

export const HighlightBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textPrimary};
  box-sizing: border-box;

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const CardMetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

export const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
`;

export const MetaLabel = styled.span`
  font-size: 11.5px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 500;
`;

export const MetaValue = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 600;
  word-break: break-word;
`;

export const CardFooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
  padding-top: 4px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

export const MembersAvatarsRow = styled.div`
  display: flex;
  align-items: center;
`;

export const AvatarImg = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.surface};
  margin-left: -6px;
  object-fit: cover;

  &:first-child {
    margin-left: 0;
  }
`;

export const AvatarFallback = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.surface};
  margin-left: -6px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10.5px;
  font-weight: 600;

  &:first-child {
    margin-left: 0;
  }
`;

export const ViewDetailsButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    border-color: ${({ theme }) => theme.colors.textMuted};
  }

  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
  }
`;
