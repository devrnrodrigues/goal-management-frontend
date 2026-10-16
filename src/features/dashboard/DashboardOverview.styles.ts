import styled from 'styled-components';

export const OverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const TopSectionGrid = styled.div`
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 20px;
  align-items: stretch;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const BottomSectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 20px;
  align-items: stretch;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;
