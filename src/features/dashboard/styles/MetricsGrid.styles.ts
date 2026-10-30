import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;
