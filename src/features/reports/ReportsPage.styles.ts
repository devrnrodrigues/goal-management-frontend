import styled from 'styled-components';

export const ReportsContainer = styled.div`
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

export const ReportsHeaderWrapper = styled.div`
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

export const ReportsTitle = styled.h1`
  font-size: clamp(20px, 1.2vw + 16px, 28px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.5px;
  word-break: break-word;
`;

export const ReportsSubtitle = styled.p`
  font-size: clamp(13px, 0.2vw + 12px, 15px);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
  word-break: break-word;
`;

export const ReportsContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
`;

export const TwoColumnsGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 20px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const ReportsBottomGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 360px) minmax(0, 1fr);
  gap: 20px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  @media (min-width: 1600px) {
    grid-template-columns: minmax(0, 400px) minmax(0, 1fr);
  }

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;
