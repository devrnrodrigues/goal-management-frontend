import styled from 'styled-components';

export const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
  text-align: center;
  gap: 16px;
  max-width: 600px;
  margin: 40px auto;
`;

export const PlaceholderIconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PlaceholderTitle = styled.h2`
  font-size: clamp(18px, 0.4vw + 16px, 24px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const PlaceholderDescription = styled.p`
  font-size: clamp(13px, 0.2vw + 12px, 15px);
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 420px;
  line-height: 1.5;
`;

export const PlaceholderActionBtn = styled.button`
  margin-top: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.sidebarText};
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  font-size: clamp(13px, 0.2vw + 12px, 15px);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-1px);
  }
`;
