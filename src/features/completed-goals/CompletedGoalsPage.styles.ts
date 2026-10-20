import styled from 'styled-components';

export const CompletedGoalsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  padding: 24px 0 32px 0;
  flex: 1;
  box-sizing: border-box;

  @media (max-width: 900px) {
    padding: 16px 0 24px 0;
    gap: 18px;
  }

  @media (max-width: 480px) {
    padding: 8px 0 16px 0;
    gap: 14px;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  min-width: 0;
`;

export const PageTitle = styled.h1`
  font-size: clamp(20px, 1.2vw + 16px, 28px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.5px;
  word-break: break-word;
`;

export const PageSubtitle = styled.p`
  font-size: clamp(13px, 0.2vw + 12px, 15px);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
  word-break: break-word;
`;

export const CardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px dashed ${({ theme }) => theme.colors.borderLight};
  border-radius: 14px;
  text-align: center;
  gap: 10px;
  box-sizing: border-box;

  svg {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const EmptyTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const EmptySubtitle = styled.p`
  font-size: 13.5px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  max-width: 360px;
`;

export const ErrorMessageBanner = styled.div`
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.statusDanger};
  color: ${({ theme }) => theme.colors.statusDanger};
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 14px;
`;
