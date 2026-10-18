import styled from 'styled-components';

export const ActivityPageContainer = styled.div`
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

export const ActivityHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 6px;
  }
`;

export const HeaderTitlesCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  max-width: 100%;
  min-width: 0;
`;

export const ActivityTitle = styled.h1`
  font-size: clamp(20px, 1.2vw + 16px, 28px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.5px;
  word-break: break-word;
`;

export const ActivitySubtitle = styled.p`
  font-size: clamp(13px, 0.2vw + 12px, 15px);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
  word-break: break-word;
`;

export const ActivityFeedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 640px) {
    gap: 20px;
  }
`;
