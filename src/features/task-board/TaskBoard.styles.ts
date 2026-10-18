import styled from 'styled-components';

export const BoardContainer = styled.div`
  padding: 24px 0 32px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 900px) {
    padding: 16px 0 24px 0;
  }
`;

export const BoardPageHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BoardTitle = styled.h1`
  font-size: clamp(20px, 1.2vw + 16px, 28px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 4px;
  letter-spacing: -0.5px;
`;

export const BoardSubtitle = styled.p`
  font-size: clamp(13px, 0.2vw + 12px, 15px);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const BoardColumnsRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 24px;
  min-height: calc(100vh - 220px);

  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;
