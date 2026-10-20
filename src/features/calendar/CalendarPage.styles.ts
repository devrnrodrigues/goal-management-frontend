import styled from 'styled-components';

export const CalendarPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  padding: 20px 0 28px 0;
  flex: 1;
  box-sizing: border-box;

  @media (max-width: 900px) {
    padding: 16px 0 24px 0;
    gap: 16px;
  }

  @media (max-width: 480px) {
    padding: 8px 0 16px 0;
    gap: 12px;
  }
`;

export const CalendarHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 900px) {
    max-width: 100%;
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

export const CalendarTitle = styled.h1`
  font-size: clamp(20px, 1.2vw + 16px, 28px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.5px;
  word-break: break-word;
`;

export const CalendarSubtitle = styled.p`
  font-size: clamp(13px, 0.2vw + 12px, 15px);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
  word-break: break-word;
`;

export const CalendarContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 900px) {
    max-width: 100%;
  }
`;

export const ErrorMessageBanner = styled.div`
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.statusDanger};
  color: ${({ theme }) => theme.colors.statusDanger};
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 14px;
  max-width: 1080px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
`;
