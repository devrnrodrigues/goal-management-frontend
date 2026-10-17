import styled from 'styled-components';

export const OverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  flex: 1;

  @media (min-width: 1720px) and (min-height: 900px) {
    gap: clamp(20px, 2.5vh, 32px);
  }
`;

export const TopSectionGrid = styled.div`
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 20px;
  align-items: stretch;

  @media (min-width: 1720px) {
    grid-template-columns: 380px 1fr;
    gap: 24px;
  }

  @media (min-width: 2100px) {
    grid-template-columns: 420px 1fr;
    gap: 28px;
  }

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const BottomSectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 20px;
  align-items: stretch;
  flex: 1;

  @media (min-width: 1400px) {
    grid-template-columns: 1fr 380px;
    gap: 22px;
  }

  @media (min-width: 1720px) {
    grid-template-columns: 1fr 480px;
    gap: 26px;
  }

  @media (min-width: 2100px) {
    grid-template-columns: 1fr 560px;
    gap: 28px;
  }

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;
