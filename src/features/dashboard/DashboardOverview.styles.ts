import styled from 'styled-components';

export const OverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;
  box-sizing: border-box;
`;

export const TopSectionGrid = styled.div`
  display: grid;
  grid-template-columns: 340px minmax(0, 1fr);
  gap: 24px;
  align-items: stretch;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  @media (min-width: 1600px) {
    grid-template-columns: 370px minmax(0, 1fr);
    gap: 28px;
  }

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const BottomSectionGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 350px;
  gap: 24px;
  align-items: stretch;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  @media (min-width: 1600px) {
    grid-template-columns: minmax(0, 1fr) 380px;
    gap: 28px;
  }

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;
