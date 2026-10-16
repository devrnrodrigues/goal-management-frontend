import styled from 'styled-components';

export const MainContentWrapper = styled.main`
  margin-left: 260px;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  min-height: 100vh;
  transition: margin-left 0.3s ease-in-out;
  background-color: ${({ theme }) => theme.colors.background};

  @media (max-width: 900px) {
    margin-left: 0;
    padding: 0 16px;
  }
`;

export const DashboardArea = styled.div`
  padding: 24px 0 40px 0;
  width: 100%;
  max-width: 1400px;
  margin: 76px auto 0 auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 28px;

  @media (max-width: 900px) {
    margin-top: 76px;
    padding: 16px 0 24px 0;
  }
`;

export const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const DashboardTitle = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-top: 8px;
`;

export const ViewSelector = styled.div`
  display: flex;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  gap: 15px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  button {
    background: none;
    border: none;
    padding: 6px 12px;
    border-radius: ${({ theme }) => theme.radii.sm};
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${({ theme }) => theme.colors.textSecondary};

    &:hover:not(:disabled) {
      color: ${({ theme }) => theme.colors.primary};
      background-color: ${({ theme }) => theme.colors.surface};
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  span.active {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
  }
`;

export const AddButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.sidebarText};
  padding: 10px 22px;
  border-radius: ${({ theme }) => theme.radii.full};
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  box-shadow: 0 4px 14px rgba(0, 168, 107, 0.25);

  @media (max-width: 768px) {
    align-self: flex-start;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(0, 168, 107, 0.35);
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const GoalCardWrapper = styled.div`
  cursor: pointer;
  width: 100%;
`;

export const GreetingText = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 4px;
  letter-spacing: -0.5px;

  @media (max-width: 868px) {
    font-size: 20px;
  }
`;