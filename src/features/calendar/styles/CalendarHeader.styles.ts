import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    gap: 12px;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const MonthTitle = styled.h2`
  font-size: clamp(18px, 1.2vw + 14px, 24px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.4px;
  text-transform: capitalize;
`;

export const NavControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TodayButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: rgba(0, 0, 0, 0.05);
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.09);
  }
`;

export const ArrowNavButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;
