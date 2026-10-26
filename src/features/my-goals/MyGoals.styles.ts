import styled from 'styled-components';

export const MainContentWrapper = styled.main`
  margin-left: 280px;
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

export const GoalsPageArea = styled.div`
  padding: 24px 0 32px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 24px;

  @media (max-width: 900px) {
    padding: 16px 0 24px 0;
  }
`;

export const GoalsHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

export const GoalsTitle = styled.h1`
  font-size: clamp(20px, 1.2vw + 16px, 28px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 4px;
  letter-spacing: -0.5px;
`;

export const GoalsSubtitle = styled.p`
  font-size: clamp(13px, 0.2vw + 12px, 15px);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SectionTitle = styled.h2`
  font-size: clamp(16px, 0.3vw + 14px, 20px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-top: 8px;
`;

export const ViewSelector = styled.div`
  display: flex;
  font-size: clamp(12px, 0.15vw + 11px, 14px);
  color: ${({ theme }) => theme.colors.textSecondary};
  gap: 15px;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  padding-bottom: 8px;

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
  font-size: clamp(13px, 0.2vw + 12px, 15px);
  font-weight: 600;
  border: none;
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

  @media (min-width: 1720px) {
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 26px;
  }

  @media (min-width: 2100px) {
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: 30px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const GoalCardWrapper = styled.div`
  cursor: pointer;
  width: 100%;
`;

export const ErrorMessageBanner = styled.div`
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.statusDanger};
  color: ${({ theme }) => theme.colors.statusDanger};
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 14px;
`;

export const EmptyStateContainer = styled.div`
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
    max-width: 400px;
  }
`;