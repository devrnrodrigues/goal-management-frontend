import styled from 'styled-components';
import { Reorder } from 'framer-motion';

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

export const BoardColumnsRow = styled(Reorder.Group)`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 24px;
  min-height: calc(100vh - 220px);
  list-style: none;
  margin: 0;
  padding-left: 0;

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

export const ErrorMessageBanner = styled.div`
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.statusDanger};
  color: ${({ theme }) => theme.colors.statusDanger};
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 14px;
`;

export const EmptyBoardNotice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  gap: 12px;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  p {
    font-size: 14px;
    max-width: 440px;
  }
`;
