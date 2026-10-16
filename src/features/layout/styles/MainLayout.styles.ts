import styled from 'styled-components';

export const LayoutRoot = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const MainContentArea = styled.main`
  flex: 1;
  margin-left: 260px;
  padding-top: 76px;
  padding-left: ${({ theme }) => theme.spacing.xl};
  padding-right: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.xl};
  min-height: 100vh;
  transition: margin-left 0.3s ease-in-out;

  @media (max-width: 900px) {
    margin-left: 0;
    padding-left: ${({ theme }) => theme.spacing.md};
    padding-right: ${({ theme }) => theme.spacing.md};
    padding-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

export const PageContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;
