import styled from 'styled-components';

export const LayoutRoot = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const MainContentArea = styled.main`
  flex: 1;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
  margin-left: 280px;
  padding-top: 76px;
  padding-left: ${({ theme }) => theme.spacing.xl};
  padding-right: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.xl};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease-in-out;

  @media (min-width: 1720px) {
    padding-left: 40px;
    padding-right: 40px;
  }

  @media (min-width: 2100px) {
    padding-left: 48px;
    padding-right: 48px;
  }

  @media (max-width: 1200px) {
    padding-left: ${({ theme }) => theme.spacing.lg};
    padding-right: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: 900px) {
    margin-left: 0;
    padding-left: ${({ theme }) => theme.spacing.md};
    padding-right: ${({ theme }) => theme.spacing.md};
    padding-bottom: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 480px) {
    padding-left: 12px;
    padding-right: 12px;
    padding-bottom: 16px;
  }
`;

export const PageContentContainer = styled.div`
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-direction: column;
`;
